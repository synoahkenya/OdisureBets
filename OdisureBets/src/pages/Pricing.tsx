import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Check, Star, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const PLANS = [
  {
    id: 'ai-pro',
    name: 'AI Analysis Pro',
    price: '100',
    duration: '24 Hours',
    features: [
      'Unlimited AI Predictions',
      'Deep Tactical Analysis',
      'xG & Possession Models',
      'AI Chat Assistant Access'
    ],
    recommended: false, 
    color: 'border-primary/30'
  },
  {
    id: 'daily',
    name: 'Daily VIP',
    price: '150',
    duration: '24 Hours',
    features: [
      '5-10 Sure Odds',
      'Daily 2+ Odds Rollover',
      'High Accuracy (95%+)',
      'Instant Unlock Code'
    ],
    recommended: false,
    color: 'border-white/10'
  },
  {
    id: 'weekly',
    name: 'Weekly Premium',
    price: '500',
    duration: '7 Days',
    features: [
      'Access All VIP Tips',
      'Exclusive 50+ Accumulator',
      'Priority WhatsApp Support',
      'Weekly Profit Record',
      'Weekend Specials'
    ],
    recommended: true,
    color: 'border-primary shadow-xl shadow-primary/20'
  }
];

const EXTENDED_PLANS = [
    {
      id: 'monthly',
      name: 'Monthly Professional',
      price: '1,300',
      duration: '30 Days',
      features: [
        'Everything in Weekly',
        'Personal Bankroll Management',
        'Direct Tip Notifications',
        'VIP Telegram Access',
        '50% Discount on Renewals'
      ],
      recommended: false,
      color: 'border-white/10'
    },
    {
      id: 'yearly',
      name: 'Yearly Legend',
      price: '5,000',
      duration: '365 Days',
      features: [
        'Ultimate All-Access Pass',
        'One-on-One Betting Strategy',
        'VIP Fixed Match Alerts',
        'Lifetime Support Access',
        'Best Value for Money'
      ],
      recommended: false,
      color: 'border-accent-yellow/50'
    }
];

export default function Pricing() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Star size={14} fill="currentColor" />
            <span>Investment Plans</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">Choose Your Winning Plan</h1>
          <p className="text-light-text/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Stop losing your hard-earned money to brokers. Invest in expert data and verified analysis with our premium VIP packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...PLANS, ...EXTENDED_PLANS].map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col glass rounded-[2.5rem] p-8 transition-transform hover:scale-[1.02]",
                plan.color,
                plan.recommended && "bg-white/10 border-2"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white/70 mb-2">{plan.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-light-text/50">KES</span>
                  <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-light-text/50 font-medium ml-2">/ {plan.duration}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="text-primary" size={12} strokeWidth={4} />
                    </div>
                    <span className="text-light-text/80 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to={`/payment?plan=${plan.id}&price=${plan.price}`}
                className={cn(
                  "w-full py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center space-x-2 group",
                  plan.recommended ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-white text-black hover:bg-white/90"
                )}
              >
                <span>Select Plan</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Security Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex items-start space-x-5">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-1">Safe Payments</h4>
              <p className="text-sm text-light-text/60">Secure M-Pesa Pochi La Biashara system.</p>
            </div>
          </div>
          <div className="flex items-start space-x-5">
            <div className="p-4 bg-accent-yellow/10 rounded-2xl text-accent-yellow">
              <Zap size={28} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-1">Fast Delivery</h4>
              <p className="text-sm text-light-text/60">Unlock codes sent within 5 minutes of verification.</p>
            </div>
          </div>
          <div className="flex items-start space-x-5">
            <div className="p-4 bg-accent-red/10 rounded-2xl text-accent-red">
              <Trophy size={28} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-1">Loss Recovery</h4>
              <p className="text-sm text-light-text/60">Get free days if we don't hit our profitability targets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
