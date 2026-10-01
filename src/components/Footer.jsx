import React from 'react';
import { Eye, Heart, Github, FileText, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070a12] transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                SatyaVision
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated Deepfake Detection with Explainable AI (XAI)
              </p>
          </div>
        </div>
          <p>
            © {new Date().getFullYear()} SatyaVision Research. Built for transparent, interpretable digital forensic auditing.
          </p>

          <div className="flex items-center gap-6">
            <a href="#analyzer" className="hover:text-cyan-500 transition-colors">Analyzer Studio</a>
            <a href="#pipeline" className="hover:text-cyan-500 transition-colors">XAI Pipeline</a>
            <a href="#benchmarks" className="hover:text-cyan-500 transition-colors">Benchmarks</a>
            <a href="#docs" className="hover:text-cyan-500 transition-colors">Documentation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
