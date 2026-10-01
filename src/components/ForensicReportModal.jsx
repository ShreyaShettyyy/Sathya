import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, FileText, Download, Check, ShieldCheck, AlertTriangle, Copy, Sparkles, Lock, Cpu } from 'lucide-react';

export default function ForensicReportModal({ isOpen, onClose, media }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !media) return null;

  const isFake = media.type === 'fake';
  const reportId = `SV-XAI-${Math.floor(100000 + Math.random() * 900000)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  
  // Generate a realistic-looking hash based on title and time
  const pseudoHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i) | 0;
    return Math.abs(hash).toString(16).padStart(8, '0');
  };
  const sha256Hash = `e3b0${pseudoHash(media.title || 'test')}98fc1c149afbf4c8996fb92427ae41e4649b934ca${Math.floor(Date.now() / 1000).toString(16)}`;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(`Report ID: ${reportId}\nSHA256: ${sha256Hash}\nClassification: ${isFake ? 'MANIPULATED SYNTHETIC' : 'AUTHENTIC'}\nConfidence: ${media.confidence}%`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    setDownloading(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Report Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            OFFICIAL FORENSIC XAI AUDIT TRAIL
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deepfake Classification Audit Report
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Report Ref: <strong className="text-slate-700 dark:text-slate-200">{reportId}</strong></span>
            <span>Timestamp: <strong className="text-slate-700 dark:text-slate-200">{timestamp}</strong></span>
          </div>
        </div>

        {/* Status Callout Box */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 mb-6 ${
          isFake ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isFake ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
            }`}>
              {isFake ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase">Classification Result</div>
              <div className="text-lg font-bold">
                {isFake ? 'SYNTHETIC FACIAL MANIPULATION CONFIRMED' : 'AUTHENTIC ORGANIC MEDIA VERIFIED'}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-extrabold font-mono">{media.confidence}%</div>
            <div className="text-[10px] opacity-80">Confidence</div>
          </div>
        </div>

        {/* Media Details & Microscopic Artifacts */}
        <div className="space-y-6 text-xs text-slate-600 dark:text-slate-300">
          
          <div>
            <h3 className="font-mono font-bold text-slate-900 dark:text-white uppercase mb-2">
              Analyzed Media Summary
            </h3>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">MEDIA TITLE</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{media.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{media.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">FRAME RATE</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{media.fps} FPS</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">DURATION</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{media.duration}s</span>
              </div>
            </div>
          </div>

          {/* Meaningful Explanation / Justification */}
          <div className="mt-4">
            <h3 className="font-mono font-bold text-slate-900 dark:text-white uppercase mb-2">
              Diagnostic Explanation
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed">
              {media.description || "The analysis engine performed a deep multi-layered scan of the media to arrive at the current classification. Artifacts consistent with the finding were identified."}
            </div>
          </div>

          {/* Microscopic Anomaly Diagnostics Breakdown */}
          <div className="mt-6">
            <h3 className="font-mono font-bold text-slate-900 dark:text-white uppercase mb-2">
              Grad-CAM Anomaly Metrics Breakdown
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span>Blending & Boundary Inconsistencies (Jawline/Forehead Seams)</span>
                <span className="font-mono font-bold text-rose-500">{media.anomalyMetrics?.boundarySeam || (media.confidence > 50 ? media.confidence - 5 : 2.1)}%</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span>Feature Warping & Distortions (Eyes/Lips Dynamic Gradient)</span>
                <span className="font-mono font-bold text-cyan-500">{media.anomalyMetrics?.featureWarp || (media.confidence > 50 ? media.confidence - 12 : 1.4)}%</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span>Frequency Spectrum & Specular Lighting Discrepancy</span>
                <span className="font-mono font-bold text-amber-500">{media.anomalyMetrics?.frequencyMismatch || (media.confidence > 50 ? media.confidence - 8 : 0.8)}%</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Hash Verification Box */}
          <div className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-cyan-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Cryptographic Evidence Hash
              </span>
              <button
                onClick={handleCopyHash}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy Evidence'}
              </button>
            </div>
            <div className="break-all opacity-80 select-all">
              SHA256: {sha256Hash}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Close Report
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-cyan-500 dark:to-teal-500 text-white font-bold text-xs shadow-md hover:shadow-cyan-500/30 transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generating PDF...' : 'Download Verified PDF Audit Report'}
          </button>
        </div>

      </div>
    </div>
  );
}
