import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const ValentineCard: React.FC = () => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-valentine-50 flex items-center justify-center p-4 font-pixel">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white max-w-md w-full border-4 border-black shadow-[12px_12px_0_0_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {/* Card Header (Photo Placeholder) */}
        <div className="h-56 bg-valentine-200 relative border-b-4 border-black group">
            {/* 
                PROGRAMMER NOTE: 
                Замени ссылку ниже на ваше совместное фото!
                Например: src="/images/us.jpg"
            */}
          <img 
            src="https://picsum.photos/600/400?grayscale" 
            alt="Us" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 grayscale contrast-125" 
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h1 className="text-white text-lg md:text-xl drop-shadow-[2px_2px_0_black] leading-snug">
              ЦЕЛЬ ЗАХВАЧЕНА
            </h1>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 relative bg-white">
            <div className="absolute -top-8 right-6 bg-white p-3 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                <Heart className="text-valentine-500 fill-valentine-500 animate-bounce" size={32} />
            </div>

            <div className="flex items-center gap-2 mb-6">
                <span className="bg-green-200 text-green-900 border-2 border-green-800 px-2 py-1 text-[10px] flex items-center gap-2">
                    <CheckCircle size={10} /> ЗАДЕПЛОЕНО
                </span>
                <span className="text-slate-500 text-[10px]">Версия: 14.02.2024</span>
            </div>

            <h2 className="text-sm md:text-base text-slate-900 mb-6 leading-relaxed">
              С Днем Святого Валентина!
            </h2>

            <div className="text-[10px] md:text-xs text-slate-700 leading-loose space-y-4">
                <p>
                    Я пытался написать цикл <code className="bg-slate-200 px-1 border border-slate-400 text-red-600">for</code>, чтобы перечислить все причины, по которым я тебя люблю, но получил <code className="bg-slate-200 px-1 border border-slate-400 text-red-600">StackOverflowError</code>, потому что моя любовь бесконечна.
                </p>
                <p>
                    Ты — <span className="text-valentine-600 bg-valentine-100 px-1">CSS</span> для моего <span className="text-slate-800 bg-slate-200 px-1">HTML</span>. Без тебя моя жизнь — это просто скучная разметка без стилей и красок.
                </p>
                
                <div className="bg-slate-900 p-4 border-4 border-slate-700 text-green-400 my-4 font-mono text-[10px] shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                    <p><span className="text-purple-400">const</span> <span className="text-blue-300">мойМир</span> = <span className="text-yellow-300">{"{"}</span></p>
                    <p className="pl-4">счастье: <span className="text-blue-300">true</span>,</p>
                    <p className="pl-4">причина: <span className="text-orange-300">"ТЫ"</span></p>
                    <p><span className="text-yellow-300">{"}"}</span>;</p>
                </div>
                
                <p>
                    Ты исправляешь мои плохие дни и рефакторишь мой хаос в счастье. Люблю тебя больше, чем бесплатный WiFi и код без ворнингов!
                </p>
            </div>

            <div className="mt-8 pt-6 border-t-4 border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 border-2 border-slate-400 flex items-center justify-center">
                        <Code size={18} className="text-slate-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-800">Твой Программист</span>
                        <span className="text-[8px] text-slate-500">git commit -m "навсегда"</span>
                    </div>
                </div>
                <Heart size={24} className="text-valentine-300 fill-valentine-100" />
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ValentineCard;