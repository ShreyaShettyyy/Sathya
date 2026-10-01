import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, Cpu, Layers, BookOpen, ExternalLink } from 'lucide-react';

export default function ApiPlayground() {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(false);

  const snippets = {
    python: `import satyavision as sv
from satyavision.xai import GradCAMExplainer

# Initialize SatyaVision XAI Pipeline
detector = sv.DeepfakeDetector(
    model_backbone='efficientnet_b0',
    ensemble_with='mesonet_4',
    device='cuda'
)

# Load media file
media_path = "sample_interview.mp4"
results = detector.analyze_video(media_path, extract_fps=30)

# Generate Grad-CAM heatmaps for manipulation explanation
explainer = GradCAMExplainer(target_layer="features.7")
heatmaps = explainer.generate_heatmaps(results.frames)

print(f"Aggregated Authenticity Score: {results.authenticity_score}%")
print(f"Primary Anomaly Flagged: {results.primary_artifact}")
# Output: Jawline & Hairline Boundary Blending Seams (96.8% Confidence)`,

    opencv: `import cv2
import satyavision as sv

cap = cv2.VideoCapture(0) # Live Webcam Stream
detector = sv.StreamDetector(threshold=0.85)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break

    # Process frame through MediaPipe face mesh & EfficientNet
    result = detector.process_frame(frame)

    if result.is_deepfake:
        # Draw Grad-CAM heatmap overlay
        frame = sv.overlay_gradcam(frame, result.heatmap, opacity=0.7)
        cv2.putText(frame, f"DEEPFAKE DETECTED: {result.confidence}%", 
                    (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    
    cv2.imshow("SatyaVision Live Guard", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break`,

    rest: `curl -X POST "https://api.satyavision.ai/v2/analyze" \\
  -H "Authorization: Bearer sv_live_89f10a2b4c" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@suspect_video.mp4" \\
  -F "explainability=gradcam" \\
  -F "mesh_resolution=468"`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold mb-3">
          <Code className="w-3.5 h-3.5" />
          Developer & Researcher SDK
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Integrate SatyaVision XAI Into Your Stack
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Simple, production-ready Python, OpenCV, and REST APIs for automated deepfake detection and Grad-CAM explainability.
        </p>
      </div>

      {/* Code Snippet Box */}
      <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
        
        {/* Language Tabs & Copy Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-slate-900 px-5 py-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            {[
              { id: 'python', label: 'Python SDK' },
              { id: 'opencv', label: 'OpenCV Stream' },
              { id: 'rest', label: 'REST API (cURL)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Code' : 'Copy Code'}
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-6 bg-slate-950 overflow-x-auto">
          <pre className="text-xs font-mono text-cyan-300 leading-relaxed">
            <code>{snippets[activeTab]}</code>
          </pre>
        </div>

      </div>

    </section>
  );
}
