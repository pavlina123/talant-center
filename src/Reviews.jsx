import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('reviews').select('*').limit(3);
      if (data) setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-black text-talant-dark mb-8">Отзывы родителей</h2>
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-bold">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <span className="text-5xl block mb-4">⭐</span>
          <p className="text-gray-400 font-bold">Пока нет отзывов. Станьте первым!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex text-talant-yellow mb-2 text-lg">
                {Array.from({ length: item.rating || 5 }).map((_, i) => <span key={i}>⭐</span>)}
              </div>
              <p className="text-sm text-gray-600 mb-4 italic text-paragraphs">"{item.text}"</p>
              <div className="font-black text-sm text-talant-dark">— {item.author}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}