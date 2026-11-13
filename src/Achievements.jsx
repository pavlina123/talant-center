import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Achievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // Стейт для модалки

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
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)} // Открываем модалку
              className="glass-card rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-talant-yellow">🏆</div>
                )}
              </div>
              <div className="p-2 md:p-4 text-center bg-white/50">
                <h3 className="font-black text-xs md:text-base text-talant-dark line-clamp-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in"
          onClick={() => setSelectedItem(null)} // Закрыть при клике на фон
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Чтобы не закрывалось при клике внутри
          >
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-talant-dark hover:bg-red-500 hover:text-white transition z-10"
            >
              ✕
            </button>

            {/* Фото */}
            {selectedItem.photo && (
              <div className="w-full max-h-[500px] overflow-hidden bg-gray-100 flex justify-center">
                <img src={selectedItem.photo} alt={selectedItem.title} className="w-full h-auto object-contain" />
              </div>
            )}
            
            {/* Текст */}
            <div className="p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-talant-dark mb-4">{selectedItem.title}</h2>
              <p className="text-gray-600 leading-relaxed text-paragraphs text-sm md:text-base">
                {selectedItem.description || 'Описание пока не добавлено.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}