import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Media() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('interesting').select('*').limit(6);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-black title-lux mb-10">
        <span className="mr-3">🎬</span> Медиагалерея
      </h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">🎬</span>
          <p className="text-gray-400 font-bold">Видео и фото скоро появятся.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-2xl md:rounded-3xl overflow-hidden flex flex-col group">
              <div className="relative w-full aspect-[9/16] bg-talant-bg overflow-hidden">
                {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                  <iframe 
                    src={item.url.replace('watch?v=', 'embed/').replace('shorts/', 'embed/')} 
                    className="absolute inset-0 w-full h-full" 
                    allowFullScreen 
                    title={item.title}
                  ></iframe>
                ) : (
                  <video src={item.url} controls className="w-full h-full object-cover" preload="metadata" />
                )}
              </div>
              <div className="p-2 md:p-4 bg-white/50 text-center border-t border-gray-50">
                <h3 className="font-black text-[10px] md:text-sm text-talant-dark line-clamp-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}