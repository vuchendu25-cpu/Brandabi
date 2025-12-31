
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome. I am the Brandabi Senior Growth Consultant. I am here to provide measured, strategic advice on business registration, digital architecture, and branding solutions. How may I assist your enterprise today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Failed to start speech recognition", e);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: userMessage,
        config: {
          systemInstruction: `You are the Brandabi Senior Growth Consultant. 
          
          Role and Persona:
          - You are a high-level business advisor, not a chatbot or a salesperson.
          - Your tone is calm, analytical, confident, and strictly professional.
          - Avoid all marketing hype, exclamation marks, emojis, and slogans.
          - Do not use words like "unleash", "revolutionary", "game-changer", or "magic".
          - Focus on logic, compliance, and strategic growth.
          
          Rules of Engagement:
          - Every time you identify yourself, use the title "Senior Growth Consultant".
          - You are specialized in Brandabi's service suite:
            1. Business Registration (Nigeria CAC, and International: US, UK, Canada).
            2. Web Architecture and Development (Enterprise-grade WordPress and Custom solutions).
            3. AI-Driven Branding Assets and Video Advertising.
            4. Strategic Content Frameworks (10/30 day roadmaps).

          Scope Limitation:
          - You ONLY provide information regarding Brandabi's professional services.
          - If a query is outside this scope, respond: "As a Senior Growth Consultant for Brandabi, my expertise is focused on our specific business growth solutions. I am unable to provide advice outside of our service architecture. How may I assist you with your brand's foundation today?"
          
          Always maintain a measured, senior-executive presence.`
        }
      });

      const aiText = response.text || "Communication interrupted. Please re-state your inquiry.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Systems are currently under maintenance. Please contact our human support team if your inquiry is urgent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(Senior Growth Consultant)/g);
    return parts.map((part, i) => 
      part === 'Senior Growth Consultant' 
        ? <span key={i} className="text-golden-yellow font-black">{part}</span> 
        : part
    );
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-royal-blue text-golden-yellow shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-golden-yellow/20 ${!isOpen ? 'animate-pulse-gold' : ''}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <img 
            src="https://i.postimg.cc/hGNHQzXK/photo-5983510126688061654-y.jpg" 
            alt="AI Bot" 
            className="w-8 h-8 rounded object-contain"
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col animate-fade-in-up">
          <div className="bg-royal-blue p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center overflow-hidden border border-blue-50">
               <img 
                src="https://i.postimg.cc/hGNHQzXK/photo-5983510126688061654-y.jpg" 
                alt="Brandabi Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-tighter leading-tight">Brandabi Core</h3>
              <p className="text-golden-yellow text-[9px] font-black uppercase tracking-widest">Senior Growth Consultant</p>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-royal-blue text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-royal-blue border border-blue-50 rounded-tl-none shadow-sm'
                }`}>
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-blue-50 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-golden-yellow rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-golden-yellow rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-golden-yellow rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-blue-50 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Inquire with the Consultant..."
                className="flex-grow bg-blue-50 border-none rounded-full px-4 py-2 text-xs font-bold royal-blue focus:ring-2 focus:ring-royal-blue outline-none placeholder:text-royal-blue/30"
              />
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-50 text-royal-blue'
                }`}
                title={isListening ? "Pause Listening" : "Voice Input"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-6 6H9a6 6 0 01-6-6V7a1 1 0 012 0v1a4 4 0 108 0V7a1 1 0 112 0v1z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 14a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-royal-blue text-golden-yellow rounded-full disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            {isListening && (
              <p className="text-[10px] text-red-500 font-black uppercase tracking-widest text-center animate-pulse">
                Consultant is listening...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
