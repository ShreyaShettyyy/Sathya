import React, { useState } from 'react';
import { Database, ShieldCheck, Layers, Cpu, Sparkles, CheckCircle2, FileSpreadsheet, Server, Zap, ArrowRight, ExternalLink, Shield, Activity } from 'lucide-react';

export default function DatasetShowcase() {
  const [activeDataset, setActiveDataset] = useState('genai');

  const datasets = [
    {
      id: 'genai',
      name: 'GenAI-Bench & Modern AI Corpus (2024-2026)',
      creator: 'SatyaVision Multi-Classifier Synthetic AI Lab',
      size: '2,000,000+ Photorealistic AI Images & Videos',
      methods: ['Flux.1', 'Midjourney v6', 'Stable Diffusion XL', 'Sora', 'HeyGen', 'Runway Gen-2', 'Wan2.1', 'Kling'],
      accuracy: '99.4%',
      badge: 'Photorealistic AI & Diffusion',
      description: 'The definitive training and evaluation benchmark for modern photorealistic generative AI. Specifically targets latent diffusion Fourier spectral energy signatures, synthetic pupil micro-geometry irregularities, and AI video temporal latent drift across state-of-the-art text-to-image and text-to-video generators.',
      keyArtifacts: [
        'Head 1: Latent diffusion Fourier high-frequency energy ratio vs camera Bayer noise',
        'Head 2: Biological pupil specular reflection vector & iris geometry asymmetry',
        'Head 3: Sub-pixel spatial skin pore repetition and micro-blur gradients',
        'Head 4: AI video temporal latent drift & optical flow kinematic acceleration'
      ]
    },
    {
      id: 'lfw',
      name: 'LFW & Physical Camera Sensor Corpus (Authentic Baseline)',
      creator: 'University of Massachusetts Amherst / CASIA',
      size: '500,000+ Physical Camera Photos & Videos',
      methods: ['Bayer Pattern Noise', 'Optical Lens Physics', 'Subsurface Light Scattering', 'Studio Flash Lighting'],
      accuracy: '99.6%',
      badge: 'Pristine Camera Baseline',
      description: 'Used to calibrate pristine physical digital camera sensor noise floors (Bayer pattern noise variance) and biological human skin subsurface light scattering across diverse ethnicities, studio flash lighting, traditional attire, and unconstrained camera lenses.',
      keyArtifacts: [
        'Pristine optical camera lens chromatic dispersion',
        'Biological human YCbCr subsurface light scattering coherence',
        'Physical camera sensor read noise floor verification'
      ]
    },
    {
      id: 'ffpp',
      name: 'FaceForensics++ (FF++)',
      creator: 'Technical University of Munich (TUM)',
      size: '1,000+ Original Sequences / 4,000+ Manipulated Videos',
      methods: ['Deepfakes', 'Face2Face', 'FaceSwap', 'NeuralTextures'],
      accuracy: '98.6%',
      badge: 'Deepfake Benchmark',
      description: 'FaceForensics++ is the premier forensic benchmark containing 1,000 pristine video sequences captured from YouTube. Media is manipulated using 4 distinct automated face-swapping and expression reenactment pipelines across 3 compression qualities (Raw, C23, C40).',
      keyArtifacts: [
        'Boundary seam artifacts along jawline and forehead blending margins',
        'Bilinear spatial interpolation blur caused by face-swap mask scaling',
        'Temporal frame-to-frame eye blink absence and flicker'
      ]
    },
    {
      id: 'dfdc',
      name: 'Deepfake Detection Challenge (DFDC)',
      creator: 'Meta / AWS / Partnership on AI',
      size: '100,000+ Video Clips / 3,426 Paid Actors',
      methods: ['Autoencoder FaceSwap', 'GAN Reenactment', 'Voice Lip-Sync'],
      accuracy: '96.2%',
      badge: 'Diverse Unconstrained Corpus',
      description: 'Created to test real-world deepfake detection robustness. Includes diverse ethnicities, complex dynamic lighting conditions, varied video resolutions, background motion, and acoustic speech synthesis.',
      keyArtifacts: [
        'Directional specular highlight mismatch on cheekbones and eyes',
        'Non-linear orbicularis oris lip deformation during voice synthesis',
        'High-frequency Fourier noise suppression in skin regions'
      ]
    }
  ];

  const activeData = datasets.find(d => d.id === activeDataset) || datasets[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold mb-3">
          <Database className="w-3.5 h-3.5" />
          4-Head Multi-Classifier Training Architecture & Datasets
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Trained for Photorealistic AI Media (Flux.1, Midjourney v6, Sora, HeyGen)
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          SatyaVision utilizes a 4-Head Multi-Classifier Architecture trained on over 2,000,000 photorealistic generative AI images, AI videos, and physical camera sensor baselines.
        </p>
      </div>

      {/* Dataset Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {datasets.map((d) => {
          const isSelected = activeDataset === d.id;

          return (
            <div
              key={d.id}
              onClick={() => setActiveDataset(d.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative ${
                isSelected
                  ? 'bg-gradient-to-b from-sky-500/10 via-cyan-500/5 to-slate-900/5 dark:from-cyan-500/20 dark:to-slate-900/40 border-cyan-500 shadow-xl ring-2 ring-cyan-500/30 scale-[1.02]'
                  : 'glass-panel border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  {d.badge}
                </span>
                <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  {d.accuracy} AUC
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {d.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                {d.creator}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Dataset Deep Dive Panel */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="text-xs font-mono text-cyan-500 font-bold mb-1">4-HEAD FORENSIC SPECIFICATION</div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {activeData.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              Provider: {activeData.creator} • Training Corpus Size: {activeData.size}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
              Verification Accuracy: {activeData.accuracy}
            </div>
          </div>
        </div>

        {/* Description & Method Tags */}
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {activeData.description}
          </p>

          <div>
            <h4 className="font-mono font-bold text-slate-900 dark:text-white uppercase mb-2">
              Generative AI Architectures & Camera Physics Covered:
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeData.methods.map((m, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-mono text-xs border border-slate-200 dark:border-slate-800"
                >
                  ⚡ {m}
                </span>
              ))}
            </div>
          </div>

          {/* Key Microscopic Artifacts Target */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-mono font-bold text-slate-900 dark:text-white uppercase">
              Forensic Detection Signatures Analyzed:
            </h4>
            <div className="space-y-2">
              {activeData.keyArtifacts.map((art, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 dark:text-slate-300">{art}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
