import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Achievements({ onOpenAchievement }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('achievements').select('*').limit(4);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLike = (e, id) => {
    e.stopPropagation(); // Чтобы не открывалась страница при клике на сердечко
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

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
          <p className="text-gray-400 font-bold">Пока нет достижений. Скоро появятся!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => onOpenAchievement && onOpenAchievement(item)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_0_30px_rgba(255,209,102,0.4)] border-2 border-transparent hover:border-talant-yellow/50 transition-all duration-300 cursor-pointer flex flex-col"
            >
              
              {/* Прямоугольное фото */}
              <div className="relative w-full h-64 md:h-72 overflow-hidden bg-gray-100">
                {item.photo ? (
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🏆</div>
                )}
                
                {/* Золотая подсветка на фото */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                {/* Сердечко для лайка (поверх фото в правом углу) */}
                <button 
                  onClick={(e) => handleLike(e, item.id)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:text-red-500 hover:scale-110 transition-all duration-300 z-10 flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  <span className="text-xs font-bold text-white">{likes[item.id] || 0}</span>
                </button>
              </div>

              {/* Текст и кнопка снизу */}
              <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-talant-yellow/5">
                <h3 className="text-xl md:text-2xl font-black text-talant-dark mb-2 leading-tight group-hover:text-talant-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-3 text-paragraphs flex-1">
                  {item.description || 'Описание пока не добавлено.'}
                </p>
                
                <button className="w-full bg-talant-bg text-talant-dark font-black py-3 rounded-xl text-sm hover:bg-talant-yellow hover:text-talant-dark transition shadow-sm border border-talant-yellow/30 flex items-center justify-center gap-2">
                  Узнать всё <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}