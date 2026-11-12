import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Achievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('achievements').select('*').limit(4);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-black text-talant-dark mb-8 flex items-center gap-3">
        <span className="text-4xl">🏆</span> Наши достижения
      </h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">🏆</span>
          <p className="text-gray-400 font-bold">Пока нет достижений.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {items.map(item => (
            <div key={item.id} className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_0_30px_rgba(255,209,102,0.4)] border-2 border-transparent hover:border-talant-yellow/50 transition-all duration-300 flex flex-col">
              <div className="relative w-full h-40 md:h-64 overflow-hidden bg-gray-100">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl">🏆</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="p-3 md:p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-talant-yellow/5">
                <h3 className="text-sm md:text-xl font-black text-talant-dark mb-1 md:mb-2 leading-tight group-hover:text-talant-yellow transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-[10px] md:text-sm text-gray-500 mb-2 md:mb-6 line-clamp-2 text-paragraphs flex-1 hidden md:block">{item.description}</p>
                <button className="w-full bg-talant-bg text-talant-dark font-black py-1.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-sm hover:bg-talant-yellow transition shadow-sm border border-talant-yellow/30 flex items-center justify-center gap-1 md:gap-2">
                  Узнать всё
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}