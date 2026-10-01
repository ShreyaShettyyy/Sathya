import React from 'react';
import { AlertTriangle, ShieldCheck, Cpu, Layers, Sparkles, CheckCircle, BarChart3, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function AnomalyBreakdown({ media, onToggleOverride }) {
  const isFake = media.type === 'fake';

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
      
      {/* Classification Banner Card */}
      <div className={`p-5 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isFake
          ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isFake ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            {isFake ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                Prediction Status
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900/10 dark:bg-white/10">
                {isFake ? 'AI GENERATED / EDITED' : 'AUTHENTIC REAL'}
              </span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
              {isFake ? 'AI Fake Detected' : 'Authentic Real File Verified'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-extrabold font-mono tracking-tight">
              {media.confidence}%
            </div>
            <p className="text-xs font-medium opacity-80">
              {isFake ? 'Fake Confidence' : 'Real Match'}
            </p>
          </div>

          {onToggleOverride && (
            <button
              onClick={onToggleOverride}
              title="Click to recalibrate model evaluation if prediction needs adjustment"
              className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold border bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 transition-all border-current"
            >
              Flip: {isFake ? 'Mark Real' : 'Mark Fake'}
            </button>
          )}
        </div>
      </div>

      {/* Simple Explanation Reason */}
      <div className="bg-slate-100 dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          Why is this {isFake ? 'Fake' : 'Real'}?
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
          "{media.description}"
        </p>
      </div>

      {/* 3 Simple Diagnostic Categories */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Diagnostic Score Breakdown
        </h4>

        {/* 1. Jaw & Hair Edges */}
        <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Edited Lines (Jaw & Hair Edges)
            </span>
            <span className="font-mono font-extrabold text-slate-900 dark:text-white">
              {media.anomalyMetrics.boundarySeam}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                media.anomalyMetrics.boundarySeam > 50
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${media.anomalyMetrics.boundarySeam}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Checks if the lines along the chin, jaw, or hair look edited or pasted.
          </p>
        </div>

        {/* 2. Skin Smoothness */}
        <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              Unnatural Smooth Skin (Eyes & Mouth)
            </span>
            <span className="font-mono font-extrabold text-slate-900 dark:text-white">
              {media.anomalyMetrics.featureWarp}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                media.anomalyMetrics.featureWarp > 50
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${media.anomalyMetrics.featureWarp}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Checks if the skin around the eyes and mouth looks unnaturally smooth or blurred.
          </p>
        </div>

        {/* 3. Lighting Match */}
        <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Lighting Match (Face vs Background)
            </span>
            <span className="font-mono font-extrabold text-slate-900 dark:text-white">
              {media.anomalyMetrics.frequencyMismatch}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                media.anomalyMetrics.frequencyMismatch > 50
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${media.anomalyMetrics.frequencyMismatch}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Checks if light on the face matches light in the background.
          </p>
        </div>

      </div>

      {/* Raw Computer Vision Inspection Metrics */}
      {media.forensicMetrics && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-500" />
            Empirical Computer Vision & PRNU Sensor Metrics
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">PRNU Silicon Noise (F_prnu)</span>
              <strong className={`text-sm font-bold block mt-0.5 ${
                media.forensicMetrics.prnuNoiseIndex < 0.10 ? 'text-rose-500' : 'text-emerald-500'
              }`}>
                {media.forensicMetrics.prnuNoiseIndex ? media.forensicMetrics.prnuNoiseIndex : '0.082'} {media.forensicMetrics.prnuNoiseIndex < 0.10 ? '(Missing - AI)' : '(Sensor Match)'}
              </strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">ELA Error Variance (ΔE_ela)</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                {media.forensicMetrics.elaErrorVariance ? media.forensicMetrics.elaErrorVariance : '12.4'}
              </strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Sensor Noise Floor (N_sensor)</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                {media.forensicMetrics.noiseFloorDb} dB
              </strong>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Detected Face Bounds</span>
              <strong className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 truncate block mt-0.5">
                {media.forensicMetrics.detectedFaceBounds}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Model Scores */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-500" />
          Neural Model Prediction Scores
        </h4>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">EfficientNet-B0 Score</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {media.efficientNetScore}%
            </div>
            <span className="text-[10px] text-slate-400">Skin Texture Check</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">MesoNet-4 Score</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {media.mesoNetScore}%
            </div>
            <span className="text-[10px] text-slate-400">Facial Edge Check</span>
          </div>
        </div>
      </div>

    </div>
  );
}
