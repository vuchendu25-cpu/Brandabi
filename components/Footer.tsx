import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-royal-blue text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <a href="https://brandabi.com" className="flex items-center space-x-3 mb-6 group">
              <img 
                src="https://i.postimg.cc/hGNHQzXK/photo-5983510126688061654-y.jpg" 
                alt="Brandabi Logo" 
                className="h-10 w-auto rounded object-contain transform group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-black tracking-tighter uppercase">Brand<span className="text-golden-yellow">abi</span></span>
            </a>
            <p className="text-blue-100 max-w-sm text-sm leading-relaxed">
              Empowering the next generation of global founders. We provide the infrastructure, technology, and strategy you need to dominate your market.
            </p>
            <div className="flex space-x-4 mt-8">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map(platform => (
                <div key={platform} className="w-10 h-10 rounded-full bg-blue-900 border border-white/10 flex items-center justify-center hover:bg-white hover:border-golden-yellow transition-all cursor-pointer group">
                  <span className="sr-only">{platform}</span>
                  <div className="w-5 h-5 bg-blue-400 group-hover:bg-royal-blue"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-golden-yellow">Solutions</h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li><a href="#" className="hover:text-golden-yellow transition-colors">CAC Registration</a></li>
              <li><a href="#" className="hover:text-golden-yellow transition-colors">Global Setup (US/UK)</a></li>
              <li><a href="#" className="hover:text-golden-yellow transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-golden-yellow transition-colors">AI Video Ads</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-golden-yellow">Resources</h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li><a href="#" className="hover:text-golden-yellow transition-colors">Growth Blog</a></li>
              <li><a href="#" className="hover:text-golden-yellow transition-colors">Partner Program</a></li>
              <li><a href="#" className="hover:text-golden-yellow transition-colors">Compliance Guide</a></li>
              <li><a href="#" className="hover:text-golden-yellow transition-colors">24/7 Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-blue-300 text-xs font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Brandabi International. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;