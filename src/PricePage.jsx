import React from 'react';
import { waLink } from './theme';

export default function PricePage({ priceItem, onBack }) {
  if (!priceItem) return null;

  return (
    <div className="min-h-screen bg-talant-bg py-8 px-4 animate-pop-in">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-talant-brown hover:text-talant-dark font-bold transition">
          ← Назад ко всем услугам
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-talant-brown/10 flex flex-col md:flex-row">
          
          {/* Фото */}
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
            {priceItem.photo ? (
              <img src={priceItem.photo} alt={priceItem.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl text-talant-yellow">📚</div>
            )}
          </div>

          {/* Информация */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-black text-talant-dark mb-4">{priceItem.title}</h1>
            
            <p className="text-gray-600 leading-relaxed text-paragraphs mb-6 text-sm md:text-base">
              {priceItem.description || 'Описание пока не добавлено.'}
            </p>

            {/* Аккуратная цена */}
            <div className="flex items-center gap-3 mb-8 bg-talant-green/10 p-4 rounded-2xl w-max">
              <span className="text-sm font-bold text-talant-brown uppercase">Стоимость:</span>
              <span className="text-xl md:text-2xl font-black text-talant-green">{priceItem.price || 'По запросу'}</span>
            </div>

            <a 
              href={waLink(`Хочу записаться на услугу: ${priceItem.title}`)} 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full bg-talant-brown text-center text-white font-black py-3.5 rounded-xl hover:bg-talant-dark transition shadow-lg text-base"
            >
              Записаться на услугу
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}