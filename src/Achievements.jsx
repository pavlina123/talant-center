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
      <h2 className="text-3xl md:text-4xl font-black title-lux">Наши достижения</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-bold">Пока нет достижений.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col">
              
              {/* Фото на всю карточку */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-talant-yellow">🏆</div>
                )}
              </div>

              {/* Только заголовок снизу, без кнопок */}
              <div className="p-2 md:p-4 text-center bg-white/50">
                <h3 className="font-black text-xs md:text-base text-talant-dark line-clamp-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}