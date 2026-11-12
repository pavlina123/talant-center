import React from 'react';
import { waLink } from './theme';

export default function TeamPage({ member, onBack }) {
  return (
    <div className="min-h-screen bg-talant-bg py-8 px-4 animate-pop-in">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-talant-dark font-bold transition">
          ← Назад ко всем специалистам
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-talant-green/20 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">👨‍🏫</div>
            )}
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block py-1 px-3 rounded-full bg-talant-yellow/30 text-talant-dark text-xs font-black uppercase mb-4 w-max">
              {member.role}
            </span>
            <h1 className="text-3xl md:text-4xl font-black mb-4">{member.name}</h1>
            
            <div className="mb-6">
              <h4 className="text-sm font-black text-gray-400 uppercase mb-2">Опыт работы</h4>
              <p className="text-lg font-bold text-talant-green">{member.experience || 'Не указан'}</p>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-black text-gray-400 uppercase mb-2">О специалисте</h4>
              <p className="text-gray-600 leading-relaxed text-paragraphs">{member.description || 'Описание пока не добавлено.'}</p>
            </div>

            <a href={waLink(`Хочу записаться к специалисту: ${member.name}`)} target="_blank" rel="noreferrer" className="block w-full bg-talant-green text-center text-white font-black py-4 rounded-xl hover:bg-green-500 transition shadow-lg text-lg">
              Записаться на прием
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}