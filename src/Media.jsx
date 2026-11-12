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
      <h2 className="text-3xl font-black text-talant-dark mb-8">Медиагалерея</h2>
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">🎬</span>
          <p className="text-gray-400 font-bold">Видео и фото скоро появятся.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                 <div className="relative pt-[56.25%] rounded-xl overflow-hidden mb-4">
                   <iframe src={item.url.replace('watch?v=', 'embed/')} className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
                 </div>
              ) : (
                <video src={item.url} controls className="w-full aspect-video object-cover rounded-xl mb-4" />
              )}
              <h3 className="font-black text-sm">{item.title}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}