
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { User } from './types';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Verification from './pages/Verification';
import Storefront from './pages/Storefront';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import LiveVoiceAssistant from './components/LiveVoiceAssistant';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('brandabeware_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('brandabeware_user');
    setUser(null);
    navigate('/');
  };

  const handleUpdateUser = (updatedUser: User | null) => {
    if (updatedUser) {
      localStorage.setItem('brandabeware_user', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('brandabeware_user');
    }
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002366]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/auth" element={
            user ? <Navigate to="/store" /> : <Auth onAuthSuccess={handleUpdateUser} />
          } />
          {/* Keep verification route for manual access or future refinement, but primary flow now bypasses it */}
          <Route path="/verify" element={
            user ? (user.isVerified ? <Navigate to="/store" /> : <Verification user={user} onVerified={handleUpdateUser} />) : <Navigate to="/auth" />
          } />
          <Route path="/store" element={
            user ? <Storefront /> : <Navigate to="/auth" />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
      <AIAssistant />
      <LiveVoiceAssistant />
    </div>
  );
};

export default App;
