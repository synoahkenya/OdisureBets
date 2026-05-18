import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, CheckCircle2, Copy, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function Payment() {
  const query = new URLSearchParams(useLocation().search);
  const planName = query.get('plan') || 'Premium';
  const price = query.get('price') || '500';
  
  const [copied, setCopied] = React.useState(false);
  const [transCode, setTransCode] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate payment verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Instructions */}
          <div className="flex-1">
            <div className="mb-10">
              <Link to="/pricing" className="text-primary font-bold text-sm flex items-center space-x-1 mb-6 hover:opacity-70">
                <ArrowRight size={14} className="rotate-180" />
                <span>Back to Plans</span>
              </Link>
              <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Complete Payment</h1>
              <p className="text-light-text/60">Follow these steps carefully to activate your <span className="text-accent-yellow font-bold uppercase">{planName}</span> plan.</p>
            </div>

            <div className="space-y-8">
              {[
                { 
                  step: 1, 
                  title: 'Open M-Pesa App or Menu', 
                  content: 'Go to Lipa na M-Pesa on your phone.' 
                },
                { 
                  step: 2, 
                  title: 'Select Pochi La Biashara', 
                  content: 'Enter the phone number below carefully.' 
                },
                { 
                  step: 3, 
                  title: 'Enter Amount & PIN', 
                  content: `Pay exactly KES ${price} to receive your code.` 
                }
              ].map((item) => (
                <div key={item.step} className="flex space-x-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-light-text/60">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 glass rounded-2xl border-primary/20 bg-primary/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-primary uppercase tracking-widest">Recipient Details</span>
                <div className="flex items-center space-x-1 text-primary">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-bold">Verified Business</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center group">
                  <div className="text-sm text-light-text/50">Number</div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-black text-white tracking-widest">0746 559 549</span>
                    <button 
                      onClick={() => copyToClipboard('0746559549')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary"
                    >
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-light-text/50">Name</div>
                  <div className="text-lg font-bold text-white">MILKA GACHANJA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Form */}
          <div className="w-full md:w-[400px]">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-card border border-white/10 rounded-[2.5rem] p-8 shadow-2xl sticky top-32"
            >
              {!isSuccess ? (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-white mb-2">Verify Payment</h3>
                    <p className="text-xs text-light-text/50">Enter the M-Pesa transaction code to generate your unlock code.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-light-text/40 uppercase tracking-widest">Transaction Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SAY3TRX59L"
                        value={transCode}
                        onChange={(e) => setTransCode(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-mono uppercase focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-light-text/40 uppercase tracking-widest">Upload Screenshot (Optional)</label>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Smartphone className="mx-auto text-light-text/20 mb-2" size={32} />
                        <p className="text-[10px] text-light-text/40 font-bold uppercase">Drag & drop or Click</p>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 py-5 rounded-2xl font-black text-white shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 transition-transform active:scale-95"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Verify & Get Code</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 flex items-center justify-center space-x-2 text-light-text/30">
                    <HelpCircle size={14} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Need help? WhatsApp 0700 000 000</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-primary" size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Payment Verified!</h3>
                  <p className="text-sm text-light-text/60 mb-10">Your VIP Access Code is generated below. Copy and use it in the VIP section.</p>
                  
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8">
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Your VIP Unlock Code</div>
                    <div className="text-3xl font-black text-white font-mono tracking-widest">VIP-SURE-2024</div>
                  </div>

                  <Link 
                    to="/vip" 
                    className="w-full bg-primary py-4 rounded-xl font-bold text-white inline-block mb-4"
                  >
                    Go to VIP Section
                  </Link>
                  <button 
                    onClick={() => copyToClipboard('VIP-SURE-2024')}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Copy Code Instead
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
