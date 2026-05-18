import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Star, Trophy, History, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MobileNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Free', path: '/free', icon: Star },
    { name: 'VIP', path: '/vip', icon: Trophy, isVip: true },
    { name: 'History', path: '/results', icon: History },
    { name: 'Account', path: '/admin', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1E293B] border-t border-white/10 flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        if (item.isVip) {
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className="flex flex-col items-center gap-0.5 relative -top-4 scale-110"
            >
              <div className="w-12 h-12 bg-[#FFC72C] text-[#0F172A] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,199,44,0.4)]">
                <Trophy size={24} fill="currentColor" />
              </div>
              <span className="text-[9px] font-black uppercase mt-1 text-[#FFC72C]">VIP</span>
            </Link>
          );
        }

        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-0.5 transition-colors",
              isActive ? "text-primary" : "text-slate-400"
            )}
          >
            <item.icon size={20} fill={isActive ? "currentColor" : "none"} />
            <span className="text-[9px] font-bold uppercase">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
