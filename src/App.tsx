/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Sparkles, Play, Volume2, Star, PartyPopper, Cake } from 'lucide-react';
import HappyBirthdayImage from './HappyBirthdayUncle.png';
import birthdayAudio from './happy_birthday.wav';

// --- Components ---

const Confetti = () => {
  const pieces = Array.from({ length: 50 });
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            top: '120%', 
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            left: `${(Math.random() * 100) + (Math.random() * 20 - 10)}%`
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ 
            backgroundColor: ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#DDA0DD'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
};

const Balloon = ({ color, delay, left }: { color: string, delay: number, left: string }) => (
  <motion.div
    initial={{ y: '110vh', rotate: 0 }}
    animate={{ 
      y: '-20vh',
      rotate: [0, 5, -5, 0],
      x: [0, 10, -10, 0]
    }}
    transition={{ 
      y: { duration: 15, repeat: Infinity, delay, ease: "linear" },
      rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }}
    style={{ left }}
    className="fixed pointer-events-none z-10"
  >
    <div className={`w-12 h-16 rounded-full opacity-60 shadow-lg relative`} style={{ backgroundColor: color }}>
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1 h-3 bg-white/30 rounded-full" />
      <div className="absolute top-2 left-3 w-3 h-6 bg-white/20 rounded-full rotate-12" />
    </div>
    <div className="w-px h-24 bg-white/40 mx-auto" />
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startCelebration = () => {
    setIsPlaying(true);
    setStep(1);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const handlePageClick = () => {
    if (isPlaying && step >= 1 && step < 3) {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div 
      className="min-h-screen bg-birthday relative overflow-hidden flex items-center justify-center p-4 cursor-pointer"
      onClick={handlePageClick}
    >
      <audio ref={audioRef} src={birthdayAudio} loop />
      {/* Background Decor */}
      <AnimatePresence>
        {isPlaying && (
          <>
            <Confetti />
            <Balloon color="#FF69B4" delay={0} left="10%" />
            <Balloon color="#87CEEB" delay={2} left="85%" />
            <Balloon color="#FFD700" delay={5} left="25%" />
            <Balloon color="#DDA0DD" delay={1} left="70%" />
          </>
        )}
      </AnimatePresence>

      <main className="max-w-4xl w-full z-20">
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div
              key="intro"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="text-center space-y-8"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white p-6 rounded-full shadow-2xl relative z-10 border-4 border-festive-pink/20"
                >
                  <Gift className="w-20 h-20 text-festive-pink" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-20px] border-2 border-dashed border-festive-gold/40 rounded-full"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-slate-800 tracking-tighter font-sans">
                  Món Quà <span className="text-festive-pink italic">Bất Ngờ</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto font-light">
                  Dành tặng bác Đông nhân ngày sinh nhật đặc biệt này.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startCelebration}
                className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-festive-pink to-festive-gold opacity-0 group-hover:opacity-10 transition-opacity" />
                <Play className="fill-white" />
                Mở Quà Ngay
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Image Frame */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group w-full max-w-sm md:max-w-md aspect-square"
              >
                <div className="absolute inset-0 bg-white shadow-2xl rotate-3 transform transition-transform group-hover:rotate-1 p-3 flex flex-col">
                  <div className="flex-1 bg-slate-100 overflow-hidden relative border border-slate-200">
                    {/* 
                        Note to user: You can replace this src with your specific image URL.
                        The image provided shows a penguin, a cake, and a dragon. 
                    */}
                    <img 
                      src={HappyBirthdayImage} 
                      alt="Chúc mừng sinh nhật bác"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://picsum.photos/seed/birthday/800/800";
                      }}
                    />
                    
                    <motion.div 
                      key={step}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      {step === 1 && <PartyPopper className="w-12 h-12 text-festive-gold drop-shadow-md animate-bounce" />}
                      {step === 2 && <Star className="w-12 h-12 text-festive-pink drop-shadow-md animate-pulse fill-white" />}
                      {step === 3 && <Cake className="w-12 h-12 text-slate-800 drop-shadow-md animate-bounce" />}
                    </motion.div>
                  </div>
                  <div className="pt-6 pb-2 text-center">
                    <p className="font-serif italic text-slate-600 text-lg">06.05.2026</p>
                  </div>
                </div>
                
                {/* Decorative Elements around frame */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-12 -left-12 hidden md:block"
                >
                  <div className="p-4 bg-festive-pink text-white rounded-2xl shadow-lg -rotate-12">
                    <Heart className="fill-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Dynamic Text Sequence */}
              <div className="text-center h-48 flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-4xl md:text-6xl font-bold text-slate-800 font-sans tracking-tight">
                        🎉 Chúc Mừng Sinh Nhật!
                      </h2>
                      <p className="text-xl text-slate-500 font-light italic">
                        Thêm một tuổi mới, nhiều niềm vui mới...
                      </p>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-4xl md:text-6xl font-black text-festive-pink font-sans uppercase">
                        Bác Đông Kính Yêu
                      </h2>
                      <p className="text-xl text-slate-600 font-serif leading-relaxed italic">
                        "Anh em cháu kính chúc bác một sinh nhật thật vui vẻ và hạnh phúc."
                      </p>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Sparkles className="text-festive-gold w-6 h-6" />
                          </motion.div>
                        ))}
                      </div>
                      <h2 className="text-5xl md:text-8xl font-black text-slate-900 font-sans tracking-tighter leading-none flex flex-col items-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-festive-pink to-festive-gold">KHỎE MẠNH</span>
                        <span className="text-slate-800 text-3xl md:text-5xl">&</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-festive-gold to-festive-sky">BÌNH AN</span>
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Controls */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-4"
                >
                  <button 
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-100 text-sm font-medium"
                  >
                    Xem Lại Lần Nữa
                  </button>
                  <button 
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all text-sm font-medium"
                  >
                    Gửi Lời Chúc
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Media Indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50 p-3 glass rounded-full flex items-center gap-2"
        animate={{ opacity: isPlaying ? 1 : 0.5 }}
      >
        <Volume2 className="w-5 h-5 text-slate-600" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest hidden md:block">Bàn Tiệc Sinh Nhật</span>
      </motion.div>

      {/* Decorative Shimmers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden blur-[100px] opacity-20 hover:opacity-30 transition-opacity">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-festive-pink rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-festive-gold rounded-full" />
      </div>
    </div>
  );
}
