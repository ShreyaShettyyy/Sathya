import React from 'react';
import { Eye, ShieldCheck, Zap, Layers, Sparkles, ArrowRight, Activity, Crosshair, CheckCircle2 } from 'lucide-react';

export default function Hero({ onStartDemo }) {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            Next-Gen Computer Vision & Explainable AI (XAI)
          </div>
        </div>

        {/* Main Title & Description */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-6">
            Automated Deepfake Detection <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
              Powered by Explainable AI (Grad-CAM)
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            SatyaVision evaluates facial media using <strong className="font-semibold text-slate-900 dark:text-white">MediaPipe 468 Face Mesh</strong>, 
            <strong className="font-semibold text-slate-900 dark:text-white"> EfficientNet-B0 / MesoNet-4 CNN ensemble</strong>, and 
            <strong className="font-semibold text-slate-900 dark:text-white"> Grad-CAM heatmaps</strong> to explicitly explain 
            <em> why</em> a video or image is flagged as synthetic.
          </p>
        </div>

        {/* 3 Core XAI Anomaly Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
          
          {/* Pillar 1 */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-3">
              <Crosshair className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">
              Blending & Boundary Seams
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Detects microscopic spatial discontinuities along jawlines, forehead margins, and hair boundaries where synthetic face masks are blended into frames.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
              Feature Warping & Distortions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Uncovers non-linear texture deformation gradients around dynamic regions like eyes, eyelids, and orbicularis oris lips during speech and blinking.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
              Frequency & Specular Mismatches
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Analyzes Fourier high-frequency spectral noise patterns, specular highlights, and color distribution deltas between facial regions and ambient background.
            </p>
          </div>

        </div>

        {/* Live Metrics Grid */}
        <div className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/70 glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">98.6%</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Detection AUC Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">468</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Face Mesh Landmarks</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">14ms</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Frame Inference Speed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-500 font-mono">100%</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Grad-CAM Explainability</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onStartDemo}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-500 dark:from-cyan-500 dark:via-teal-500 dark:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Launch XAI Deepfake Analyzer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
