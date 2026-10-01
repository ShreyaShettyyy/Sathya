import React from 'react';
import { Eye, Sun, Moon, ShieldAlert, Cpu, Activity, FileText, Monitor, Code, Database } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDark, toggleTheme, onOpenReport }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div 
          onClick={() => setActiveTab('analyzer')} 
          className="flex items-center gap-3 cursor-pointer group py-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-400 dark:from-sky-500 dark:via-cyan-400 dark:to-emerald-300 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Eye className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-800 to-cyan-600 dark:from-white dark:via-cyan-300 dark:to-cyan-500 bg-clip-text text-transparent">
                SatyaVision
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 rounded-full uppercase">
                XAI v2.4
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Explainable AI Deepfake Detection Engine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'analyzer'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Analyzer Studio
          </button>

        </nav>

        {/* Right Tools & Theme Toggle */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenReport}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            Audit Report
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light and Dark Theme"
            className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all duration-300 shadow-sm"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 hidden lg:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-600 hidden lg:inline">Dark Mode</span>
              </>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
