import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(6);
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert([{ author: author.trim(), text: text.trim(), rating }]);
    if (!error) {
      setAuthor(''); setText(''); setRating(5); setSuccess(true); fetchReviews();
      setTimeout(() => setSuccess(false), 3000);
    } else alert('Ошибка: ' + error.message);
    setSubmitting(false);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux mb-10">
        <span className="mr-3">⭐</span> Отзывы родителей
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass-card p-6 rounded-3xl sticky top-24">
            <h3 className="text-xl font-black mb-4">Оставить отзыв</h3>
            {success && <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-sm font-bold text-center">Спасибо! Отзыв добавлен.</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-xs text-gray-500 font-bold mb-1 block">Ваше имя</label><input type="text" value={author} onChange={e => setAuthor(e.target.value)} required className="w-full bg-white/70 border border-gray-200 p-3 rounded-xl focus:border-talant-green outline-none text-sm" placeholder="Айдана" /></div>
              <div><label className="text-xs text-gray-500 font-bold mb-1 block">Оценка</label><div className="flex gap-1">{[1,2,3,4,5].map(star => (<button key={star} type="button" onClick={() => setRating(star)} className={`text-2xl transition hover:scale-110 ${rating >= star ? 'text-talant-yellow' : 'text-gray-300'}`}>★</button>))}</div></div>
              <div><label className="text-xs text-gray-500 font-bold mb-1 block">Текст отзыва</label><textarea value={text} onChange={e => setText(e.target.value)} required rows="4" className="w-full bg-white/70 border border-gray-200 p-3 rounded-xl focus:border-talant-green outline-none text-sm" placeholder="Ваши впечатления..."></textarea></div>
              <button type="submit" disabled={submitting} className="btn-lux w-full bg-talant-green text-white font-black py-3 rounded-xl hover:bg-green-500 transition shadow-md disabled:opacity-50">{submitting ? 'Отправка...' : 'Отправить'}</button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          {loading ? <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div> : items.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center h-full flex flex-col justify-center"><span className="text-5xl block mb-4">⭐</span><p className="text-gray-400 font-bold">Пока нет отзывов.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="glass-card p-5 rounded-2xl flex flex-col h-full">
                  <div className="flex text-talant-yellow mb-2 text-lg">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < item.rating ? 'text-talant-yellow' : 'text-gray-200'}>★</span>)}</div>
                  <p className="text-sm text-gray-600 mb-4 italic text-paragraphs flex-1">"{item.text}"</p>
                  <div className="font-black text-sm text-talant-dark mt-auto">— {item.author}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}