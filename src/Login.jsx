import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Login({ isOpen, onClose, onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: err } = await supabase.from('access_codes').select('role, name').eq('code', code.trim().toUpperCase()).single();
      if (err || !data) throw new Error('Неверный код доступа');
      onLogin({ role: data.role, name: data.name, code: code.trim().toUpperCase() });
      setCode('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl relative animate-pop-in border-4 border-talant-green">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">✕</button>
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🦔</div>
          <h2 className="text-2xl font-black text-talant-dark">Вход для персонала</h2>
          <p className="text-xs text-gray-500">Введите ваш секретный код</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="AD12" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-black tracking-widest uppercase focus:border-talant-green outline-none" required />
          {error && <div className="text-red-500 text-xs text-center">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-talant-green text-white font-black py-3 rounded-xl hover:bg-green-500 transition shadow-lg">
            {loading ? 'Проверка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}