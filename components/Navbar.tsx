import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-royal-blue text-white shadow-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="https://brandabi.com" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center">
              <img 
                src="https://i.postimg.cc/hGNHQzXK/photo-5983510126688061654-y.jpg" 
                alt="Brandabi Logo" 
                className="h-10 md:h-12 w-auto rounded-md object-contain transform group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Brand<span className="text-golden-yellow">abi</span></span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-xs font-black uppercase tracking-widest hover:text-golden-yellow transition-colors ${location.pathname === '/' ? 'text-golden-yellow' : 'text-blue-100'}`}>Home</Link>
            {user && (
              <Link to="/store" className={`text-xs font-black uppercase tracking-widest hover:text-golden-yellow transition-colors ${location.pathname === '/store' ? 'text-golden-yellow' : 'text-blue-100'}`}>Marketplace</Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em]">Partner: {user.name.split(' ')[0]}</span>
                <button 
                  onClick={onLogout}
                  className="bg-blue-900/50 hover:bg-golden-yellow hover:text-royal-blue border border-white/10 px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="bg-golden-yellow hover:bg-[#E5A700] text-royal-blue px-6 py-2.5 rounded font-black uppercase text-xs shadow-2xl transform hover:-translate-y-0.5 transition-all tracking-widest"
              >
                Get Started
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Link to={user ? "/store" : "/auth"} className="text-golden-yellow hover:scale-110 transition-transform p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};export default Navbar;