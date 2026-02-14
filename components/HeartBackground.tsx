
import React, { useMemo } from 'react';

const HeartBackground: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 40,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20, // Start mid-animation
      opacity: 0.1 + Math.random() * 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Soft Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[120px]" />
      
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-400 select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            bottom: '-60px',
            opacity: heart.opacity,
            animation: `floatUp ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-130vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HeartBackground;
