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

export default function Home({ onOpenMember, onOpenAnnouncement, onOpenPrice }) {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start relative bg-transparent z-10">
      
      {/* HERO SECTION */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="order-2 md:order-1">
            {/* Блок с цифрами */}
            <div className="bg-talant-green/10 border border-talant-green/20 backdrop-blur-md rounded-3xl p-6 md:p-8 text-center shadow-sm mb-6">
              <h2 className="text-xl md:text-2xl font-black text-talant-dark mb-1">ТАЛАНТ</h2>
              <p className="text-xs md:text-sm text-talant-green font-bold mb-4">Студия гармоничного развития детей</p>
              
              <h1 className="text-lg md:text-xl font-black text-talant-dark mb-3 leading-relaxed">
                Раскрываем таланты. <br/>
                Поддерживаем детство. <br/>
                Помогаем семьям.
              </h1>
              
              <p className="text-gray-600 text-xs md:text-sm mb-6 max-w-sm mx-auto">
                Пространство, где каждый ребёнок развивается в своём темпе, открывает способности и верит в себя.
              </p>

              <hr className="border-talant-green/20 mb-6 w-3/4 mx-auto" />

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-talant-green mb-1">15+</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold">лет опыта</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-talant-green mb-1">15+</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold">направлений</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-talant-green mb-1">100%</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold">внимания</div>
                </div>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn-lux bg-talant-green text-white px-6 py-3.5 rounded-xl font-black text-base shadow-lg transition-all text-center">
                Записаться на консультацию
              </a>
              
              {/* Кнопка-якорь для прокрутки вниз */}
              <a href="#prices" className="btn-lux bg-talant-yellow text-talant-dark px-6 py-3.5 rounded-xl font-black text-base shadow-lg transition-all text-center">
                Узнать о занятиях
              </a>
            </div>
          </div>

          {/* Видео */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-100/50 backdrop-blur-sm">
              <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
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

        {/* Секция с ценами и ID для прокрутки */}
        <div id="prices" className="bg-white/30 backdrop-blur-sm border-y border-talant-brown/5 py-8 scroll-mt-24">
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