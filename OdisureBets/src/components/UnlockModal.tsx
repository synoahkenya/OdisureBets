import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Key, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnlockModal({ isOpen, onClose }: UnlockModalProps) {
  const [code, setCode] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { unlockVip } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    setTimeout(() => {
      const success = unlockVip(code);
      if (success) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setCode('');
        }, 1500);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-dark-card border border-white/10 rounded-3xl overflow-hidden p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-light-text/50 hover:text-light-text rounded-full hover:bg-white/5"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-accent-yellow/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="text-accent-yellow" size={32} />
              </div>
              <h2 className="text-2xl font-black text-white">Unlock VIP Access</h2>
              <p className="text-light-text/60 mt-2">Enter your unique unlock code to access premium 99% sure odds and fixed matches.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key size={18} className="text-light-text/40" />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ENTER ACCESS CODE"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-mono tracking-[0.2em] focus:outline-none focus:border-primary transition-colors text-center text-lg placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
                  required
                />
              </div>

              <button
                disabled={status === 'loading' || status === 'success'}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all",
                  status === 'success' ? "bg-primary text-white" : 
                  status === 'error' ? "bg-accent-red text-white" :
                  "bg-accent-yellow hover:bg-accent-yellow/90 text-black"
                )}
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={24} />
                    <span>Unlocked Successfully!</span>
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={24} />
                    <span>Invalid Code</span>
                  </>
                ) : (
                  <span>Activate Code</span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-light-text/50 mb-4">Don't have a code yet?</p>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/pricing" 
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors"
                >
                  View Plans
                </Link>
                <Link 
                  to="/payment" 
                  onClick={onClose}
                  className="p-3 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl text-xs font-bold transition-colors"
                >
                  How to Pay
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
