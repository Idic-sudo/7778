import React, { useState } from 'react';
import { Bomb, ShieldAlert, Zap, Loader2 } from 'lucide-react';

export const PayloadForge = (props: any) => {
  const { language = 'ar' } = props || {};
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async (type: string) => {
    setLoading(true);
    // Real generation logic
    const res = await fetch('/api/payload/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: 'android', lhost: '127.0.0.1', lport: '4444', name: 'Test' }),
    });
    setResult(await res.json());
    setLoading(false);
  };

  return (
    <div className="p-6 bg-slate-950 text-white space-y-4">
      <h2 className="text-xl font-black">Payload Forge</h2>
      <div className="grid grid-cols-3 gap-4">
        {['meterpreter', 'device_lock', 'sms_stealer'].map(type => (
          <button key={type} onClick={() => generate(type)} className="p-4 bg-slate-900 rounded-xl hover:bg-rose-900/20">
            {loading ? <Loader2 className="animate-spin" /> : <Bomb />}
            <span className="text-sm">{type}</span>
          </button>
        ))}
      </div>
      {result && <pre className="bg-black p-4 text-xs">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};
