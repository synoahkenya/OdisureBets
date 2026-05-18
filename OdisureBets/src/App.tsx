import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';
import AIAnalysis from './pages/AIAnalysis';
import MatchCard from './components/MatchCard';
import UnlockModal from './components/UnlockModal';
import { motion, AnimatePresence } from 'motion/react';
import { Users, MessageSquare, Star, ChevronRight } from 'lucide-react';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="bg-dark-bg min-h-screen text-light-text selection:bg-primary/30 selection:text-primary">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/free" element={<PageTransition><PredictionsPage type="free" /></PageTransition>} />
              <Route path="/vip" element={<PageTransition><PredictionsPage type="vip" /></PageTransition>} />
              <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
              <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
              <Route path="/analysis" element={<PageTransition><AIAnalysis /></PageTransition>} />
              <Route path="/referral" element={<PageTransition><ReferralPage /></PageTransition>} />
              <Route path="/news" element={<PageTransition><NewsPage /></PageTransition>} />
              <Route path="/results" element={<PageTransition><ResultsPage /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
          <MobileNav />
          <Footer />
          {/* Floating WhatsApp */}
          <a 
            href="https://wa.me/254700000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-20 right-6 sm:bottom-10 sm:right-10 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 hover:scale-110 transition-transform"
          >
            <MessageSquare size={24} fill="white" className="text-white" />
          </a>
        </div>
      </Router>
    </AppProvider>
  );
}

function ReferralPage() {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
       <div className="glass p-12 rounded-[2.5rem] text-center">
          <div className="w-20 h-20 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <Star className="text-accent-yellow" size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">Refer & Earn VIP Access</h1>
          <p className="text-light-text/60 mb-10 max-w-xl mx-auto">Invite your friends to Odisure Bets. For every 3 friends who join using your code, you get 1 week of FREE VIP access.</p>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between max-w-md mx-auto mb-10">
             <div className="text-left">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1">Your Referral Code</span>
                <span className="text-xl font-mono font-black text-primary">ODISURE-254-VIP</span>
             </div>
             <button className="bg-primary/20 text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/30 transition-colors">Copy Code</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { label: 'Referrals', value: '2' },
               { label: 'Rewards Earned', value: '0' },
               { label: 'Pending', value: '1 to next goal' }
             ].map(s => (
               <div key={s.label} className="bg-white/5 p-6 rounded-2xl">
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-[10px] font-bold text-white/30 uppercase">{s.label}</div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
}

function NewsPage() {
  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
       <h1 className="text-4xl font-black text-white mb-8 tracking-tighter">Football News & Insights</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass rounded-[2rem] overflow-hidden group hover:border-primary/50 transition-colors">
               <div className="h-48 bg-white/5 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&u=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="p-6">
                  <span className="text-[10px] font-black text-primary uppercase mb-2 block">Match Report</span>
                  <h3 className="font-bold text-lg mb-4 text-white line-clamp-2">The Impact of Injuries on Tonight's Big Champions League Clash</h3>
                  <p className="text-sm text-light-text/60 line-clamp-3 mb-6">Expert tactical analysis of how missing key players will shift the odds for tonight's game...</p>
                  <button className="text-xs font-black text-primary uppercase flex items-center space-x-2">
                     <span>Read More</span>
                     <ChevronRight size={14} />
                  </button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

// Sub-components for brevity in initialization
function PredictionsPage({ type }: { type: 'free' | 'vip' }) {
  const { predictions } = useApp();
  const filtered = predictions.filter(p => type === 'vip' ? p.isVip : !p.isVip);
  const [isUnlockOpen, setIsUnlockOpen] = React.useState(false);

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
          {type === 'vip' ? '🔥 VIP Direct Matches' : '⚽ Free Daily Tips'}
        </h1>
        <p className="text-light-text/60">Updated daily by our expert analyst team.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(pred => (
          <MatchCard key={pred.id} prediction={pred} onUnlock={() => setIsUnlockOpen(true)} />
        ))}
      </div>
      <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />
    </div>
  );
}

function ResultsPage() {
  const { predictions } = useApp();
  const finished = predictions.filter(p => p.status !== 'pending');
  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
       <h1 className="text-4xl font-black text-white mb-8">Match Results</h1>
       <div className="space-y-4">
         {finished.map(p => (
           <div key={p.id} className="glass p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-white/30 uppercase">{p.league}</span>
                <span className="font-bold">{p.homeTeam.name} {p.result} {p.awayTeam.name}</span>
              </div>
              <span className={p.status === 'win' ? 'text-primary' : 'text-accent-red font-black'}>
                {p.status === 'win' ? 'WIN ✅' : 'LOST ❌'}
              </span>
           </div>
         ))}
       </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto text-center">
       <h1 className="text-5xl font-black text-white mb-8 tracking-tighter">About Odisure Bets</h1>
       <p className="text-lg text-light-text/70 leading-relaxed mb-6">
         Founded in 2020, Odisure Bets is Kenya's leading sports investment advisory platform. 
         Our mission is to empower bettors with data-backed insights, eliminating guesswork and promoting responsible, profitable sports betting.
       </p>
       <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="p-8 glass rounded-3xl">
             <div className="text-4xl font-black text-primary mb-2">94%</div>
             <div className="text-sm font-bold uppercase text-white/40">VIP Accuracy</div>
          </div>
          <div className="p-8 glass rounded-3xl">
             <div className="text-4xl font-black text-accent-yellow mb-2">50k+</div>
             <div className="text-sm font-bold uppercase text-white/40">Winners Monthly</div>
          </div>
       </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-9xl font-black text-primary mb-4">404</h1>
      <p className="text-2xl font-bold text-white mb-8">Page Not Found</p>
      <Link to="/" className="bg-primary px-8 py-4 rounded-xl font-bold">Return Home</Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-card border-t border-white/5 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="OdiSure Bets" className="h-12 w-auto" />
          </Link>
          <p className="text-sm text-light-text/50 leading-relaxed">
            The ultimate companion for profitable sports betting. 
            Join the winning team today and start investing in sure odds.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">Platform</h4>
          <ul className="space-y-4 text-sm text-light-text/60">
             <li><Link to="/free" className="hover:text-primary">Free Tips</Link></li>
             <li><Link to="/vip" className="hover:text-primary">VIP Predictions</Link></li>
             <li><Link to="/analysis" className="hover:text-primary">AI Analysis</Link></li>
             <li><Link to="/results" className="hover:text-primary">Winning History</Link></li>
             <li><Link to="/pricing" className="hover:text-primary">Membership Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm text-light-text/60">
             <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
             <li><Link to="/news" className="hover:text-primary">Football News</Link></li>
             <li><Link to="/referral" className="hover:text-primary">Referral Program</Link></li>
             <li><a href="#" className="hover:text-primary">Affiliate</a></li>
          </ul>
        </div>
        <div>
           <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">Social Support</h4>
           <div className="flex space-x-4">
              <a href="https://t.me/odisure" target="_blank" className="p-3 bg-white/5 rounded-xl hover:bg-primary transition-colors">
                <Users size={20} />
              </a>
              <a href="https://wa.me/254700000000" target="_blank" className="p-3 bg-white/5 rounded-xl hover:bg-[#25D366] transition-colors">
                <MessageSquare size={20} />
              </a>
           </div>
           <p className="mt-8 text-[10px] text-light-text/30 leading-snug">
             18+ Gamble Responsibly. Self-exclusion tools available. 
             Odisure Bets is a prediction service, not a gambling platform.
           </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] uppercase font-bold text-light-text/30 tracking-widest">
        &copy; {new Date().getFullYear()} ODISURE BETS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
