import React from 'react';

const activities = [
  { title: 'Подготовка к школе', color: 'bg-talant-yellow/20 border-talant-yellow/40' },
  { title: 'Рисование', color: 'bg-talant-green/20 border-talant-green/40' },
  { title: 'Мастер-классы', color: 'bg-talant-brown/10 border-talant-brown/20' },
  { title: 'Брейк-данс', color: 'bg-talant-yellow/20 border-talant-yellow/40' },
  { title: 'Карате', color: 'bg-gray-100 border-gray-300' },
  { title: 'Языки', color: 'bg-talant-green/20 border-talant-green/40' },
  { title: 'Минисад', color: 'bg-talant-brown/10 border-talant-brown/20' },
  { title: 'Логопед-дефектолог', color: 'bg-talant-yellow/20 border-talant-yellow/40' },
];

export default function Activities() {
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux">Чем мы занимаемся</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8">
        {activities.map((item, index) => (
          <div 
            key={index} 
            className={`glass-card rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 ${item.color}`}
          >
            <h3 className="font-black text-sm md:text-base text-talant-dark leading-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}