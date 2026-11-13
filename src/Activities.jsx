import React from 'react';

const activities = [
  { title: 'Подготовка к школе', icon: '🎒', color: 'bg-talant-yellow/20 border-talant-yellow/40 text-talant-brown' },
  { title: 'Рисование', icon: '🎨', color: 'bg-talant-green/20 border-talant-green/40 text-talant-green' },
  { title: 'Мастер-классы', icon: '🎭', color: 'bg-talant-brown/10 border-talant-brown/20 text-talant-brown' },
  { title: 'Брейк-данс', icon: '🕺', color: 'bg-talant-yellow/20 border-talant-yellow/40 text-talant-brown' },
  { title: 'Карате', icon: '🥋', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { title: 'Языки', icon: '🗣️', color: 'bg-talant-green/20 border-talant-green/40 text-talant-green' },
  { title: 'Минисад', icon: '🧩', color: 'bg-talant-brown/10 border-talant-brown/20 text-talant-brown' },
  { title: 'Логопед-дефектолог', icon: '👩‍⚕️', color: 'bg-talant-yellow/20 border-talant-yellow/40 text-talant-brown' },
];

export default function Activities() {
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux">Чем мы занимаемся</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8">
        {activities.map((item, index) => (
          <div 
            key={index} 
            className={`glass-card rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 ${item.color.split(' ')[2]}`}
          >
            {/* Крупная эмодзи */}
            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-5xl mb-3 md:mb-4 shadow-sm ${item.color.split(' ')[0]} ${item.color.split(' ')[1]}`}>
              {item.icon}
            </div>
            
            {/* Название */}
            <h3 className="font-black text-xs md:text-base text-talant-dark leading-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}