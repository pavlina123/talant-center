import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Team({ onOpenMember }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('team').select('*').limit(4);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux">Наш коллектив</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-bold">Специалисты скоро появятся.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => onOpenMember(item)} 
              className="glass-card rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-1 transition duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[3/4] bg-talant-bg overflow-hidden">
                {item.photo ? (
                  <img src={item.photo} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-talant-brown">👨‍🏫</div>
                )}
              </div>

              <div className="p-3 md:p-4 flex flex-col flex-1 justify-between text-center bg-white/50">
                <div>
                  <h3 className="font-black text-sm md:text-base text-talant-dark leading-tight mb-1">{item.name}</h3>
                  <p className="text-xs text-talant-brown font-bold mb-3">{item.role}</p>
                </div>
                <button className="w-full bg-talant-bg text-talant-dark font-bold py-2 rounded-xl text-xs hover:bg-talant-green hover:text-white transition">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}