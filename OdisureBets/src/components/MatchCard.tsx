import React from 'react';
import { motion } from 'motion/react';
import { Clock, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { Prediction } from '../types';
import { cn, formatOdds } from '../lib/utils';
import { useApp } from '../context/AppContext';

interface MatchCardProps {
  prediction: Prediction;
  onUnlock?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ prediction, onUnlock }) => {
  const { isVip } = useApp();
  const isLocked = prediction.isVip && !isVip;
  const isPast = new Date(prediction.startTime) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative bg-[#1E293B] border border-white/5 rounded-xl p-4 flex items-center hover:bg-slate-800 transition-all duration-300 cursor-pointer overflow-hidden mb-3",
        isLocked && "border-accent-yellow/20"
      )}
    >
      {/* Time/Date Section */}
      <div className="w-16 text-center border-r border-white/5 pr-4 shrink-0">
        <div className="text-[10px] font-bold text-slate-500 uppercase">
          {new Date(prediction.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-[9px] opacity-40 font-bold uppercase">
          {isPast ? 'LIVE' : 'Today'}
        </div>
      </div>

      {/* Teams Middle Section */}
      <div className={cn("flex-1 px-5", isLocked && "vip-blur")}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
              {prediction.homeTeam.name} vs {prediction.awayTeam.name}
            </span>
            <span className="text-[10px] font-medium text-slate-400 mt-0.5">
              League: {prediction.league}
            </span>
          </div>
          
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-tighter">
              {prediction.prediction}
            </span>
            <span className="text-xs font-black text-white mt-1.5 italic">
              Odd: {formatOdds(prediction.odds)}
            </span>
          </div>
        </div>
      </div>

      {/* Probability Bar Right Section */}
      <div className={cn("w-32 text-right shrink-0 hidden sm:block", isLocked && "vip-blur opacity-30")}>
        <div className="text-[9px] text-slate-500 mb-1.5 uppercase font-black tracking-widest text-left">Confidence</div>
        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${prediction.confidence}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full", prediction.isVip ? "bg-accent-yellow" : "bg-primary")}
          />
        </div>
        <div className="text-[9px] font-bold text-white mt-1">{prediction.confidence}%</div>
      </div>

      {isLocked && (
        <div 
          onClick={onUnlock}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[3px] group-hover:bg-black/40 transition-all"
        >
          <div className="bg-accent-yellow text-dark-bg px-4 py-1.5 rounded font-black text-[10px] uppercase shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform">
            🔒 Unlock VIP Prediction
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MatchCard;
