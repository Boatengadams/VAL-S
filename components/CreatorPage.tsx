
import React, { useState } from 'react';
import { Heart, CheckCircle, Eye, Edit3, Share2, Sparkles } from 'lucide-react';
import RecipientPage from './RecipientPage';

const CreatorPage: React.FC = () => {
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const generateFullLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const q = new URLSearchParams();
    if (toName) q.set('to', toName);
    if (fromName) q.set('from', fromName);
    return `${baseUrl}?${q.toString()}`;
  };

  const copyLink = () => {
    if (!toName) return alert("Please enter a name for your Valentine!");
    navigator.clipboard.writeText(generateFullLink());
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  if (isPreviewMode) {
    return (
      <div className="w-full h-full flex flex-col items-center">
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
          <button 
            onClick={() => setIsPreviewMode(false)} 
            className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-rose-200 text-rose-600 font-bold flex items-center gap-2 hover:bg-rose-50 transition-all active:scale-95"
          >
            <Edit3 size={18} /> Exit Preview
          </button>
        </div>
        <RecipientPage isPreview={true} previewData={{ to: toName || 'Recipient', from: fromName || 'Sender' }} />
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white/80 backdrop-blur-3xl p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_35px_80px_-15px_rgba(225,29,72,0.2)] border border-white/60 text-center animate-in fade-in zoom-in duration-700 mx-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <Heart className="text-rose-500 w-16 h-16 fill-rose-500 mb-2 drop-shadow-sm animate-pulse" />
          <Sparkles className="absolute -top-2 -right-2 text-amber-400 w-6 h-6 animate-bounce" />
        </div>
        <h1 className="text-3xl font-romantic text-rose-600">Valentine Wishes</h1>
        <p className="text-[11px] text-rose-400 font-bold uppercase tracking-widest mt-1">
          From {fromName || 'Your Admirer'}
        </p>
      </div>

      <div className="space-y-5 mb-8">
        <div className="flex flex-col gap-1">
          <label className="text-left text-[10px] font-bold text-rose-400 uppercase tracking-widest ml-4">To My Valentine</label>
          <input 
            type="text" 
            placeholder="Their Name ❤️" 
            value={toName} 
            onChange={(e) => setToName(e.target.value)} 
            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border-2 border-rose-50 focus:border-rose-400 focus:outline-none transition-all text-rose-700 font-semibold text-base" 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-left text-[10px] font-bold text-rose-400 uppercase tracking-widest ml-4">My Name</label>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={fromName} 
            onChange={(e) => setFromName(e.target.value)} 
            className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border-2 border-rose-50 focus:border-rose-400 focus:outline-none transition-all text-rose-700 font-semibold text-base" 
          />
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => setIsPreviewMode(true)} 
          className="w-full py-3.5 bg-white border-2 border-rose-100 text-rose-500 rounded-full font-bold text-sm shadow-sm hover:bg-rose-50 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Eye size={18} /> Preview Experience
        </button>
        <button 
          onClick={copyLink} 
          className={`w-full py-4 rounded-full font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${hasCopied ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200 active:scale-95'}`}
        >
          {hasCopied ? <CheckCircle size={22} /> : <Share2 size={22} />}
          {hasCopied ? 'Link Copied!' : 'Share Link'}
        </button>
      </div>
    </div>
  );
};

export default CreatorPage;
