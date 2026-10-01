import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalyzerStudio from './components/AnalyzerStudio';
import DatasetShowcase from './components/DatasetShowcase';
import ArchitecturePipeline from './components/ArchitecturePipeline';
import LiveMonitorDashboard from './components/LiveMonitorDashboard';
import ApiPlayground from './components/ApiPlayground';
import ForensicReportModal from './components/ForensicReportModal';
import Footer from './components/Footer';
import { SAMPLE_MEDIA } from './data/samples';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#090d16] text-slate-100 bg-radial-dark' : 'bg-slate-50 text-slate-900 bg-radial-light'
    }`}>
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 space-y-10 pb-16">
        
        {/* Top Hero Section */}
        <Hero onStartDemo={() => {
          setActiveTab('analyzer');
          const studioEl = document.getElementById('studio-section');
          studioEl?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Tab View Router */}
        <div id="studio-section">
          {activeTab === 'analyzer' && (
            <AnalyzerStudio
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
              onOpenReport={() => setIsReportOpen(true)}
            />
          )}

          {activeTab === 'datasets' && (
            <DatasetShowcase />
          )}

          {activeTab === 'pipeline' && (
            <ArchitecturePipeline />
          )}

          {activeTab === 'monitor' && (
            <LiveMonitorDashboard onSelectStream={(stream) => {
              setActiveTab('analyzer');
            }} />
          )}

          {activeTab === 'api' && (
            <ApiPlayground />
          )}
        </div>

      </main>

      {/* Forensic Report Export Modal */}
      <ForensicReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        media={selectedMedia}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
