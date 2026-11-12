import React from 'react';
import { waLink } from './theme';

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-talant-green/20 pt-12 pb-6 mt-auto relative overflow-hidden">
      
      {/* Декоративные пятна на фоне */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-talant-yellow/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-talant-green/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-center md:text-left">
          
          {/* Колонка 1: Логотип и миссия */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="text-4xl">🦔</div>
              <div>
                <h3 className="text-xl font-black text-talant-dark leading-none">Талант</h3>
                <p className="text-[10px] text-talant-green font-bold uppercase tracking-widest">Центр развития</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto md:mx-0">
              Раскрываем таланты в каждом ребенке. Уютная атмосфера, современные методики и лучшие специалисты.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="font-black text-lg text-talant-dark mb-4">Разделы</h4>
            <ul className="space-y-2 text-sm font-bold text-gray-500">
              <li><a href="#team" className="hover:text-talant-green transition">Коллектив</a></li>
              <li><a href="#prices" className="hover:text-talant-green transition">Прайс</a></li>
              <li><a href="#reviews" className="hover:text-talant-green transition">Отзывы</a></li>
              <li><a href="#announcements" className="hover:text-talant-green transition">Объявления</a></li>
            </ul>
          </div>

          {/* Колонка 3: Контакты и кнопка */}
          <div>
            <h4 className="font-black text-lg text-talant-dark mb-4">Связаться с нами</h4>
            <p className="text-sm font-bold text-gray-500 mb-2">📍 г. Астана</p>
            <a href={`tel:+77761748387`} className="text-sm font-bold text-gray-500 mb-4 block hover:text-talant-green transition">📞 +7 776 174 8387</a>
            
            <a 
              href={waLink()} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg hover:scale-105 transition-all w-full md:w-auto"
            >
              <span>💬</span> Написать
            </a>
          </div>

        </div>

        {/* Нижняя полоса */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400 font-bold">
            © {new Date().getFullYear()} Центр развития «Талант». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}