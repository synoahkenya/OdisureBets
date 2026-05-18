import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Star, CreditCard, LayoutDashboard, Menu, X, MessageCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { isVip } = useApp();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Free Tips', path: '/free', icon: Star },
    { name: 'AI Analysis', path: '/analysis', icon: Zap },
    { name: 'VIP Tips', path: '/vip', icon: Trophy, premium: true },
    { name: 'Pricing', path: '/pricing', icon: CreditCard },
    { name: 'Results', path: '/results', icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#00A651] border-b border-[#008c44] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="OdiSure Bets" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-wide transition-all hover:text-white",
                  location.pathname === item.path ? "text-white border-b-2 border-accent-yellow pb-1" : "text-white/70"
                )}
              >
                <span>{item.name}</span>
                {item.premium && !isVip && (
                  <span className="text-accent-yellow ml-1 tracking-tighter text-[8px] align-top">VIP</span>
                )}
              </Link>
            ))}
            <div className="flex items-center space-x-2 ml-4">
              <Link to="/pricing" className="bg-accent-yellow text-dark-bg px-4 py-1.5 rounded-sm font-bold text-[10px] hover:brightness-110 transition-all uppercase">Join Now</Link>
              <Link to="/admin" className="bg-white/10 text-white px-4 py-1.5 rounded-sm font-bold text-[10px] uppercase">Login</Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-light-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-dark-card border-b border-white/5 p-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  location.pathname === item.path ? "bg-primary/20 text-primary" : "text-light-text/70 hover:bg-white/5"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg text-light-text/50"
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Admin Dashboard</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
