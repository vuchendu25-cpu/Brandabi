
import React, { useState, useEffect } from 'react';

interface ServiceItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

const Storefront: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dashboardLink = "https://selfany.com/ln/Brandabi";

  // Dynamic service list for quick access below the main dashboard link
  const QUICK_SERVICES: ServiceItem[] = [
    {
      name: "Business Registration",
      description: "CAC Nigeria or International registration (US, UK, Canada).",
      url: "https://selfany.com/Brandabi0",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      name: "Web Development",
      description: "WordPress or Custom-coded business websites.",
      url: "https://selfany.com/brandabi21",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: "AI Branding Video Ads",
      description: "High-converting custom AI video ads.",
      url: "https://selfany.com/brandabi31",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = (url: string) => {
    if (!url) {
      alert("Service temporarily unavailable");
      return;
    }
    window.location.href = url;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col relative overflow-x-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-royal-blue flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-golden-yellow rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-black text-white uppercase tracking-tighter">
            Authorizing <span className="text-golden-yellow">Access</span>
          </h2>
        </div>
      )}

      {/* Main Hero & Dashboard Gateway */}
      <section className="bg-royal-blue text-white py-20 px-6 relative overflow-hidden border-b-4 border-golden-yellow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-golden-yellow opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-5 translate-y-1/2 -translate-x-1/2 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-golden-yellow/10 text-golden-yellow px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-golden-yellow/20">
            Secure Member Portal
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
            Welcome to the <br />
            <span className="text-golden-yellow">Brandabi Ecosystem</span>
          </h1>
          
          <p className="text-blue-100 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Welcome! Click below to access your Brandabi dashboard and explore your services.
          </p>
          
          {/* Primary Dashboard CTA */}
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-golden-yellow rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <button
              onClick={() => handleRedirect(dashboardLink)}
              className="relative px-12 py-6 bg-golden-yellow text-royal-blue font-black text-2xl rounded-2xl shadow-2xl hover:bg-[#E5A700] transform transition-all duration-300 hover:-translate-y-1 active:scale-95 uppercase tracking-tighter flex items-center space-x-4 border-2 border-golden-yellow"
            >
              <span>Access Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-6 text-[10px] font-black text-blue-300 uppercase tracking-widest">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 shadow-[0_0_8px_#4ade80]"></div>
              Session Active
            </div>
            <div className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1.5 text-golden-yellow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Connection
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <div className="bg-slate-50 border-b border-blue-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center space-x-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <svg className="w-6 h-6 text-royal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest">Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <svg className="w-6 h-6 text-royal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest">Rapid Fulfillment</span>
          </div>
          <div className="flex items-center space-x-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <svg className="w-6 h-6 text-royal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest">100% Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-royal-blue uppercase tracking-tighter">Direct Service Portals</h2>
            <p className="text-royal-blue/60 font-bold uppercase text-xs tracking-widest mt-1">Bypass the dashboard for instant action</p>
          </div>
          <button 
            onClick={() => handleRedirect(dashboardLink)}
            className="text-xs font-black royal-blue hover:text-golden-yellow transition-colors uppercase tracking-[0.2em] flex items-center"
          >
            Manage All Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {QUICK_SERVICES.map((service, index) => (
            <div 
              key={index}
              onClick={() => handleRedirect(service.url)}
              className="group cursor-pointer bg-white rounded-3xl p-8 border border-blue-100 shadow-sm hover:shadow-2xl hover:border-golden-yellow transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-royal-blue rounded-xl flex items-center justify-center text-golden-yellow mb-6 shadow-md transition-transform group-hover:rotate-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-royal-blue uppercase tracking-tight mb-3 group-hover:text-golden-yellow transition-colors">
                {service.name}
              </h3>
              <p className="text-royal-blue/50 font-medium text-xs leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-[10px] font-black text-royal-blue uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Proceed to Secure Link
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <div className="mt-auto bg-slate-50 border-t border-blue-50 py-10 px-6 text-center">
        <p className="text-[10px] text-royal-blue/30 font-black uppercase tracking-[0.3em]">
          Brandabi Global Operations &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Storefront;
