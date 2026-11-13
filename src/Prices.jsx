import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Prices({ onOpenPrice }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('prices').select('*').limit(4);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux">Наши услуги и цены</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-bold">Прайс-лист скоро обновится.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-2xl md:rounded-3xl overflow-hidden transition duration-300 flex flex-col hover:-translate-y-1">
              <div className="w-full h-32 md:h-56 bg-talant-bg overflow-hidden relative">
                {item.photo ? <img src={item.photo} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl text-talant-yellow">📚</div>}
              </div>
              <div className="p-2 md:p-6 flex flex-col flex-1 justify-between bg-white/50">
                <div>
                  <h3 className="font-black text-xs md:text-xl text-talant-dark mb-1 md:mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-[10px] md:text-sm text-gray-500 mb-2 md:mb-6 text-paragraphs line-clamp-2 hidden md:block">{item.description}</p>
                </div>
                <div>
                  <div className="bg-talant-yellow/20 p-2 md:p-4 rounded-lg md:rounded-2xl border border-talant-yellow/50 mb-2 md:mb-4 flex flex-col items-center justify-center">
                    <span className="text-[8px] md:text-[10px] text-talant-brown font-bold uppercase tracking-widest mb-0.5 md:mb-1">Цена</span>
                    <span className="text-xs md:text-lg font-black text-talant-dark text-center">{item.price || 'По запросу'}</span>
                  </div>
                  <button onClick={() => onOpenPrice(item)} className="btn-lux w-full bg-talant-green text-white font-black py-1.5 md:py-3 rounded-lg md:rounded-xl hover:bg-green-600 transition shadow-md text-[10px] md:text-sm flex items-center justify-center">Подробнее</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}