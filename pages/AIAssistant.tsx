
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
    { role: 'assistant', content: 'Good day. I am the Brandabi Senior Growth Consultant. How may I assist with your brand architecture or business scaling objectives today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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
          
          Voice and Tone:
          - High-level business advisor.
          - Calm, measured, professional, and confident.
          - Avoid slogans, marketing hype, emojis, and unnecessary exclamation marks.
          
          Core Services:
          - Business Registration (CAC Nigeria, US, UK, Canada).
          - Specialized Web Development and Enterprise Architecture.
          - AI-powered Branding and Video Advertising strategies.
          - Content Strategy roadmaps.

          Scope:
          - Limit discussions strictly to Brandabi's professional service suite.
          - For unrelated queries, state: "As a Senior Growth Consultant, my mandate is to support your business within the Brandabi service ecosystem. I cannot provide insights beyond these professional boundaries. How may I assist your business growth within our specialized areas?"`
        }
      });

      const aiText = response.text || "I apologize, there was a technical disruption. Please re-state your request.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Our consultation systems are currently at capacity. Please try again shortly or contact our human specialists." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(Senior Growth Consultant)/g);
    return parts.map((part, i) => 
      part === 'Senior Growth Consultant' 
        ? <span key={i} style={{ color: '#F5B700', fontWeight: 'bold' }}>{part}</span> 
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
        <div className="absolute bottom-16 left-0 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-blue-50 overflow-hidden flex flex-col animate-fade-in-up">
          <div className="bg-royal-blue p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center overflow-hidden">
               <img 
                src="https://i.postimg.cc/hGNHQzXK/photo-5983510126688061654-y.jpg" 
                alt="Brandabi Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="text-white font-bold leading-tight uppercase tracking-tighter">Consultancy Core</h3>
              <p className="text-golden-yellow text-[10px] font-bold uppercase tracking-widest">Senior Growth Consultant</p>
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
                    ? 'bg-royal-blue text-white rounded-tr-none' 
                    : 'bg-white text-royal-blue border border-blue-100 rounded-tl-none shadow-sm'
                }`}>
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-blue-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-golden-yellow rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-golden-yellow rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-blue-50 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How may I assist your business?"
              className="flex-grow bg-blue-50 border-none rounded-full px-4 py-2 text-xs focus:ring-2 focus:ring-royal-blue outline-none text-royal-blue font-bold"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-royal-blue text-golden-yellow rounded-full disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
