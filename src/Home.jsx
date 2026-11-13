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
      
      {/* HERO SECTION */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Левая часть: Текст и кнопки */}
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

          {/* Правая часть: Видео с ежиком */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-100/50 backdrop-blur-sm">
              <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* НОВЫЙ БЛОК С ЦИФРАМИ (КАК НА ФОТО) */}
        <div className="mt-12 md:mt-16 bg-talant-green/10 border border-talant-green/20 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-talant-dark mb-2">ТАЛАНТ</h2>
          <p className="text-sm md:text-base text-talant-green font-bold mb-6">Студия гармоничного развития детей</p>
          
          <h3 className="text-lg md:text-xl font-black text-talant-dark mb-4 leading-relaxed">
            Раскрываем таланты. <br className="hidden md:block" />
            Поддерживаем детство. <br className="hidden md:block" />
            Помогаем семьям.
          </h3>
          
          <p className="text-gray-600 text-xs md:text-sm mb-8 max-w-lg mx-auto">
            Пространство, где каждый ребёнок развивается в своём темпе, открывает способности и верит в себя.
          </p>

          <hr className="border-talant-green/20 mb-8 w-3/4 mx-auto" />

          {/* Статистика */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-3xl md:text-5xl font-black text-talant-green mb-1">15+</div>
              <div className="text-xs md:text-sm text-gray-500 font-medium">лет опыта</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black text-talant-green mb-1">15+</div>
              <div className="text-xs md:text-sm text-gray-500 font-medium">направлений</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black text-talant-green mb-1">100%</div>
              <div className="text-xs md:text-sm text-gray-500 font-medium">внимания<br/>к ребёнку</div>
            </div>
          </div>
        </div>

      </section>

      {/* ОСТАЛЬНЫЕ СЕКЦИИ */}
      <div className="w-full">
        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4"><Activities /></div>
        </div>

        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4"><Team onOpenMember={onOpenMember} /></div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4"><Prices onOpenPrice={onOpenPrice} /></div>
        </div>

        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4"><Achievements /></div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4"><Announcements onOpenAnnouncement={onOpenAnnouncement} /></div>
        </div>

        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4"><Reviews /></div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8">
          <div className="max-w-6xl mx-auto px-4"><Media /></div>
        </div>
      </div>
    </div>
  );
}