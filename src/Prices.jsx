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
      <h2 className="text-3xl font-black text-talant-dark mb-8 flex items-center gap-3">
        <span className="text-4xl">💰</span> Наши услуги и цены
      </h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">💰</span>
          <p className="text-gray-400 font-bold">Прайс-лист скоро обновится.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition duration-300 flex flex-col"
            >
              
              {/* Квадратное/прямоугольное фото сверху */}
              <div className="w-full h-56 bg-talant-bg overflow-hidden relative">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">📚</div>
                )}
              </div>

              {/* Контентная часть */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-black text-2xl text-talant-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 text-paragraphs">{item.description}</p>
                </div>
                
                <div>
                  {/* Блок с ценой */}
                  <div className="bg-talant-yellow/20 p-4 rounded-2xl border border-talant-yellow/50 mb-4 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-talant-dark/60 font-bold uppercase tracking-widest mb-1">Стоимость</span>
                    <span className="text-xl md:text-2xl font-black text-talant-dark text-center">
                      {item.price || 'По запросу'}
                    </span>
                  </div>

                  {/* Кнопка */}
                  <button 
                    onClick={() => onOpenPrice(item)}
                    className="w-full bg-talant-green text-white font-black py-3.5 rounded-xl hover:bg-green-500 transition shadow-md text-sm flex items-center justify-center gap-2"
                  >
                    Узнать подробнее →
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