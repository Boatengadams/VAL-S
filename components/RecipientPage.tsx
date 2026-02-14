import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from '../types';
import { generateRomanticPoem } from '../services/geminiService';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, Loader2, PenTool, ArrowRight } from 'lucide-react';

interface RecipientPageProps {
  isPreview?: boolean;
  previewData?: {
    to: string;
    from: string;
  };
}

const RecipientPage: React.FC<RecipientPageProps> = ({ isPreview, previewData }) => {
  const [state, setState] = useState<AppState>(AppState.PROPOSING);
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [message, setMessage] = useState("Will you be my Valentine? 💖");
  const [poem, setPoem] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const messages = [
    "Are you sure? 🥺", 
    "Think again... 🌹", 
    "I'll be very sad... 💔", 
    "Surely you meant YES! 😍", 
    "Stop running away! 🥰", 
    "It's destiny! ✨", 
    "Just one click away! ❤️"
  ];

  useEffect(() => {
    let urlTo, urlFrom;
    if (isPreview && previewData) {
      urlTo = previewData.to; urlFrom = previewData.from;
    } else {
      const params = new URLSearchParams(window.location.search);
      urlTo = params.get('to'); urlFrom = params.get('from');
    }
    
    setToName(urlTo || 'My Love');
    setFromName(urlFrom || 'Your Admirer');
  }, [isPreview, previewData]);

  const handleNoInteraction = useCallback(() => {
    const padding = 80;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    
    setNoPos({ 
      x: Math.max(20, Math.random() * maxX), 
      y: Math.max(20, Math.random() * maxY) 
    });
    
    setNoCount(prev => prev + 1);
    setYesScale(prev => Math.min(prev + 0.4, 3.5));
    setMessage(messages[noCount % messages.length]);
  }, [noCount]);

  const handleYes = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    confetti({ 
      particleCount: 150, 
      spread: 70, 
      origin: { y: 0.6 }, 
      colors: ['#fb7185', '#f43f5e', '#e11d48'] 
    });

    const generatedPoem = await generateRomanticPoem(toName, fromName);
    setPoem(generatedPoem);
    setState(AppState.SUCCESS);
    setIsGenerating(false);
  };

  const handleCreateOwn = () => {
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <div className="w-full flex justify-center items-center px-4 py-8 min-h-screen">
      {state === AppState.PROPOSING ? (
        <div className="relative z-10 w-full max-w-[92vw] sm:max-w-md bg-white/85 backdrop-blur-3xl p-6 sm:p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(225,29,72,0.15)] border border-white/60 text-center animate-in fade-in zoom-in duration-700">
          <div className="mb-6 relative inline-block">
            <Heart className="text-rose-500 w-14 h-14 sm:w-20 sm:h-20 animate-pulse fill-rose-500 mx-auto" />
            <Sparkles className="absolute -top-2 -right-2 text-amber-400 w-5 h-5 animate-bounce" />
          </div>
          
          <div className="space-y-2 mb-6 sm:mb-8">
            <h2 className="text-xs sm:text-sm font-bold text-rose-400 uppercase tracking-[0.25em]">My dear {toName}</h2>
            <h1 className="text-2xl sm:text-4xl font-romantic text-rose-600 leading-tight">Will you make me the luckiest person?</h1>
          </div>

          <div className="min-h-[4rem] flex items-center justify-center mb-8 px-2">
            <p className="text-base sm:text-xl text-rose-800 font-medium italic">
              "{message}"
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 min-h-[160px] relative">
            <button 
              onClick={handleYes} 
              disabled={isGenerating}
              style={{ transform: `scale(${yesScale})` }} 
              className="z-30 px-8 py-4 sm:px-12 sm:py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-lg sm:text-xl shadow-xl transition-all active:scale-95 disabled:opacity-90 flex items-center gap-3 whitespace-nowrap min-w-[140px] justify-center"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2 text-sm sm:text-base font-sans font-medium">
                  <Loader2 className="animate-spin" size={18} />
                  <span>{fromName} is writing...</span>
                </div>
              ) : (
                "YES! ❤️"
              )}
            </button>

            <button 
              onMouseEnter={handleNoInteraction} 
              onTouchStart={(e) => { e.preventDefault(); handleNoInteraction(); }}
              style={noCount > 0 ? { 
                position: 'fixed', 
                left: `${noPos.x}px`, 
                top: `${noPos.y}px`, 
                transform: `scale(${Math.max(1 - noCount * 0.08, 0.4)})`, 
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                zIndex: 40 
              } : {}} 
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-gray-400 rounded-full font-bold text-base sm:text-lg border-2 border-rose-50 shadow-sm whitespace-nowrap active:scale-90"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-[95vw] sm:max-w-2xl bg-white/90 backdrop-blur-3xl p-5 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl border-2 border-rose-50 text-center animate-in slide-in-from-bottom-10 duration-1000">
          <div className="relative mb-6 sm:mb-8">
            <Heart className="text-rose-600 w-10 h-10 sm:w-16 sm:h-16 fill-rose-600 mx-auto animate-bounce" />
            <Sparkles className="absolute top-0 right-1/3 text-amber-400 w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-6xl font-romantic text-rose-600 mb-6 sm:mb-10 leading-tight">Best. Decision. Ever. 💖</h2>
          
          <div className="relative p-6 sm:p-12 bg-white/50 rounded-[2rem] sm:rounded-[2.5rem] border border-white mb-8 sm:mb-12 shadow-inner group overflow-hidden max-h-[45vh] overflow-y-auto custom-scrollbar">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <p className="relative italic text-rose-900 text-lg sm:text-3xl leading-relaxed whitespace-pre-wrap font-romantic drop-shadow-sm">
              {poem}
            </p>
            <div className="relative mt-6 sm:mt-10 text-rose-500 font-bold text-sm sm:text-lg border-t border-rose-100 pt-6 inline-block">
              — Forever yours, {fromName}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 text-rose-600 font-bold bg-rose-50/80 px-6 sm:px-10 py-3 sm:py-5 rounded-full border border-rose-100 shadow-sm transition-transform cursor-default text-sm sm:text-lg">
              <Send size={18} className="sm:w-5 sm:h-5" /> Forever Starts Now
            </div>

            {!isPreview && (
              <div className="w-full mt-4 pt-8 border-t border-rose-100">
                <p className="text-rose-400 text-xs sm:text-sm font-semibold mb-4 uppercase tracking-widest">Spread the Love</p>
                <button 
                  onClick={handleCreateOwn}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                  <PenTool size={20} />
                  <span className="text-base">Create Your Own Valentine</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="mt-4 text-[10px] sm:text-xs text-rose-300 italic">Surprise your special someone with an interactive wish</p>
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fecdd3;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default RecipientPage;