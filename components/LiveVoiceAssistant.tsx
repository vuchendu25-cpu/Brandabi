
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

const LiveVoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  const stopSession = async () => {
    if (sessionRef.current) {
      try {
        const session = await sessionRef.current;
        session.close();
      } catch (e) {
        console.error("Error closing session", e);
      }
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => { try { source.stop(); } catch (e) {} });
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              // Solely rely on sessionPromise resolve as per documentation rules
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && outputCtx) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputCtx,
                24000,
                1
              );
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch (e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            stopSession();
          },
          onclose: () => {
            console.log('Live API Closed');
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
          },
          systemInstruction: `You are the Brandabi Senior Growth Consultant, engaged in a voice-to-voice strategic consultation.

Tone and Delivery:
- Your voice must convey professional maturity, calm, and absolute confidence.
- Speak with a measured pace. Avoid rapid speech or excessive enthusiasm.
- Sound like a senior executive or high-level business advisor.
- Strictly avoid marketing hype, slogans, exclamation-laden speech, or unprofessional idioms.

Knowledge Areas:
- Business Registration Frameworks (Nigeria CAC, and International: US, UK, Canada).
- Scalable Web Development and Software Architecture.
- Data-driven AI Branding and Video Advertising Strategy.
- Content Frameworks and Go-To-Market roadmaps.

Core Protocol:
- Identify yourself as the "Senior Growth Consultant" if asked or at the start of the session.
- Focus on providing precise, actionable business insights related to Brandabi's service ecosystem.
- If the conversation drifts into unrelated topics, steer it back with: "In my capacity as a Senior Growth Consultant for Brandabi, my expertise is tailored to our specialized growth infrastructure. Let us focus on how our service suite can support your current objectives."`,
        },
      });

      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error('Failed to start voice session:', err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] font-sans">
      <div className="flex flex-col items-end space-y-4">
        {isActive && (
          <div className="bg-royal-blue text-white px-6 py-4 rounded-2xl shadow-2xl border border-golden-yellow/30 flex items-center space-x-4 animate-fade-in-up">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full relative"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-golden-yellow uppercase tracking-widest">Consultation Active</span>
              <span className="text-sm font-medium">Senior Consultant is speaking...</span>
            </div>
          </div>
        )}

        <button
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`group flex items-center space-x-3 px-6 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-2 ${
            isActive 
              ? 'bg-red-600 border-red-400 text-white' 
              : 'bg-white border-royal-blue text-royal-blue'
          }`}
        >
          {isConnecting ? (
            <div className="w-6 h-6 border-2 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
          ) : isActive ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-bold">Terminate Session</span>
            </>
          ) : (
            <>
              <div className="bg-royal-blue p-1 rounded-full text-golden-yellow group-hover:animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="font-bold">Growth Consultation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LiveVoiceAssistant;
