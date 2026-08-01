import React, { useState, useEffect } from 'react';
import { LayoutDashboard, History, BarChart3, Settings } from 'lucide-react';

export const PromptOSDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'history' | 'analytics'>('dashboard');

  return (
    <div className="p-6 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border)] shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Prompt OS Dashboard</h2>
        <div className="flex gap-2">
          <button onClick={() => setActiveView('dashboard')} className={`p-2 rounded-xl ${activeView === 'dashboard' ? 'bg-[var(--accent-glow)]' : 'bg-[var(--bg-base)]'}`}>
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveView('history')} className={`p-2 rounded-xl ${activeView === 'history' ? 'bg-[var(--accent-glow)]' : 'bg-[var(--bg-base)]'}`}>
            <History className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveView('analytics')} className={`p-2 rounded-xl ${activeView === 'analytics' ? 'bg-[var(--accent-glow)]' : 'bg-[var(--bg-base)]'}`}>
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-[var(--border)] rounded-2xl">
        <p className="text-[var(--text-secondary)] font-mono text-sm">
          {activeView === 'dashboard' && "Prompt OS Core Active - System Status Normal"}
          {activeView === 'history' && "Versioning System Active - Tracking Prompt Evolution"}
          {activeView === 'analytics' && "Analytics Engine Active - Monitoring Prompt Efficiency"}
        </p>
      </div>
    </div>
  );
};
