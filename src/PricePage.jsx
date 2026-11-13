import React from 'react';
import { waLink } from './theme';

export default function PricePage({ priceItem, onBack }) {
  if (!priceItem) return null;

  return (
    <div className="min-h-screen bg-talant-bg py-8 px-4 animate-pop-in">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-talant-brown hover:text-talant-dark font-bold transition">
          ← Назад ко всем услугам
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-talant-brown/10">
          
          {/* Фото */}
          {priceItem.photo && (
            <div className="w-full h-64 md:h-80 bg-gray-100 relative">
              <img src={priceItem.photo} alt={priceItem.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Информация */}
          <div className="p-6 md:p-10 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-black text-talant-dark mb-4">{priceItem.title}</h1>
            
            <div className="bg-talant-bg p-5 rounded-2xl mb-6">
              <p className="text-gray-600 leading-relaxed text-paragraphs text-sm md:text-base">
                {priceItem.description || 'Описание пока не добавлено.'}
              </p>
            </div>

            {/* Блок с ценой (всегда по центру и аккуратно) */}
            <div className="flex flex-col items-center justify-center bg-talant-green/10 border border-talant-green/30 p-5 rounded-2xl mb-8">
              <span className="text-xs text-talant-brown font-bold uppercase tracking-widest mb-1">Стоимость услуги</span>
              <span className="text-2xl md:text-3xl font-black text-talant-green text-center">{priceItem.price || 'По запросу'}</span>
            </div>

            {/* Кнопка записи */}
            <a 
              href={waLink(`Хочу записаться на услугу: ${priceItem.title}`)} 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full bg-talant-green text-center text-white font-black py-4 rounded-xl hover:bg-green-600 transition shadow-lg text-lg"
            >
              Записаться на услугу
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}