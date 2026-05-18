import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, ShieldCheck, TrendingUp, ArrowRight, MessageCircle, Star, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../context/AppContext';
import MatchCard from '../components/MatchCard';
import UnlockModal from '../components/UnlockModal';
import { MOCK_REVIEWS } from '../constants';
import { cn } from '../lib/utils';

export default function Home() {
  const { predictions } = useApp();
  const [isUnlockOpen, setIsUnlockOpen] = React.useState(false);
  const [activeLeague, setActiveLeague] = React.useState('All');
  const [activeType, setActiveType] = React.useState('all');
  
  const filteredPredictions = predictions.filter(p => {
    const matchesLeague = activeLeague === 'All' || p.league === activeLeague;
    const matchesType = activeType === 'all' || (activeType === 'vip' ? p.isVip : !p.isVip);
    return matchesLeague && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Live Ticker */}
      <div className="mt-14 bg-[#1E293B] border-b border-white/5 py-2 px-4 flex items-center gap-4 text-[11px] overflow-hidden whitespace-nowrap shrink-0 z-40">
        <span className="bg-[#E30613] text-white px-2 py-0.5 rounded-full text-[9px] font-black animate-pulse">LIVE</span>
        <div className="flex gap-8 text-slate-400 animate-marquee">
          <span>Real Madrid vs Barcelona <b className="text-white ml-1">2-1</b> (78')</span>
          <span className="opacity-20">|</span>
          <span>Arsenal vs Chelsea <b className="text-white ml-1">0-0</b> (12')</span>
          <span className="opacity-20">|</span>
          <span>AC Milan vs Juventus <b className="text-white ml-1">1-0</b> (HT)</span>
          <span className="opacity-20">|</span>
          <span>Bayern Munich vs Dortmund <b className="text-white ml-1">3-3</b> (89')</span>
        </div>
      </div>

      <div className="flex-1 flex max-w-[1600px] mx-auto w-full">
        {/* Left Sidebar: Leagues (Desktop) */}
        <aside className="w-64 bg-[#1E293B] border-r border-white/5 hidden xl:flex flex-col p-6 shrink-0 h-[calc(100vh-80px)] sticky top-22">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Top Leagues</h3>
          <ul className="space-y-2">
            {[
              { name: 'All', icon: '🌍' },
              { name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
              { name: 'La Liga', icon: '🇪🇸' },
              { name: 'Serie A', icon: '🇮🇹' },
              { name: 'Bundesliga', icon: '🇩🇪' },
              { name: 'Ligue 1', icon: '🇫🇷' },
              { name: 'Eredivisie', icon: '🇳🇱' }
            ].map((league) => (
              <li 
                key={league.name}
                onClick={() => setActiveLeague(league.name)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group",
                  activeLeague === league.name ? "bg-primary/10 text-primary border-l-4 border-primary" : "hover:bg-white/5 text-slate-300"
                )}
              >
                <span className="text-lg">{league.icon}</span>
                <span className="text-xs font-bold leading-none">{league.name}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">AI Insight</h3>
            <div className="bg-gradient-to-br from-dark-bg to-dark-card p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] leading-relaxed italic text-slate-400">
                "Neural Engine predicts a high scoring game for Liverpool tonight. Defensive xG is critically low for the visitors."
              </p>
              <Link to="/analysis" className="mt-3 text-[10px] font-black text-accent-yellow flex items-center gap-1 hover:gap-2 transition-all">
                <span>View Full Analysis</span>
                <ArrowRight size={10} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-y-auto">
          {/* Mobile League Scroller */}
          <div className="xl:hidden mb-6 -mx-4 px-4 overflow-x-auto no-scrollbar scroll-smooth flex items-center space-x-3 pb-2">
            {[
              { name: 'All', icon: '🌍' },
              { name: 'Premier League', icon: '🏴󠁧󠁢󠁥' },
              { name: 'La Liga', icon: '🇪🇸' },
              { name: 'Serie A', icon: '🇮🇹' },
              { name: 'Bundesliga', icon: '🇩🇪' },
              { name: 'Ligue 1', icon: '🇫🇷' }
            ].map((league) => (
              <button
                key={league.name}
                onClick={() => setActiveLeague(league.name)}
                className={cn(
                  "flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full border transition-all text-xs font-bold",
                  activeLeague === league.name 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                )}
              >
                <span>{league.icon}</span>
                <span>{league.name}</span>
              </button>
            ))}
          </div>

          {/* Hero Banner */}
          <div className="relative h-48 sm:h-64 rounded-[2rem] overflow-hidden bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-500/30 flex items-center p-8 sm:p-12 mb-10 group">
            <div className="relative z-10 space-y-3 max-w-md">
              <div className="inline-block bg-accent-yellow text-dark-bg text-[10px] font-black px-2 py-0.5 rounded italic">SURE ODDS</div>
              <h2 className="text-3xl sm:text-4xl font-black italic uppercase leading-none text-white">99% VIP <span className="text-primary group-hover:text-emerald-400 transition-colors">WIN RATE</span></h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xs">Access HT/FT and Fixed Match secrets instantly. Join the elite winners circle.</p>
              <Link to="/pricing" className="inline-block bg-primary hover:bg-emerald-400 text-white font-black py-2.5 px-8 rounded-lg text-xs transition-all shadow-[0_0_20px_rgba(0,166,81,0.4)] hover:scale-105">GET UNLOCK CODE</Link>
            </div>
            <div className="absolute right-[-40px] top-[-40px] opacity-10 blur-sm">
              <Trophy size={300} className="text-white" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
              {activeLeague === 'All' ? 'Top Selected Matches' : `${activeLeague} Matches`}
            </h4>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveType('all')}
                className={cn(
                  "text-[10px] font-black transition-all",
                  activeType === 'all' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-500"
                )}
              >
                ALL TIPS
              </button>
              <button 
                onClick={() => setActiveType('vip')}
                className={cn(
                  "text-[10px] font-black transition-all",
                  activeType === 'vip' ? "text-primary border-b-2 border-primary pb-1" : "text-slate-500 hover:text-white"
                )}
              >
                VIP ONLY
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredPredictions.length > 0 ? (
              filteredPredictions.map((pred) => (
                <MatchCard 
                  key={pred.id} 
                  prediction={pred} 
                  onUnlock={() => setIsUnlockOpen(true)}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-white/40 font-bold">No matches found for this selection.</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: Winning Slips */}
        <aside className="w-72 bg-dark-bg border-l border-white/5 p-6 hidden lg:flex flex-col gap-6 shrink-0 h-[calc(100vh-80px)] sticky top-22">
          <div className="bg-dark-card rounded-2xl p-5 border border-white/5">
            <h3 className="text-[10px] font-black text-accent-yellow uppercase tracking-widest mb-5">Latest Winning Slips</h3>
            <div className="space-y-4">
              {[
                { title: 'Multi-Bet 12.50 Odds', time: 'Won 2 hours ago' },
                { title: 'VIP Fixed HT/FT', time: 'Won Yesterday' },
                { title: 'Sure 3 Odds Home Win', time: 'Won 6 hours ago' }
              ].map((slip, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-primary font-black text-[10px]">WIN</div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{slip.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{slip.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent-red to-red-900 rounded-2xl p-6 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase text-white/50 mb-1">Super Weekend</p>
              <h4 className="text-xl font-black text-white leading-tight mb-4 tracking-tighter">45.00 ODDS ACCUMULATOR</h4>
              <p className="text-[9px] text-white/60 mb-5 max-w-[150px]">Available now in VIP Premium Section. Limited spots!</p>
              <Link to="/pricing" className="block w-full bg-white text-accent-red py-2.5 rounded-lg text-xs font-black uppercase text-center hover:bg-neutral-100 transition-colors">GET FULL SLIP</Link>
            </div>
            <ShieldCheck className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24 rotate-12" />
          </div>

          <div className="mt-auto">
             <div className="p-4 bg-dark-card rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] text-slate-500 font-bold mb-3">Join 15,000+ winners on Telegram</p>
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <div className="bg-[#0088CC] p-2 rounded-lg text-white"><MessageCircle size={14} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0088CC]">@odisurebets</span>
                </div>
                <button className="w-full bg-[#0088CC] hover:bg-[#0077B3] text-white py-2 rounded-lg text-[10px] font-black uppercase transition-colors">Join Group</button>
             </div>
          </div>
        </aside>
      </div>

      <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />
    </div>
  );
}
