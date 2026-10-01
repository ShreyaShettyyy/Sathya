import React, { useState, useEffect } from 'react';
import { Play, Pause, Film, Clock, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

export default function TimelineScrubber({ media, currentFrame, setCurrentFrame }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const frames = media.frameTimeline || [];

  // Handle Play/Pause simulation loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % frames.length);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames.length, setCurrentFrame]);

  const activeFrameData = frames[currentFrame] || frames[0] || { timestamp: '0.00', score: 95, artifactType: 'N/A' };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
      
      {/* Timeline Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Frame-by-Frame Authenticity Timeline
          </h3>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
            {frames.length} Keyframes Processed
          </span>
        </div>

        {/* Playback Controls & Frame Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause Feed' : 'Scrub Timeline'}
          </button>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Time: <strong className="text-slate-900 dark:text-white">{activeFrameData.timestamp}s</strong>
          </div>
        </div>
      </div>

      {/* Frame Authenticity Risk Curve SVG Chart */}
      <div className="relative h-24 bg-slate-100 dark:bg-slate-950/80 rounded-xl p-3 border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* SVG Curve */}
        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ff2a6d" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#ff2a6d" stop-opacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="15" x2="500" y2="15" stroke="rgba(148, 163, 184, 0.2)" stroke-dasharray="3,3" />
          <line x1="0" y1="45" x2="500" y2="45" stroke="rgba(148, 163, 184, 0.2)" stroke-dasharray="3,3" />

          {/* Construct Path Points */}
          {frames.length > 1 && (() => {
            const points = frames.map((f, i) => {
              const x = (i / (frames.length - 1)) * 500;
              const y = 60 - (Number(f.score) / 100) * 50;
              return `${x},${y}`;
            });
            const pathD = `M 0,60 L ${points[0]} ` + points.map((p, i) => i === 0 ? '' : `L ${p}`).join(' ') + ` L 500,60 Z`;
            const strokeD = `M ${points[0]} ` + points.map((p, i) => i === 0 ? '' : `L ${p}`).join(' ');

            return (
              <>
                <path d={pathD} fill="url(#riskGrad)" />
                <path d={strokeD} fill="none" stroke="#ff2a6d" strokeWidth="2" />
                {frames.map((f, i) => {
                  const x = (i / (frames.length - 1)) * 500;
                  const y = 60 - (Number(f.score) / 100) * 50;
                  const isCurrent = i === currentFrame;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isCurrent ? 5 : 2.5}
                      fill={isCurrent ? '#00f0ff' : '#ff2a6d'}
                      stroke={isCurrent ? '#ffffff' : 'none'}
                      strokeWidth="1.5"
                    />
                  );
                })}
              </>
            );
          })()}
        </svg>

        {/* Current Active Timestamp Vertical Indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-10 pointer-events-none transition-all duration-150 shadow-[0_0_8px_#00f0ff]"
          style={{ left: `${(currentFrame / Math.max(1, frames.length - 1)) * 96 + 2}%` }}
        />

      </div>

      {/* Frame Scrubber Range Input */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max={Math.max(0, frames.length - 1)}
          value={currentFrame}
          onChange={(e) => setCurrentFrame(Number(e.target.value))}
          className="w-full cursor-pointer"
        />

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span>Frame #{(currentFrame * 10).toString().padStart(4, '0')}</span>
          <span className="text-rose-500 font-bold">
            Keyframe Threat: {activeFrameData.score}% ({activeFrameData.artifactType})
          </span>
          <span>End ({media.duration}s)</span>
        </div>
      </div>

    </div>
  );
}
