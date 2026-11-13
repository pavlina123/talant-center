import React from 'react';
import { waLink } from './theme';
import heroVideo from './assets/heroo.mp4';

import Activities from './Activities';
import Announcements from './Announcements';
import Achievements from './Achievements';
import Team from './Team';
import Prices from './Prices';
import Reviews from './Reviews';
import Media from './Media';

export default function Home({ onNavigate, onOpenMember, onOpenAnnouncement, onOpenPrice }) {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start relative bg-transparent z-10">
      
      {/* HERO SECTION (Видео и кнопки) */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="text-center md:text-left order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-black text-talant-dark mb-4 leading-tight">
            Раскрываем таланты <br/>
            <span className="text-talant-green">в каждом ребенке</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-medium">
            Детский центр "Талант" в Астане — это уютное место, где дети учат языки, занимаются творчеством и раскрывают свои лучшие качества.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-lux bg-talant-green text-white px-6 py-3.5 rounded-xl font-black text-base shadow-lg transition-all">
              Записаться на консультацию
            </a>
            <button onClick={() => onNavigate('prices')} className="btn-lux bg-talant-yellow text-talant-dark px-6 py-3.5 rounded-xl font-black text-base shadow-lg transition-all">
              Узнать о занятиях
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-full max-w-sm md:max-w-md aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-100/50 backdrop-blur-sm">
            <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ОСНОВНЫЕ СЕКЦИИ (с чередованием фона) */}
      <div className="w-full">
        {/* Секция 1: Чем занимаемся (светлый фон) */}
        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Activities />
          </div>
        </div>

        {/* Секция 2: Коллектив (прозрачный фон) */}
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Team onOpenMember={onOpenMember} />
          </div>
        </div>

        {/* Секция 3: Услуги и цены (светлый фон) */}
        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Prices onOpenPrice={onOpenPrice} />
          </div>
        </div>

        {/* Секция 4: Достижения (прозрачный фон) */}
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Achievements />
          </div>
        </div>

        {/* Секция 5: Объявления (светлый фон) */}
        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Announcements onOpenAnnouncement={onOpenAnnouncement} />
          </div>
        </div>

        {/* Секция 6: Отзывы (прозрачный фон) */}
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Reviews />
          </div>
        </div>

        {/* Секция 7: Медиагалерея (светлый фон) */}
        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <Media />
          </div>
        </div>
      </div>
      
    </div>
  );
}