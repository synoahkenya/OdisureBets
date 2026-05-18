import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, ShieldCheck, Activity, Target, BarChart2, Send, Loader2, MessageSquare, X } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';
import { cn } from '../lib/utils';

interface AnalysisResult {
  summary: string;
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  expectedGoals: string;
  keyInsights: string[];
}

export default function AIAnalysis() {
  const [matchInput, setMatchInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchInput.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await axios.post('/api/analyze-match', { matchData: matchInput });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const currentMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: currentMsg }]);
    setIsChatLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: currentMsg });
      setChatHistory(prev => [...prev, { role: 'ai', content: response.data.text }]);
    } catch (error) {
      console.error('Chat failed:', error);
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const PROB_DATA = analysisResult ? [
    { name: 'Home Win', value: analysisResult.homeWinProb, color: '#00A651' },
    { name: 'Draw', value: analysisResult.drawProb, color: '#FFC72C' },
    { name: 'Away Win', value: analysisResult.awayWinProb, color: '#E30613' },
  ] : [
    { name: 'Home Win', value: 45, color: '#00A651' },
    { name: 'Draw', value: 30, color: '#FFC72C' },
    { name: 'Away Win', value: 25, color: '#E30613' },
  ];

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Brain size={14} fill="currentColor" />
            <span>AI MATCH PREDICTION ENGINE v2.0</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">Smart Prediction Intelligence</h1>
          <p className="text-light-text/60 max-w-2xl text-lg">Our proprietary AI analyzes 500+ data points per match to find hidden value and high-probability outcomes.</p>
        </div>
      </div>

      {/* Interactive Analyzer */}
      <div className="glass rounded-[2.5rem] p-8 mb-12 border-primary/30">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
          <Target className="text-primary" />
          Real-Time Match Analyzer
        </h2>
        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text" 
            value={matchInput}
            onChange={(e) => setMatchInput(e.target.value)}
            placeholder="e.g. Manchester City vs Arsenal"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            disabled={isAnalyzing}
            className="bg-primary hover:bg-emerald-400 text-white font-black px-10 py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain size={20} />}
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Match'}</span>
          </button>
        </form>

        {(analysisResult || (!analysisResult && !isAnalyzing)) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="font-bold text-xl text-white">{analysisResult ? `Analysis: ${matchInput}` : 'Featured: Liverpool vs Man City'}</h3>
                   <p className="text-xs text-white/30 uppercase font-black">Confidence: {analysisResult ? 'Dynamic' : '92%'} • Algorithm: Neural-X8</p>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">Verified Analysis</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="h-[300px]">
                   <p className="text-xs font-bold text-white/40 uppercase mb-4 text-center">Outcome Probabilities</p>
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                           data={PROB_DATA}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={100}
                           paddingAngle={5}
                           dataKey="value"
                         >
                           {PROB_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                         </Pie>
                         <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }} />
                      </PieChart>
                   </ResponsiveContainer>
                   <div className="flex justify-center gap-6 mt-4">
                      {PROB_DATA.map(d => (
                        <div key={d.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-[10px] font-bold text-white/50 uppercase">{d.name} {d.value}%</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between text-xs font-bold mb-2 text-white/60">
                        <span>Expected Goals (xG)</span>
                        <span className="text-primary">{analysisResult?.expectedGoals || '2.45 - 1.82'}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[65%]" />
                      </div>
                   </div>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <p className="text-sm text-light-text/80 leading-relaxed italic mb-4">
                        {analysisResult?.summary || `"AI suggests a high probability of both teams scoring. Liverpool's home form is 85% higher than City's defensive efficiency in away games this season."`}
                      </p>
                      {analysisResult?.keyInsights && (
                        <ul className="space-y-2">
                          {analysisResult.keyInsights.map((insight, i) => (
                            <li key={i} className="text-xs text-primary flex items-center gap-2">
                              <ShieldCheck size={12} />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      )}
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               {[
                 { icon: Activity, label: 'Real-time Trends', value: 'Market Volume High', desc: 'Predicting volatility' },
                 { icon: BarChart2, label: 'Historical Data', value: 'High Accuracy', desc: 'Based on 5,000+ similar matches' },
                 { icon: ShieldCheck, label: 'Risk Profile', value: analysisResult ? 'Dynamic' : 'Low Risk', desc: 'Algorithmic safety check' }
               ].map((item) => (
                 <div key={item.label} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-4 mb-3">
                       <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <item.icon size={20} />
                       </div>
                       <div>
                          <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">{item.label}</div>
                          <div className="text-lg font-black text-white">{item.value}</div>
                       </div>
                    </div>
                    <p className="text-[10px] text-white/40">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-center p-12 glass rounded-[2.5rem] border-primary/20">
         <h2 className="text-3xl font-black text-white mb-4">Unlock Full Intelligence</h2>
         <p className="text-light-text/60 mb-8 max-w-xl mx-auto">VIP Members get deep analysis for 20+ matches daily including injury reports and weather factors.</p>
         <Link to="/payment?plan=AI-Analysis-Pro&price=100" className="bg-primary px-10 py-5 rounded-2xl font-black inline-block hover:scale-105 transition-transform">Upgrade to Pro (KES 100)</Link>
      </div>

      {/* AI Chat Bubble */}
      <div className="fixed bottom-32 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-dark-bg border border-white/10 rounded-[2rem] shadow-2xl w-80 sm:w-96 flex flex-col mb-4 overflow-hidden"
            >
              <div className="bg-primary p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider leading-none">Odisure AI</h4>
                    <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Always Online</span>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {chatHistory.length === 0 && (
                  <div className="text-center py-10">
                    <Brain size={40} className="text-primary/20 mx-auto mb-4" />
                    <p className="text-xs text-white/40 font-bold">Ask me anything about football stats, odds, or predictions!</p>
                  </div>
                )}
                {chatHistory.map((chat, i) => (
                  <div key={i} className={cn("flex", chat.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                      chat.role === 'user' ? "bg-primary text-white" : "bg-white/5 text-white/80 border border-white/10"
                    )}>
                      {chat.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 text-white/40 px-4 py-2 rounded-2xl text-sm flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleChat} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 placeholder:text-white/20"
                />
                <button type="submit" disabled={isChatLoading} className="text-primary hover:text-emerald-400 transition-colors">
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110",
            isChatOpen ? "bg-accent-red text-white" : "bg-primary text-white"
          )}
        >
          {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
      </div>
    </div>
  );
}
