
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { User } from '../types';

interface LandingProps {
  user: User | null;
}

const Landing: React.FC<LandingProps> = ({ user }) => {
  const [brandName, setBrandName] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const runBrandCheck = async () => {
    if (!brandName.trim()) return;
    setLoadingAnalysis(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: `Analyze the branding potential for a new venture named "${brandName}". Provide a brief "Market Potential" summary and 3 bullet points on how Brandabi can help them scale using business registration, web development, and AI ads. Use a professional, high-energy tone. Keep it under 150 words.`,
      });
      setAnalysis(response.text || 'Analysis failed. Please try again.');
    } catch (error) {
      console.error(error);
      setAnalysis('Unable to process analysis at this moment. Please sign up to connect with a Brandabi growth consultant.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="w-full text-[#002366]">
      {/* Hero Section */}
      <section className="bg-royal-blue text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-golden-yellow opacity-10 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-golden-yellow/20 text-golden-yellow px-4 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-golden-yellow/30">
                Register • Develop • Growth
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Your Global Business <br />
                <span className="text-golden-yellow">Starts with Brandabi.</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                From CAC and International registration to high-performance custom websites and AI-powered video ads. We build the foundation for your brand's dominance.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to={user ? "/store" : "/auth"} 
                  className="bg-golden-yellow hover:bg-[#E5A700] text-royal-blue text-center px-8 py-4 rounded-lg font-bold text-lg shadow-xl transform transition hover:-translate-y-1"
                >
                  {user ? 'Explore Services' : 'Get Started Now'}
                </Link>
                <a 
                  href="#services"
                  className="border-2 border-blue-200 hover:border-white text-center px-8 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  Our Solutions
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative">
               <div className="absolute -inset-4 bg-golden-yellow/20 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                alt="Business Growth" 
                className="rounded-2xl shadow-2xl border-2 border-white/10 relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Potential Tool */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 royal-blue">Discover Your Brand's Scaling Potential</h2>
          <p className="text-[#002366]/70 mb-10 text-lg">
            Enter your proposed brand name for an instant AI-powered growth roadmap.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. Acme Tech Solutions" 
              className="flex-grow p-4 border-2 border-blue-50 rounded-lg focus:border-royal-blue outline-none text-lg transition-all text-[#002366]"
            />
            <button 
              onClick={runBrandCheck}
              disabled={loadingAnalysis || !brandName}
              className="bg-royal-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 disabled:bg-blue-200 transition-all flex items-center justify-center min-w-[200px]"
            >
              {loadingAnalysis ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Analyze Growth'}
            </button>
          </div>

          {analysis && (
            <div className="bg-blue-50/50 p-8 rounded-xl border-t-8 border-golden-yellow text-left shadow-lg animate-fade-in">
              <div className="prose max-w-none text-[#002366] whitespace-pre-line font-medium leading-relaxed">
                {analysis}
              </div>
              <div className="mt-8 flex items-center justify-between p-4 bg-royal-blue text-white rounded-lg">
                 <span className="font-bold">Ready to make this happen?</span>
                 <Link to="/auth" className="bg-golden-yellow text-royal-blue px-4 py-2 rounded font-bold hover:bg-[#E5A700] transition-colors">Start Registration</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 bg-royal-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-16 text-white uppercase tracking-tight">
            End-to-End Business Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Business Registration',
                desc: 'CAC Nigeria & Global setup (US, UK, Canada) with full documentation.',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              },
              {
                title: 'Web Development',
                desc: 'WordPress or Custom-coded. Business, E-commerce, Church, and Schools.',
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
              },
              {
                title: 'AI Branding Video Ads',
                desc: 'High-converting custom AI video ads designed to sell products faster.',
                icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
              },
              {
                title: 'Content Strategy',
                desc: 'Strategic 10 & 30-day content calendars focused on virality and growth.',
                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              }
            ].map((s, i) => (
              <div key={i} className="bg-blue-900/40 p-8 rounded-2xl border border-blue-400/20 hover:border-golden-yellow transition-all shadow-2xl group hover:bg-blue-900/60">
                <div className="bg-golden-yellow w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-royal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white tracking-wide uppercase">{s.title}</h3>
                <p className="text-blue-50 text-sm leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold royal-blue mb-4">Success Stories from Global Founders</h2>
            <p className="text-lg text-[#002366]/60 max-w-2xl mx-auto">
              See how Brandabi has empowered entrepreneurs to launch and scale their ventures across borders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Adebayo T.",
                role: "Founder, Zenith Logistics",
                quote: "Brandabi handled our CAC registration and US EIN setup in record time. Their efficiency allowed us to focus on our operations without worrying about compliance.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
                service: "Global Registration"
              },
              {
                name: "Sarah Jenkins",
                role: "Director, EcoFlow UK",
                quote: "The AI video ads generated by Brandabi completely transformed our social media engagement. We saw a 3x increase in conversion rates within the first month.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
                service: "AI Branding Ads"
              },
              {
                name: "Chidi Okafor",
                role: "Lead Pastor, Global Grace",
                quote: "Our new custom church management platform is seamless. Brandabi understood our specific needs and delivered a high-performance site that our congregation loves.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
                service: "Custom Web Dev"
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-blue-50 flex flex-col hover:shadow-xl transition-all">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-golden-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#002366] italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="mt-auto flex items-center space-x-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-golden-yellow" />
                  <div>
                    <h4 className="font-bold text-royal-blue">{t.name}</h4>
                    <p className="text-xs text-[#002366]/50 font-medium">{t.role}</p>
                    <span className="text-[10px] bg-blue-50 text-royal-blue px-2 py-0.5 rounded-full font-bold uppercase mt-1 inline-block">
                      {t.service}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-royal-blue text-white text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Stop dreaming. Start building.</h2>
          <p className="text-xl text-blue-100 mb-10">Join thousands of entrepreneurs who trust Brandabi for their digital infrastructure.</p>
          <Link 
            to="/auth" 
            className="inline-block bg-golden-yellow hover:bg-[#E5A700] text-royal-blue px-10 py-5 rounded-xl font-bold text-xl shadow-2xl transition-all"
          >
            Launch Your Brand Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
