import React from 'react';

const activities = [
  { title: 'Подготовка к школе', icon: '🎒', color: 'bg-talant-blue/20 text-blue-700 border-talant-blue/30' },
  { title: 'Рисование', icon: '🎨', color: 'bg-talant-pink/20 text-pink-700 border-talant-pink/30' },
  { title: 'Мастер-классы', icon: '🎭', color: 'bg-talant-yellow/20 text-yellow-700 border-talant-yellow/30' },
  { title: 'Брейк-данс', icon: '🕺', color: 'bg-talant-purple/20 text-purple-700 border-talant-purple/30' },
  { title: 'Карате', icon: '🥋', color: 'bg-gray-200 text-gray-800 border-gray-300' },
  { title: 'Языки', icon: '🗣️', color: 'bg-talant-green/20 text-green-700 border-talant-green/30' },
  { title: 'Минисад', icon: '🧩', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { title: 'Логопед-дефектолог', icon: '👩‍⚕️', color: 'bg-red-100 text-red-700 border-red-200' },
];

export default function Activities() {
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux mb-10 text-center md:text-left">
        <span className="mr-3">🌟</span> Чем мы занимаемся
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {activities.map((item, index) => (
          <div 
            key={index} 
            className={`glass-card rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 ${item.color.split(' ')[2]}`}
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-4 shadow-sm ${item.color.split(' ')[0]} ${item.color.split(' ')[1]}`}>
              {item.icon}
            </div>
            <h3 className="font-black text-xs md:text-base text-talant-dark leading-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}