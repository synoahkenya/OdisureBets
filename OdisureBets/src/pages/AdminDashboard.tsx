import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, TrendingUp, Calendar, Plus, Edit2, Trash2, 
  CheckCircle, XCircle, Key, LayoutDashboard, Database, 
  MessageSquare, Settings, LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Prediction, PredictionType } from '../types';
import { generateId, cn, formatOdds } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const CHART_DATA = [
  { name: 'Mon', wins: 8, lost: 2 },
  { name: 'Tue', wins: 5, lost: 1 },
  { name: 'Wed', wins: 12, lost: 3 },
  { name: 'Thu', wins: 9, lost: 2 },
  { name: 'Fri', wins: 15, lost: 0 },
  { name: 'Sat', wins: 22, lost: 5 },
  { name: 'Sun', wins: 18, lost: 4 },
];

export default function AdminDashboard() {
  const { predictions, setPredictions } = useApp();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'predictions' | 'codes'>('overview');
  const [isAdding, setIsAdding] = React.useState(false);

  // Stats
  const totalPreds = predictions.length;
  const winCount = predictions.filter(p => p.status === 'win').length;
  const winRate = totalPreds ? ((winCount / totalPreds) * 100).toFixed(1) : 0;

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this prediction?')) {
      setPredictions(predictions.filter(p => p.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: 'win' | 'loss' | 'pending') => {
    setPredictions(predictions.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary font-black text-xl">ODISURE</span>
            <span className="text-accent-yellow font-black text-xl">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'predictions', name: 'Manage Tips', icon: Database },
            { id: 'codes', name: 'Access Codes', icon: Key },
            { id: 'messages', name: 'User Queries', icon: MessageSquare },
            { id: 'settings', name: 'App Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
                activeTab === item.id ? "bg-primary text-white font-bold" : "text-white/50 hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-accent-red hover:bg-accent-red/10 transition-colors">
            <LogOut size={18} />
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto pt-20 lg:pt-0">
        <div className="p-8 max-w-7xl mx-auto">
          
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase">
                {activeTab === 'overview' ? 'Dashboard Summary' : activeTab === 'predictions' ? 'Manage Predictions' : 'Access Control'}
              </h1>
              <p className="text-white/40 text-sm mt-1">Welcome back, Head Analyst. System is healthy.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/5 p-2 rounded-xl flex items-center space-x-4 border border-white/5">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-black" />
                  ))}
                </div>
                <div className="pr-2">
                  <span className="text-[10px] font-bold text-white/40 block leading-none uppercase">Staff Online</span>
                  <span className="text-xs font-black text-primary">8 Analysts</span>
                </div>
              </div>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Predictions', value: totalPreds, icon: Database, color: 'bg-blue-500' },
                  { label: 'Avg Win Rate', value: `${winRate}%`, icon: TrendingUp, color: 'bg-primary' },
                  { label: 'New Referrals', value: '142', icon: Users, color: 'bg-accent-yellow' },
                  { label: 'Revenue 7d', value: 'KES 42K', icon: Calendar, color: 'bg-purple-500' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-2 rounded-lg", stat.color)}>
                        <stat.icon size={20} className="text-white" />
                      </div>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                    <div className="text-2xl font-black mb-1">{stat.value}</div>
                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-lg">Weekly Performance Analysis</h3>
                  <select className="bg-white/5 border border-white/10 rounded-lg text-xs p-2 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CHART_DATA}>
                      <defs>
                        <linearGradient id="colorWins" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00A651" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00A651" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }}
                        itemStyle={{ color: '#00A651' }}
                      />
                      <Area type="monotone" dataKey="wins" stroke="#00A651" fillOpacity={1} fill="url(#colorWins)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity Mini-Table */}
              <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-bold">Recent Predictions</h3>
                  <button onClick={() => setActiveTab('predictions')} className="text-xs text-primary font-bold">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-white/30 text-[10px] uppercase tracking-widest border-b border-white/5">
                        <th className="px-6 py-4">Match</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Odds</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {predictions.slice(0, 5).map((pred) => (
                        <tr key={pred.id} className="text-sm hover:bg-white/5">
                          <td className="px-6 py-4 font-bold">{pred.homeTeam.name} vs {pred.awayTeam.name}</td>
                          <td className="px-6 py-4 text-white/50">{pred.type}</td>
                          <td className="px-6 py-4 text-accent-yellow font-black">{formatOdds(pred.odds)}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                              pred.status === 'win' ? "bg-primary/20 text-primary" : 
                              pred.status === 'loss' ? "bg-accent-red/20 text-accent-red" : "bg-white/10 text-white/50"
                            )}>
                              {pred.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'predictions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search teams or leagues..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
                  />
                  <LayoutDashboard className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                </div>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-xl font-black flex items-center space-x-2 transition-transform active:scale-95 shadow-lg shadow-primary/20"
                >
                  <Plus size={18} />
                  <span>Add Prediction</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {predictions.map((pred) => (
                  <div key={pred.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-4">
                        <img src={pred.homeTeam.logo} className="w-10 h-10 rounded-full bg-black/50 p-1 object-contain" />
                        <img src={pred.awayTeam.logo} className="w-10 h-10 rounded-full bg-black/50 p-1 object-contain" />
                      </div>
                      <div>
                        <div className="font-black text-lg">{pred.homeTeam.name} vs {pred.awayTeam.name}</div>
                        <div className="text-xs text-white/30 font-bold uppercase">{pred.league} • {pred.type} • {pred.isVip ? 'VIP' : 'FREE'}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                       <div className="bg-white/5 px-4 py-2 rounded-xl text-center min-w-[80px]">
                         <div className="text-[10px] text-white/30 uppercase font-bold">Odds</div>
                         <div className="font-black text-accent-yellow">{formatOdds(pred.odds)}</div>
                       </div>
                       
                       <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/5">
                          <button 
                            onClick={() => handleStatusChange(pred.id, 'win')}
                            className={cn("p-2 rounded-lg transition-colors", pred.status === 'win' ? "bg-primary text-white" : "text-white/20 hover:text-white")}
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(pred.id, 'loss')}
                            className={cn("p-2 rounded-lg transition-colors", pred.status === 'loss' ? "bg-accent-red text-white" : "text-white/20 hover:text-white")}
                          >
                            <XCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(pred.id, 'pending')}
                            className={cn("p-2 rounded-lg transition-colors", pred.status === 'pending' ? "bg-blue-500 text-white" : "text-white/20 hover:text-white")}
                          >
                            <Calendar size={20} />
                          </button>
                       </div>

                       <div className="flex items-center space-x-2">
                         <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Edit2 size={18} /></button>
                         <button onClick={() => handleDelete(pred.id)} className="p-3 text-accent-red/40 hover:text-accent-red hover:bg-accent-red/5 rounded-xl transition-colors"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
