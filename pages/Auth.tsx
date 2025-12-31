
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    consent: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignUp && !formData.consent) {
      setError('You must consent to marketing communications to proceed.');
      setLoading(false);
      return;
    }

    // Simulation of a backend call
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || (isSignUp ? 'New User' : 'Returning User'),
        email: formData.email,
        isVerified: false,
        createdAt: new Date().toISOString()
      };

      onAuthSuccess(newUser);
      setLoading(false);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-[#002366]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-blue-50">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold royal-blue uppercase tracking-tighter">
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-[#002366]/60 font-medium">
            {isSignUp ? 'Join Brandabi to scale your business' : 'Sign in to access your growth dashboard'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-bold border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-black text-royal-blue mb-1 uppercase tracking-widest">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-blue-100 placeholder-blue-200 text-royal-blue rounded-lg focus:outline-none focus:ring-royal-blue focus:border-royal-blue focus:z-10 sm:text-sm font-medium"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black text-royal-blue mb-1 uppercase tracking-widest">Email address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-blue-100 placeholder-blue-200 text-royal-blue rounded-lg focus:outline-none focus:ring-royal-blue focus:border-royal-blue focus:z-10 sm:text-sm font-medium"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-royal-blue mb-1 uppercase tracking-widest">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-blue-100 placeholder-blue-200 text-royal-blue rounded-lg focus:outline-none focus:ring-royal-blue focus:border-royal-blue focus:z-10 sm:text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="focus:ring-royal-blue h-4 w-4 text-royal-blue border-blue-100 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-black text-royal-blue uppercase text-[10px] tracking-widest">Growth Consent</label>
                <p className="text-[#002366]/50 text-xs">I consent to receive marketing updates and scaling strategies.</p>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-black rounded-lg text-royal-blue bg-golden-yellow hover:bg-[#E5A700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-blue transition-all shadow-lg uppercase tracking-tighter"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isSignUp ? 'Launch My Brand' : 'Access Marketplace'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-black text-royal-blue hover:text-golden-yellow transition-colors uppercase tracking-widest"
          >
            {isSignUp ? 'Already a partner? Sign in' : "New founder? Create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
