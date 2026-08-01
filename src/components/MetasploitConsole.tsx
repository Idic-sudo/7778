import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, Loader2, Play, StopCircle, Clipboard, Send, CheckCircle, XCircle } from 'lucide-react';

interface Listener {
  lport: string;
  pid: number;
  status: string;
  createdAt: string;
}

export const MetasploitConsole = () => {
  const [activeTab, setActiveTab] = useState('payload' as 'payload' | 'listener' | 'command');
  const [log, setLog] = useState('');
  const [lport, setLport] = useState('4444');
  const [lhost, setLhost] = useState('0.0.0.0');
  const [status, setStatus] = useState('stopped');
  const [listeners, setListeners] = useState([] as Listener[]);
  const logEndRef = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    const fetchListeners = async () => {
      const res = await fetch('/api/msf/listeners');
      if (res.ok) {
        const data = await res.json();
        setListeners(data);
      }
    };
    fetchListeners();
    const interval = setInterval(fetchListeners, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'listener' && status === 'running') {
      const interval = setInterval(async () => {
        const res = await fetch(`/api/msf/log/${lport}`);
        const data = await res.json();
        setLog(data.log);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab, status, lport]);

  useEffect(() => {
    if (logEndRef.current) {
        logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [log]);

  const startListener = async () => {
    const res = await fetch('/api/msf/listener', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lport, lhost }),
    });
    if (res.ok) setStatus('running');
  };

  const stopListener = async (port: string) => {
    const res = await fetch(`/api/msf/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lport: port }),
    });
    if (res.ok) setStatus('stopped');
  };

  const bulkKill = async () => {
    for (const listener of listeners) {
      await stopListener(listener.lport);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
        {(['payload', 'listener', 'command'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 text-xs font-bold rounded-lg ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-500'}`}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'listener' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex gap-2">
              <input value={lhost} onChange={e => setLhost(e.target.value)} placeholder="LHOST" className="bg-slate-900 p-2 rounded-lg text-sm w-32" />
              <input value={lport} onChange={e => setLport(e.target.value)} placeholder="LPORT" className="bg-slate-900 p-2 rounded-lg text-sm w-24" />
              <button onClick={startListener} className="p-2 bg-emerald-500/20 text-emerald-300 rounded-lg"><Play size={16} /></button>
              <button onClick={() => stopListener(lport)} className="p-2 bg-rose-500/20 text-rose-300 rounded-lg"><StopCircle size={16} /></button>
              <button onClick={bulkKill} className="p-2 bg-rose-900/20 text-rose-400 rounded-lg font-bold text-xs">Bulk Kill</button>
            </div>
            <div className="h-48 overflow-y-auto bg-black p-4 font-mono text-xs text-emerald-500 rounded-lg border border-slate-800">
              {log || 'No logs yet...'}
              <div ref={logEndRef} />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">Active Listeners</h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="pb-2">LPORT</th>
                  <th className="pb-2">PID</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {listeners.map((l, i) => (
                  <tr key={i} className="border-b border-slate-800 last:border-0">
                    <td className="py-2">{l.lport}</td>
                    <td className="py-2">{l.pid}</td>
                    <td className="py-2 flex items-center gap-1">
                      {l.status === 'running' ? <CheckCircle size={12} className="text-emerald-400" /> : <XCircle size={12} className="text-rose-400" />}
                      {l.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
