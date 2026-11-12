import React from 'react';

export default function AnnouncementPage({ announcement, onBack }) {
  if (!announcement) return null;

  return (
    <div className="min-h-screen bg-talant-bg py-8 px-4 animate-pop-in">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-talant-dark font-bold transition">
          ← Назад ко всем объявлениям
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-talant-green/20">
          
          {/* ОГРОМНОЕ ДЛИННОЕ ФОТО */}
          {announcement.cover_photo && (
            <div className="w-full max-h-[600px] overflow-hidden bg-gray-100 flex justify-center">
              <img 
                src={announcement.cover_photo} 
                alt={announcement.title} 
                className="w-full h-auto object-cover" 
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <span className="text-sm font-black text-talant-green uppercase tracking-wider">
              {new Date(announcement.created_at).toLocaleDateString('ru-RU')}
            </span>
            <h1 className="text-3xl md:text-4xl font-black mt-3 mb-6 leading-tight text-talant-dark">{announcement.title}</h1>
            <p className="text-gray-600 leading-loose whitespace-pre-wrap text-base md:text-lg text-paragraphs">{announcement.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}