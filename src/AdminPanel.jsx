import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function AdminPanel({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('team');
  const [data, setData] = useState({ team: [], announcements: [], achievements: [], prices: [], reviews: [], interesting: [] });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const [team, ann, ach, pr, rev, int] = await Promise.all([
      supabase.from('team').select('*').order('created_at', { ascending: false }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('achievements').select('*').order('created_at', { ascending: false }),
      supabase.from('prices').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('interesting').select('*').order('created_at', { ascending: false })
    ]);
    setData({
      team: team.data || [], announcements: ann.data || [], achievements: ach.data || [],
      prices: pr.data || [], reviews: rev.data || [], interesting: int.data || []
    });
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('talant-media').upload(fileName, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('talant-media').getPublicUrl(fileName);
      if (activeTab === 'announcements') setFormData(prev => ({ ...prev, cover_photo: urlData.publicUrl }));
      else if (activeTab === 'interesting') setFormData(prev => ({ ...prev, url: urlData.publicUrl }));
      else setFormData(prev => ({ ...prev, photo: urlData.publicUrl }));
    }
    setUploading(false);
  };

  const handleGalleryUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    let newGallery = formData.gallery ? [...formData.gallery] : [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('talant-media').upload(fileName, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from('talant-media').getPublicUrl(fileName);
        newGallery.push(urlData.publicUrl);
      }
    }
    setFormData(prev => ({ ...prev, gallery: newGallery }));
    setUploading(false);
  };

  const saveItem = async (e, table) => {
    e.preventDefault();
    const payload = { ...formData };
    delete payload.id;
    delete payload.created_at;
    Object.keys(payload).forEach(k => { if (!payload[k]) delete payload[k]; });

    let error;
    if (isEditing) {
      const { error: err } = await supabase.from(table).update(payload).eq('id', formData.id);
      error = err;
    } else {
      const { error: err } = await supabase.from(table).insert([payload]);
      error = err;
    }
    if (error) alert('Ошибка: ' + error.message);
    else { setFormData({}); setIsEditing(false); fetchAll(); alert('Сохранено!'); }
  };

  const deleteItem = async (table, id) => {
    if (!window.confirm('Удалить?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetchAll();
  };

  const startEdit = (item) => { setFormData(item); setIsEditing(true); };
  const cancelEdit = () => { setFormData({}); setIsEditing(false); };

  const renderForm = (table, fields) => (
    <form onSubmit={(e) => saveItem(e, table)} className="bg-white p-6 rounded-3xl shadow-sm border border-talant-green/30 mb-8">
      <h3 className="text-lg font-black mb-4">{isEditing ? 'Редактировать' : 'Добавить'} запись</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.name}>
            <label className="text-xs text-gray-500 block mb-1 font-bold">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea name={f.name} value={formData[f.name] || ''} onChange={handleInputChange} rows="3" className="w-full border border-gray-200 p-3 rounded-xl focus:border-talant-green outline-none" required={f.required}></textarea>
            ) : f.type === 'file' ? (
              <>
                <input type="file" onChange={handleFileUpload} className="text-sm w-full" />
                {uploading && <span className="text-xs text-talant-green">Загрузка...</span>}
                {formData[f.name] && <img src={formData[f.name]} className="w-12 h-12 object-cover rounded mt-2" alt="preview" />}
              </>
            ) : (
              <input type={f.type || 'text'} name={f.name} value={formData[f.name] || ''} onChange={handleInputChange} className="w-full border border-gray-200 p-3 rounded-xl focus:border-talant-green outline-none" required={f.required} />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-talant-green text-white px-6 py-2 rounded-xl font-black">Сохранить</button>
        {isEditing && <button type="button" onClick={cancelEdit} className="bg-gray-200 px-6 py-2 rounded-xl font-bold">Отмена</button>}
      </div>
    </form>
  );

  const renderList = (items, table, titleKey = 'name') => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center">
          {(item.photo || item.cover_photo) && <img src={item.photo || item.cover_photo} className="w-16 h-16 object-cover rounded-xl" alt="" />}
          <div className="flex-1">
            <h4 className="font-black">{item[titleKey] || item.title || item.author || 'Без названия'}</h4>
            <div className="flex gap-2 mt-2">
              <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-500 hover:underline">Изменить</button>
              <button onClick={() => deleteItem(table, item.id)} className="text-xs font-bold text-red-500 hover:underline">Удалить</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-talant-bg flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r-4 border-talant-green/20 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8"><div className="text-4xl">🦔</div><div><h1 className="text-sm font-black">Админ-панель</h1><p className="text-[10px] text-talant-green font-bold">Талант</p></div></div>
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          {[
            { id: 'team', label: 'Коллектив', icon: '👨‍🏫' }, { id: 'announcements', label: 'Объявления', icon: '📢' },
            { id: 'achievements', label: 'Достижения', icon: '🏆' }, { id: 'prices', label: 'Прайс', icon: '💰' },
            { id: 'reviews', label: 'Отзывы', icon: '⭐' }, { id: 'interesting', label: 'Медиа', icon: '🎬' },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); cancelEdit(); }} className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm transition whitespace-nowrap ${activeTab === tab.id ? 'bg-talant-green text-white' : 'text-gray-500 hover:bg-talant-bg'}`}><span>{tab.icon}</span> {tab.label}</button>
          ))}
        </nav>
        <div className="mt-auto pt-6 hidden md:block"><button onClick={onLogout} className="w-full bg-red-50 text-red-500 py-2 rounded-xl font-bold">Выйти</button></div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">{activeTab === 'team' ? 'Коллектив' : activeTab === 'announcements' ? 'Объявления' : activeTab === 'achievements' ? 'Достижения' : activeTab === 'prices' ? 'Прайс' : activeTab === 'reviews' ? 'Отзывы' : 'Интересное'}</h2>
          <button onClick={onLogout} className="md:hidden bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold text-sm">Выйти</button>
        </div>

        {loading ? <div className="text-center py-20">Загрузка...</div> : (
          <div className="animate-pop-in">
            {activeTab === 'team' && (
              <>
                {renderForm('team', [
                  { name: 'name', label: 'Имя', required: true }, { name: 'role', label: 'Должность', required: true },
                  { name: 'experience', label: 'Опыт' }, { name: 'photo', label: 'Главное фото', type: 'file' },
                  { name: 'description', label: 'Описание', type: 'textarea' }
                ])}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-talant-green/30 mb-8">
                  <h3 className="text-sm font-black mb-2">Сертификаты и дипломы (доп. фото)</h3>
                  <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-talant-blue/20 file:text-talant-dark cursor-pointer" />
                  {uploading && <span className="text-xs text-talant-green block mt-2">Загрузка...</span>}
                  <div className="flex gap-2 mt-3">
                    {formData.gallery && formData.gallery.map((img, i) => <img key={i} src={img} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />)}
                  </div>
                </div>
                {renderList(data.team, 'team', 'name')}
              </>
            )}
            {activeTab === 'announcements' && (
              <>{renderForm('announcements', [{ name: 'title', label: 'Заголовок', required: true }, { name: 'cover_photo', label: 'Обложка', type: 'file' }, { name: 'content', label: 'Текст', type: 'textarea' }])}{renderList(data.announcements, 'announcements', 'title')}</>
            )}
            {activeTab === 'achievements' && (
              <>{renderForm('achievements', [{ name: 'title', label: 'Название', required: true }, { name: 'photo', label: 'Фото', type: 'file' }, { name: 'description', label: 'Описание', type: 'textarea' }])}{renderList(data.achievements, 'achievements', 'title')}</>
            )}
            
            {/* ПРАЙС (С ДОБАВЛЕННЫМ ФОТО) */}
            {activeTab === 'prices' && (
              <>{renderForm('prices', [{ name: 'title', label: 'Название услуги', required: true }, { name: 'price', label: 'Цена' }, { name: 'photo', label: 'Фото услуги', type: 'file' }, { name: 'description', label: 'Описание', type: 'textarea' }])}{renderList(data.prices, 'prices', 'title')}</>
            )}

            {activeTab === 'reviews' && (
              <>{renderForm('reviews', [{ name: 'author', label: 'Имя автора', required: true }, { name: 'text', label: 'Текст отзыва', type: 'textarea', required: true }])}{renderList(data.reviews, 'reviews', 'author')}</>
            )}
            {activeTab === 'interesting' && (
              <>{renderForm('interesting', [{ name: 'title', label: 'Название', required: true }, { name: 'url', label: 'Ссылка или файл', type: 'file' }])}{renderList(data.interesting, 'interesting', 'title')}</>
            )}
          </div>
        )}
      </main>
    </div>
  );
}