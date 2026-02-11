import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Bug, Coffee, Code } from 'lucide-react';
import { GameObject, GameObjectType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveCatcherGameProps {
  onWin: () => void;
}

const WIN_SCORE = 250; // Increased for longer gameplay

const LoveCatcherGame: React.FC<LoveCatcherGameProps> = ({ onWin }) => {
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50); // Percent
  const [items, setItems] = useState<GameObject[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);

  // Constants
  const PLAYER_WIDTH_PERCENT = 20; // Slightly wider for pixel art feel
  const SPAWN_RATE_MS = 550;
  const FALL_SPEED_BASE = 0.35; // Slightly slower for pixel feel

  const spawnItem = useCallback(() => {
    const id = Date.now();
    const typeRoll = Math.random();
    let type: GameObjectType = 'HEART';
    
    // 70% Heart, 25% Bug, 5% Coffee (Bonus)
    if (typeRoll > 0.75) type = 'BUG';
    else if (typeRoll > 0.70) type = 'COFFEE';

    // BUG FIX: Prevent overlapping spawn
    // Check if new position conflicts with any existing item currently at the top of the screen
    let xCandidate = Math.random() * 90 + 5;
    let attempts = 0;
    let validPosition = false;

    while (!validPosition && attempts < 5) {
      validPosition = true;
      // We look at the latest added items (simple heuristic)
      const recentItems = items.filter(i => i.y < 15); 
      
      for (const item of recentItems) {
        // If too close (within 15%)
        if (Math.abs(item.x - xCandidate) < 15) {
          validPosition = false;
          xCandidate = Math.random() * 90 + 5; // Reroll
          break;
        }
      }
      attempts++;
    }

    if (!validPosition) return; // Skip spawn if we can't find a spot

    const newItem: GameObject = {
      id,
      x: xCandidate, 
      y: -10,
      type,
      speed: FALL_SPEED_BASE * (Math.random() * 0.4 + 0.8)
    };

    setItems(prev => [...prev, newItem]);
  }, [items]);

  const updateGame = useCallback(() => {
    if (!isPlaying) return;

    setItems(prevItems => {
      const nextItems: GameObject[] = [];
      let scoreDelta = 0;
      let msg: string | null = null;

      prevItems.forEach(item => {
        const nextY = item.y + item.speed;

        // Collision detection
        const playerLeft = playerX - (PLAYER_WIDTH_PERCENT / 2);
        const playerRight = playerX + (PLAYER_WIDTH_PERCENT / 2);
        
        // Pixel-perfect-ish hitbox
        const hitPlayer = nextY > 80 && nextY < 92 && item.x > playerLeft && item.x < playerRight;

        if (hitPlayer) {
          if (item.type === 'HEART') {
            scoreDelta += 10;
          } else if (item.type === 'BUG') {
            scoreDelta -= 15;
            msg = "БАГ!";
          } else if (item.type === 'COFFEE') {
            scoreDelta += 20;
            msg = "БУСТ!";
          }
          // Remove item if hit
        } else if (nextY < 105) {
          // Keep item if not off screen
          nextItems.push({ ...item, y: nextY });
        }
      });

      if (scoreDelta !== 0) {
        setScore(prev => {
          const newScore = Math.max(0, Math.min(prev + scoreDelta, WIN_SCORE));
          if (newScore >= WIN_SCORE) {
            setIsPlaying(false);
            setTimeout(onWin, 800);
          }
          return newScore;
        });
      }

      if (msg) {
        setGameMessage(msg);
        setTimeout(() => setGameMessage(null), 800);
      }

      return nextItems;
    });

    // Spawn logic
    const now = Date.now();
    if (now - lastSpawnTime.current > SPAWN_RATE_MS) {
      spawnItem();
      lastSpawnTime.current = now;
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [isPlaying, playerX, spawnItem, onWin]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateGame]);

  // Input Handlers
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const relativeX = clientX - rect.left;
    const percent = (relativeX / rect.width) * 100;
    setPlayerX(Math.max(PLAYER_WIDTH_PERCENT/2, Math.min(100 - PLAYER_WIDTH_PERCENT/2, percent)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-valentine-50 select-none cursor-none touch-none font-pixel"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* UI Layer */}
      <div className="absolute top-0 left-0 w-full p-4 z-20 flex flex-col items-center pointer-events-none">
        <div className="bg-white border-4 border-black p-4 mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
          <h2 className="text-valentine-600 text-xs md:text-sm mb-2 text-center leading-relaxed">
            ЛОВИ СЕРДЦА, ИЗБЕГАЙ БАГОВ!
          </h2>
          <div className="w-64 h-8 bg-slate-200 border-4 border-slate-800 relative">
            <div 
              className="h-full bg-valentine-500 transition-all duration-200"
              style={{ width: `${(score / WIN_SCORE) * 100}%` }}
            />
          </div>
          <div className="text-center mt-2 text-[10px] text-slate-600">
            ПРОГРЕСС: {Math.floor((score / WIN_SCORE) * 100)}%
          </div>
        </div>
      </div>

      {/* Floating Feedback Message */}
      <AnimatePresence>
        {gameMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-red-500 border-2 border-black text-white px-4 py-2 text-xs z-30 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            {gameMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Items */}
      {items.map(item => (
        <div
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: `${item.x}%`, 
            top: `${item.y}%`,
            width: '40px',
            height: '40px'
          }}
        >
          {item.type === 'HEART' && (
            <div className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
              <Heart className="text-valentine-500 fill-valentine-500" size={32} strokeWidth={2.5} />
            </div>
          )}
          {item.type === 'BUG' && (
            <div className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
              <Bug className="text-slate-800 fill-slate-800" size={32} strokeWidth={2.5} />
            </div>
          )}
          {item.type === 'COFFEE' && (
            <div className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
              <Coffee className="text-amber-700 fill-amber-700" size={32} strokeWidth={2.5} />
            </div>
          )}
        </div>
      ))}

      {/* Player (Laptop/Basket) */}
      <div
        className="absolute bottom-8 transform -translate-x-1/2 transition-transform duration-75 ease-out z-10"
        style={{ left: `${playerX}%`, width: `${PLAYER_WIDTH_PERCENT}%` }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-slate-800 text-green-400 p-2 border-4 border-black w-20 h-14 flex items-center justify-center relative">
             <Code size={24} />
             {/* Screen Glare */}
             <div className="absolute top-1 right-1 w-2 h-2 bg-slate-600"></div>
          </div>
          <div className="bg-slate-400 w-28 h-4 border-4 border-black border-t-0 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]" />
          <span className="text-valentine-600 text-[10px] mt-2 bg-white px-2 py-1 border-2 border-black">ТЫ</span>
        </div>
      </div>
    </div>
  );
};

export default LoveCatcherGame;