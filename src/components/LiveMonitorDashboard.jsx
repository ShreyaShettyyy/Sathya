import React, { useState, useEffect } from 'react';
import { Monitor, ShieldAlert, CheckCircle, Radio, Activity, RefreshCw, AlertTriangle, Eye } from 'lucide-react';

export default function LiveMonitorDashboard({ onSelectStream }) {
  const [streams, setStreams] = useState([
    { id: 'ch-1', name: 'Global News Live Broadcast', source: 'RTMP Stream #104', risk: 'HIGH', score: 96.8, fps: 29.97, status: 'MANIPULATION DETECTED', type: 'fake' },
    { id: 'ch-2', name: 'CEO Keynote Video Feed', source: 'HLS Feed #209', risk: 'LOW', score: 2.4, fps: 30.0, status: 'AUTHENTIC ORGANIC', type: 'real' },
    { id: 'ch-3', name: 'Social Media Viral Reel', source: 'MP4 Stream #881', risk: 'HIGH', score: 94.2, fps: 25.0, status: 'LIP-SYNC WARPING DETECTED', type: 'fake' },
    { id: 'ch-4', name: 'Press Conference Feed B', source: 'SRT Stream #311', risk: 'LOW', score: 4.1, fps: 60.0, status: 'AUTHENTIC ORGANIC', type: 'real' },
  ]);

  // Simulate real-time score jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prev => prev.map(s => ({
        ...s,
        score: s.type === 'fake' 
          ? Math.min(99.4, Math.max(90.0, Number((s.score + (Math.random() - 0.5) * 0.8).toFixed(1))))
          : Math.min(6.0, Math.max(1.2, Number((s.score + (Math.random() - 0.5) * 0.4).toFixed(1))))
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Enterprise Live Broadcast Threat Monitor
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Continuous multi-stream deepfake scanning & automated threat detection engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            4 Active Streams Scanning
          </div>
        </div>
      </div>

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {streams.map((stream) => {
          const isFake = stream.type === 'fake';

          return (
            <div
              key={stream.id}
              className={`glass-panel rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group ${
                isFake
                  ? 'border-rose-500/40 hover:border-rose-500 shadow-rose-500/5'
                  : 'border-emerald-500/30 hover:border-emerald-500'
              }`}
            >
              {/* Stream Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {stream.source}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {stream.name}
                  </h3>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                  isFake 
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30 animate-pulse' 
                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                }`}>
                  {isFake ? 'MANIPULATION ALERT' : 'SECURE STREAM'}
                </span>
              </div>

              {/* Mock Video Canvas Display */}
              <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden mb-4 border border-slate-800 flex items-center justify-center">
                {/* Animated Cyber Radar Grid */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Reticle */}
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center border-2 ${
                    isFake ? 'border-rose-500 text-rose-500 bg-rose-500/10' : 'border-emerald-500 text-emerald-500 bg-emerald-500/10'
                  }`}>
                    <Eye className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-300">
                    {stream.status}
                  </div>
                </div>

                {/* Corner Tech Badges */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur text-[10px] font-mono text-slate-300 border border-slate-800">
                  {stream.fps} FPS
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur text-[10px] font-mono text-cyan-400 border border-slate-800">
                  GPU ACCELERATED
                </div>
              </div>

              {/* Threat Level Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Deepfake Threat Probability:</span>
                  <span className={`font-bold ${isFake ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {stream.score}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isFake ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${stream.score}%` }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
