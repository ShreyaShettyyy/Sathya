import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, Sliders, Maximize2, Crosshair, Sparkles, AlertTriangle, ShieldCheck, ZoomIn } from 'lucide-react';

export default function GradCamViewer({ media, viewMode, setViewMode, activeFilter, setActiveFilter }) {
  const [opacity, setOpacity] = useState(0.75);
  const [sliderPos, setSliderPos] = useState(50);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const canvasRef = useRef(null);

  // Filter hotspots based on selected anomaly focus filter
  const filteredHotspots = (media.gradCamHotspots || []).filter(h => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'boundary') return h.type === 'boundary';
    if (activeFilter === 'warping') return h.type === 'warping';
    if (activeFilter === 'frequency') return h.type === 'frequency';
    return true;
  });

  // Render HTML5 Canvas Grad-CAM Heatmap Overlay & Dynamic Multi-Face Bounding Boxes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 400;

    ctx.clearRect(0, 0, width, height);

    if (viewMode === 'original') return;

    // Draw Grad-CAM Heatmaps
    if (viewMode === 'gradcam' || viewMode === 'cyber' || viewMode === 'slider') {
      filteredHotspots.forEach((spot) => {
        const cx = spot.x * width;
        const cy = spot.y * height;
        const radius = spot.radius * width;

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        
        if (spot.type === 'boundary') {
          radGrad.addColorStop(0, `rgba(255, 42, 109, ${spot.intensity * opacity})`);
          radGrad.addColorStop(0.5, `rgba(255, 183, 3, ${spot.intensity * opacity * 0.7})`);
          radGrad.addColorStop(1, 'rgba(255, 42, 109, 0)');
        } else if (spot.type === 'warping') {
          radGrad.addColorStop(0, `rgba(0, 240, 255, ${spot.intensity * opacity})`);
          radGrad.addColorStop(0.6, `rgba(157, 78, 221, ${spot.intensity * opacity * 0.6})`);
          radGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        } else {
          radGrad.addColorStop(0, `rgba(255, 183, 3, ${spot.intensity * opacity})`);
          radGrad.addColorStop(0.5, `rgba(255, 42, 109, ${spot.intensity * opacity * 0.6})`);
          radGrad.addColorStop(1, 'rgba(255, 183, 3, 0)');
        }

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw MediaPipe Face Mesh & Dynamic Bounding Boxes over all detected faces
    if (viewMode === 'mesh' || viewMode === 'cyber') {
      const facesToDraw = media.faces || [{
        box: { x: 100, y: 50, w: 200, h: 240 },
        meshPoints: media.faceMeshPoints || []
      }];

      facesToDraw.forEach((face, idx) => {
        const box = face.box;
        const meshPoints = face.meshPoints || [];

        // Draw Mesh Points
        ctx.strokeStyle = viewMode === 'cyber' ? 'rgba(0, 240, 255, 0.4)' : 'rgba(2, 132, 199, 0.6)';
        ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
        ctx.lineWidth = 1;

        meshPoints.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw Mesh Connecting Lines (scaled dynamically to individual face box width)
        ctx.beginPath();
        const maxDist = Math.max(12, box.w * 0.32);
        for (let i = 0; i < meshPoints.length; i++) {
          for (let j = i + 1; j < meshPoints.length; j++) {
            const dist = Math.hypot(meshPoints[i].x - meshPoints[j].x, meshPoints[i].y - meshPoints[j].y);
            if (dist < maxDist) {
              ctx.moveTo(meshPoints[i].x, meshPoints[i].y);
              ctx.lineTo(meshPoints[j].x, meshPoints[j].y);
            }
          }
        }
        ctx.stroke();

        // Draw Face Bounding Box directly over actual face location
        ctx.strokeStyle = media.type === 'fake' ? 'rgba(255, 42, 109, 0.85)' : 'rgba(16, 185, 129, 0.85)';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.w, box.h);

        // Face Label Badge
        ctx.fillStyle = media.type === 'fake' ? '#ff2a6d' : '#10b981';
        ctx.font = '10px JetBrains Mono';
        const labelText = facesToDraw.length > 1 ? `FACE #${idx + 1}: ${media.type === 'fake' ? 'FAKE' : 'REAL'}` : (media.type === 'fake' ? 'MANIPULATED FACE' : 'AUTHENTIC FACE');
        ctx.fillText(labelText, box.x + 4, Math.max(16, box.y - 6));
      });
    }

  }, [media, viewMode, opacity, activeFilter]);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800 relative">
      
      {/* Viewer Header Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'original'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Original Media
          </button>

          <button
            onClick={() => setViewMode('mesh')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'mesh'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Face Mesh (Multi-Face)
          </button>

          <button
            onClick={() => setViewMode('gradcam')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'gradcam'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Grad-CAM Heatmap
          </button>

          <button
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'slider'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Split Comparison
          </button>
        </div>

        {/* Anomaly Focus Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">Focus:</span>
          {[
            { id: 'all', label: 'All Artifacts' },
            { id: 'boundary', label: 'Boundary Seams' },
            { id: 'warping', label: 'Feature Warping' },
            { id: 'frequency', label: 'Frequency Noise' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Main Visual Preview Area */}
      <div className="relative aspect-square max-w-[480px] mx-auto rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
        
        {/* Render Real Uploaded Image / Video or Sample SVG */}
        {media.fileUrl ? (
          media.fileType === 'video' ? (
            <video
              src={media.fileUrl}
              controls
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-contain bg-slate-950"
            />
          ) : (
            <img
              src={media.fileUrl}
              alt={media.title}
              className="absolute inset-0 w-full h-full object-contain bg-slate-950"
            />
          )
        ) : (
          <div 
            className="absolute inset-0 w-full h-full"
            dangerouslySetInnerHTML={{ __html: media.avatarSvg }}
          />
        )}

        {/* Canvas Grad-CAM Heatmap & Face Mesh Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Split Comparison Slider View Overlay */}
        {viewMode === 'slider' && (
          <div 
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="w-[480px] h-[480px] relative">
              {media.fileUrl ? (
                media.fileType === 'video' ? (
                  <video src={media.fileUrl} autoPlay loop muted className="w-full h-full object-contain bg-slate-950" />
                ) : (
                  <img src={media.fileUrl} alt="Original Upload" className="w-full h-full object-contain bg-slate-950" />
                )
              ) : (
                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: media.avatarSvg }} />
              )}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur text-[10px] font-mono text-cyan-400 rounded border border-cyan-500/40">
                ORIGINAL UNMODIFIED
              </div>
            </div>
          </div>
        )}

        {/* Split Slider Range Controls */}
        {viewMode === 'slider' && (
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        )}

        {viewMode === 'slider' && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-20 pointer-events-none shadow-[0_0_12px_#00f0ff]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg">
              <Sliders className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* Hotspot Interactive Markers & Hover Tooltips */}
        {(viewMode === 'gradcam' || viewMode === 'cyber' || viewMode === 'slider') &&
          filteredHotspots.map((spot, idx) => (
            <div
              key={idx}
              className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 group/spot"
              style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }}
              onMouseEnter={() => setHoveredHotspot(spot)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              <div className="relative">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-rose-500 opacity-75"></span>
                <div className="relative w-6 h-6 rounded-full bg-rose-600/80 border-2 border-white text-white flex items-center justify-center text-[10px] font-mono font-bold shadow-md">
                  !
                </div>

                {/* Hover Tooltip Card */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 text-white shadow-xl opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none z-30">
                  <div className="text-xs font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {spot.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {spot.description}
                  </p>
                  <div className="mt-2 pt-1 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Intensity: {(spot.intensity * 100).toFixed(0)}%</span>
                    <span className="text-cyan-400 uppercase">{spot.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* HUD Top Overlay Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-15">
          <div className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Faces Tracked: {media.faces ? media.faces.length : 1}
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur border border-slate-800 text-[11px] font-mono text-slate-300">
            {media.isCustom ? 'DYNAMIC MESH' : `FPS: ${media.fps}`}
          </div>
        </div>

      </div>

      {/* Heatmap Controls Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        
        {/* Heatmap Opacity Slider */}
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-500" />
            Grad-CAM Intensity:
          </span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-32 sm:w-48"
          />
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            {(opacity * 100).toFixed(0)}%
          </span>
        </div>

        {/* Active Hotspots Count */}
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Hotspots: <strong className="text-rose-500 dark:text-rose-400">{filteredHotspots.length}</strong>
        </div>

      </div>

    </div>
  );
}
