import React, { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import AdminPanel from './AdminPanel';
import TeamPage from './TeamPage';
import AnnouncementPage from './AnnouncementPage';
import PricePage from './PricePage';
import Footer from './Footer';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('talant_role');
    const savedCode = localStorage.getItem('talant_code');
    const savedName = localStorage.getItem('talant_name');
    if (savedRole && savedCode) setUser({ role: savedRole, code: savedCode, name: savedName });
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('talant_role', userData.role);
    localStorage.setItem('talant_code', userData.code);
    localStorage.setItem('talant_name', userData.name);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('talant_role');
    localStorage.removeItem('talant_code');
    localStorage.removeItem('talant_name');
    setCurrentPage('home');
  };

  const openMember = (member) => { setSelectedMember(member); setCurrentPage('team-page'); window.scrollTo(0, 0); };
  const openAnnouncement = (ann) => { setSelectedAnnouncement(ann); setCurrentPage('announcement-page'); window.scrollTo(0, 0); };
  const openPrice = (priceItem) => { setSelectedPrice(priceItem); setCurrentPage('price-page'); window.scrollTo(0, 0); };

  if (user?.role === 'admin') return <AdminPanel user={user} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen bg-transparent text-talant-dark font-sans flex flex-col relative">
      <Header onLoginClick={() => setShowLogin(true)} />
      
      <main className="flex-1 relative z-10">
        {currentPage === 'home' && <Home onOpenMember={openMember} onOpenAnnouncement={openAnnouncement} onOpenPrice={openPrice} />}
        
        {currentPage === 'team-page' && selectedMember && <TeamPage member={selectedMember} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'announcement-page' && selectedAnnouncement && <AnnouncementPage announcement={selectedAnnouncement} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'price-page' && selectedPrice && <PricePage priceItem={selectedPrice} onBack={() => setCurrentPage('home')} />}
      </main>

      <Footer />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
    </div>
  );
}