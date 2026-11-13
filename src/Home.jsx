import React from 'react';
import { waLink } from './theme';
import heroVideo from './assets/heroo.mp4';

import Announcements from './Announcements';
import Achievements from './Achievements';
import Team from './Team';
import Prices from './Prices';
import Reviews from './Reviews';
import Media from './Media';

export default function Home({ onNavigate, onOpenMember, onOpenAnnouncement, onOpenPrice }) {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start px-4 py-10 relative bg-transparent z-10">
      
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 mb-16">
        <div className="text-center md:text-left order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-black text-talant-dark mb-4 leading-tight">
            Раскрываем таланты <br/>
            <span className="text-talant-green">в каждом ребенке</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-medium">
            Центр развития "Талант" — это уютное место, где дети учат языки, занимаются актерским мастерством и раскрывают свои лучшие качества.
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
      </div>

      {/* СЕКЦИИ */}
      <div className="w-full max-w-6xl mx-auto space-y-12 pb-20">
        <Announcements onOpenAnnouncement={onOpenAnnouncement} />
        <Achievements />
        <Team onOpenMember={onOpenMember} />
        <Prices onOpenPrice={onOpenPrice} />
        <Reviews />
        <Media />
      </div>

    </div>
  );
}