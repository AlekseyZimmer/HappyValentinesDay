import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalIntroProps {
  onComplete: () => void;
}

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  const script = [
    "npm install love-package --global",
    "Установка зависимостей...",
    "Поиск второй половинки...",
    "Обнаружено 1 сердце...",
    "Анализ совместимости... 100% СОВПАДЕНИЕ",
    "Компиляция чувств...",
    "Сборка успешно завершена!",
    "Протокол 'Валентинка' готов к запуску."
  ];

  useEffect(() => {
    let delay = 0;
    script.forEach((line, index) => {
      delay += Math.random() * 600 + 300;
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === script.length - 1) {
          setIsReady(true);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl bg-slate-800 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] border-4 border-slate-600"
      >
        {/* Terminal Header */}
        <div className="bg-slate-700 px-4 py-3 flex items-center justify-between border-b-4 border-slate-600">
          <span className="text-white text-xs md:text-sm font-pixel">C:\LOVE\SYSTEM.EXE</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-slate-500 border border-slate-900" />
            <div className="w-3 h-3 bg-slate-500 border border-slate-900" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 md:p-6 font-pixel text-[10px] md:text-xs leading-loose h-80 overflow-y-auto custom-scrollbar bg-black text-green-400">
          {lines.map((line, i) => (
            <div key={i} className="mb-3">
              <span className="text-valentine-400 mr-2">{'>'}</span>
              {line}
            </div>
          ))}
          
          {isReady && (
            <div className="mt-6 p-4 border-2 border-dashed border-valentine-400 text-valentine-200">
              <p className="mb-2 text-valentine-400">ВАЖНОЕ СООБЩЕНИЕ:</p>
              <p className="leading-6">
                Для получения доступа к поздравлению необходимо пройти проверку.
                <br /><br />
                ЗАДАЧА: Собери 100% прогресса любви.
                <br />
                <span className="text-green-400">♥</span> Лови сердечки (+10%)
                <br />
                <span className="text-amber-400">☕</span> Пей кофе (+20%)
                <br />
                <span className="text-red-500">⚠</span> Избегай багов (-15%)
              </p>
            </div>
          )}

          {isReady && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="mt-4 inline-block w-3 h-5 bg-green-400"
            />
          )}
        </div>

        {/* Action Area */}
        {isReady && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 bg-slate-700 border-t-4 border-slate-600 flex justify-center"
          >
            <button
              onClick={onComplete}
              className="flex items-center gap-4 px-6 py-4 bg-valentine-500 hover:bg-valentine-600 text-white font-pixel text-xs border-b-4 border-r-4 border-valentine-600 active:border-0 active:translate-y-1 transition-all"
            >
              <Play size={14} fill="currentColor" />
              ЗАПУСТИТЬ
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TerminalIntro;