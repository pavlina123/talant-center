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
              
              {/* Фото */}
              <div className="w-full h-32 md:h-48 bg-talant-bg overflow-hidden relative">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl text-talant-yellow">📚</div>
                )}
              </div>

              {/* Текст и кнопка */}
              <div className="p-3 md:p-5 flex flex-col flex-1 justify-between bg-white/50">
                <div>
                  <h3 className="font-black text-xs md:text-lg text-talant-dark mb-1 md:mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-[10px] md:text-sm text-gray-500 mb-3 md:mb-4 text-paragraphs line-clamp-2 hidden md:block">{item.description}</p>
                </div>
                
                <div className="mt-auto">
                  {/* Аккуратная цена */}
                  <div className="flex items-center gap-1 mb-2 md:mb-3">
                    <span className="text-[9px] md:text-xs text-talant-brown font-bold uppercase">Цена:</span>
                    <span className="text-xs md:text-sm font-black text-talant-green bg-talant-green/10 px-2 py-0.5 rounded-md">{item.price || 'По запросу'}</span>
                  </div>
                  
                  <button onClick={() => onOpenPrice(item)} className="btn-lux w-full bg-talant-brown text-white font-black py-1.5 md:py-2.5 rounded-lg md:rounded-xl hover:bg-talant-dark transition shadow-md text-[10px] md:text-sm flex items-center justify-center">
                    Подробнее
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