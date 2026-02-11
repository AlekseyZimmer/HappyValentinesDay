import React, { useState } from 'react';
import { AppStage } from './types';
import TerminalIntro from './components/TerminalIntro';
import LoveCatcherGame from './components/LoveCatcherGame';
import ValentineCard from './components/ValentineCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);

  return (
    <div className="min-h-screen bg-valentine-50 font-sans text-slate-800">
      <AnimatePresence mode="wait">
        
        {stage === AppStage.INTRO && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-30"
          >
            <TerminalIntro onComplete={() => setStage(AppStage.GAME)} />
          </motion.div>
        )}

        {stage === AppStage.GAME && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-20"
          >
            <LoveCatcherGame onWin={() => setStage(AppStage.REWARD)} />
          </motion.div>
        )}

        {stage === AppStage.REWARD && (
          <motion.div
            key="reward"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10"
          >
            <ValentineCard />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}