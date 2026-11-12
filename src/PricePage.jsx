import React from 'react';
import { waLink } from './theme';

export default function PricePage({ priceItem, onBack }) {
  if (!priceItem) return null;

  return (
    <div className="min-h-screen bg-talant-bg py-8 px-4 animate-pop-in">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-talant-dark font-bold transition">
          ← Назад ко всем услугам
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-talant-green/20 flex flex-col md:flex-row">
          {/* Фото */}
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
            {priceItem.photo ? (
              <img src={priceItem.photo} alt={priceItem.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">📚</div>
            )}
          </div>

          {/* Информация */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-black text-talant-dark mb-4">{priceItem.title}</h1>
            
            <div className="bg-talant-bg p-4 rounded-xl mb-6">
              <p className="text-gray-600 leading-relaxed text-paragraphs">{priceItem.description || 'Описание пока не добавлено.'}</p>
            </div>

            {/* Большая подсвеченная цена */}
            <div className="bg-talant-yellow/20 p-6 rounded-2xl border-2 border-talant-yellow text-center mb-8 shadow-sm">
              <span className="text-sm text-talant-dark font-bold uppercase block mb-1">Стоимость</span>
              <span className="text-4xl font-black text-talant-dark">{priceItem.price || 'По запросу'}</span>
            </div>

            <a 
              href={waLink(`Хочу записаться на услугу: ${priceItem.title}`)} 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full bg-talant-green text-center text-white font-black py-4 rounded-xl hover:bg-green-500 transition shadow-lg text-lg"
            >
              Записаться на услугу
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}