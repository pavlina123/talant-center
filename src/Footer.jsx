import React from 'react';
import { waLink, PHONE_DISPLAY, INSTAGRAM_URL, WHATSAPP } from './theme';
import logo from './assets/logo.png'; 

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-talant-green/20 pt-12 pb-6 mt-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-talant-yellow/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-talant-green/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center md:text-left">
          
          {/* Логотип */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="Талант" className="h-16 w-auto object-contain mb-4" />
            <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto md:mx-0">
              Раскрываем таланты в каждом ребенке. Уютная атмосфера и лучшие специалисты.
            </p>
          </div>

          {/* Контакты */}
          <div className="text-center md:text-left">
            <h4 className="font-black text-lg text-talant-dark mb-4">Контакты</h4>
            <p className="text-sm font-bold text-gray-500 mb-2">📍 ул. Кенесары 45, Астана</p>
            <a href={`tel:+${WHATSAPP}`} className="text-sm font-bold text-gray-500 mb-2 block hover:text-talant-green transition">📞 {PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-500 hover:text-talant-pink transition">📸 @centertalant</a>
          </div>

          {/* Кнопка */}
          <div className="flex flex-col items-center md:items-end">
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg hover:scale-105 transition-all w-full md:w-auto">
              <span>💬</span> Написать в WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400 font-bold">
            © {new Date().getFullYear()} Центр развития «Талант». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}