import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Media() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('interesting').select('*').limit(3);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-black text-talant-dark mb-8 flex items-center gap-3">
        <span className="text-4xl">🎬</span> Медиагалерея
      </h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">🎬</span>
          <p className="text-gray-400 font-bold">Видео и фото скоро появятся.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-gray-100">
              {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                 <div className="relative pt-[56.25%] rounded-2xl overflow-hidden">
                   <iframe src={item.url.replace('watch?v=', 'embed/')} className="absolute inset-0 w-full h-full" allowFullScreen title={item.title}></iframe>
                 </div>
              ) : (
                <video src={item.url} controls className="w-full aspect-video object-cover rounded-2xl" />
              )}
              <h3 className="font-black text-sm md:text-lg mt-3 md:mt-4 text-talant-dark text-center">{item.title}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}