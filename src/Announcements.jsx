import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Announcements({ onOpenAnnouncement }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(4);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux mb-10">
        <span className="mr-3">📢</span> Объявления
      </h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">📢</span>
          <p className="text-gray-400 font-bold">Пока здесь пусто.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-2xl md:rounded-3xl overflow-hidden transition duration-300 flex flex-col hover:-translate-y-1">
              <div className="w-full aspect-[4/5] bg-talant-bg overflow-hidden cursor-pointer" onClick={() => onOpenAnnouncement(item)}>
                {item.cover_photo ? (
                  <img src={item.cover_photo} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                )}
              </div>
              <div className="p-2 md:p-5 flex flex-col flex-1">
                <h3 className="font-black text-xs md:text-lg text-talant-dark mb-1 md:mb-2 leading-tight line-clamp-2">{item.title}</h3>
                <p className="text-[10px] md:text-sm text-gray-500 line-clamp-2 mb-2 md:mb-4 flex-1 text-paragraphs hidden md:block">{item.content}</p>
                <div className="flex items-center justify-between mt-auto pt-2 md:pt-4 border-t border-gray-100/50">
                  <span className="text-[10px] md:text-xs font-bold text-talant-green uppercase">Читать</span>
                  <button onClick={() => onOpenAnnouncement(item)} className="w-7 h-7 md:w-10 md:h-10 bg-talant-green text-white rounded-lg md:rounded-xl flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all shadow-md">
                    <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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