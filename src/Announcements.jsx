import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Announcements({ onOpenAnnouncement }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(3);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-black text-talant-dark mb-8 flex items-center gap-3">
        <span className="text-4xl">📢</span> Объявления
      </h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">📢</span>
          <p className="text-gray-400 font-bold">Пока здесь пусто.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition duration-300 flex flex-col"
            >
              
              {/* Длинное фото сверху */}
              <div className="w-full aspect-[4/5] bg-talant-bg overflow-hidden cursor-pointer" onClick={() => onOpenAnnouncement(item)}>
                {item.cover_photo ? (
                  <img 
                    src={item.cover_photo} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-700" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">📰</div>
                )}
              </div>

              {/* Текст и кнопка (аккуратно ПОД фото) */}
              <div className="p-5 flex flex-col flex-1 bg-white">
                <h3 className="font-black text-lg text-talant-dark mb-2 leading-tight line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 text-paragraphs">{item.content}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-talant-green uppercase">Читать</span>
                  <button 
                    onClick={() => onOpenAnnouncement(item)}
                    className="w-10 h-10 bg-talant-green text-white rounded-xl flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}