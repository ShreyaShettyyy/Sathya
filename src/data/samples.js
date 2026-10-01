export const SAMPLE_MEDIA = [
  {
    id: 'sample-1',
    title: 'Jawline & Hairline Boundary Blending Seams',
    type: 'fake',
    category: 'Boundary Seams',
    confidence: 96.8,
    efficientNetScore: 97.4,
    mesoNetScore: 96.2,
    fps: 30,
    duration: 5.0,
    totalFrames: 150,
    primaryArtifact: 'Blending & Boundary Inconsistencies',
    description: 'Microscopic spatial discontinuity detected along the jawline margin and upper forehead. The deep neural network identifies Gaussian blur artifacts and color-space boundary mismatch where the synthetic face mask was blended into the source frame.',
    avatarSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="faceGrad1" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stop-color="#ffd5b3"/>
          <stop offset="70%" stop-color="#e8b18a"/>
          <stop offset="100%" stop-color="#cf946e"/>
        </radialGradient>
        <filter id="glowSeam">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="400" fill="#0f172a"/>
      <!-- Background studio environment -->
      <circle cx="200" cy="180" r="180" fill="#1e293b" opacity="0.6"/>
      <path d="M 80,380 C 90,290 140,260 200,260 C 260,260 310,290 320,380" fill="#334155"/>
      <!-- Neck -->
      <rect x="170" y="210" width="60" height="70" fill="#d8a078" rx="10"/>
      <!-- Face Base -->
      <ellipse cx="200" cy="170" rx="75" ry="95" fill="url(#faceGrad1)"/>
      <!-- Eyes -->
      <ellipse cx="170" cy="155" rx="14" ry="9" fill="#ffffff"/>
      <ellipse cx="230" cy="155" rx="14" ry="9" fill="#ffffff"/>
      <circle cx="170" cy="155" r="5" fill="#1e293b"/>
      <circle cx="230" cy="155" r="5" fill="#1e293b"/>
      <!-- Eyebrows -->
      <path d="M 150 140 Q 170 134 185 142" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 215 142 Q 230 134 250 140" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M 200 155 L 195 185 L 206 186" stroke="#b87f58" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Mouth -->
      <path d="M 180 210 Q 200 225 220 210" stroke="#9f5438" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Hair -->
      <path d="M 120 160 C 115 90 150 60 200 60 C 250 60 285 90 280 160 C 265 100 240 80 200 80 C 160 80 135 100 120 160 Z" fill="#1e1b18"/>
      <!-- Boundary Seam Artifact (Highlight) -->
      <path d="M 130 180 C 135 245 160 265 200 266 C 240 265 265 245 270 180" stroke="#ff2a6d" stroke-width="3" stroke-dasharray="6,4" fill="none" filter="url(#glowSeam)"/>
    </svg>`,
    faceMeshPoints: [
      { x: 200, y: 75 }, { x: 170, y: 85 }, { x: 230, y: 85 },
      { x: 140, y: 120 }, { x: 260, y: 120 }, { x: 130, y: 170 }, { x: 270, y: 170 },
      { x: 140, y: 220 }, { x: 260, y: 220 }, { x: 170, y: 255 }, { x: 230, y: 255 },
      { x: 200, y: 265 }, { x: 170, y: 155 }, { x: 230, y: 155 }, { x: 200, y: 185 }, { x: 200, y: 215 }
    ],
    gradCamHotspots: [
      {
        x: 0.35, y: 0.62, radius: 0.22, intensity: 0.95, type: 'boundary',
        title: 'Jawline Blending Seam',
        description: 'High-frequency gradient shift detected between synthetic chin boundary and native neck pixel grid.'
      },
      {
        x: 0.65, y: 0.62, radius: 0.22, intensity: 0.92, type: 'boundary',
        title: 'Right Jaw Discontinuity',
        description: 'Bilinear interpolation boundary blur artifact resulting from face-swap mask alignment.'
      },
      {
        x: 0.50, y: 0.22, radius: 0.18, intensity: 0.84, type: 'boundary',
        title: 'Forehead Hairline Margins',
        description: 'Color-space chromatic aberration along the upper forehead synthetic face mask.'
      }
    ],
    anomalyMetrics: {
      boundarySeam: 98.4,
      featureWarp: 64.2,
      frequencyMismatch: 88.1
    },
    frameTimeline: Array.from({ length: 15 }, (_, i) => ({
      frame: i * 10,
      timestamp: (i * 0.33).toFixed(2),
      score: Math.min(99, Math.max(88, 94 + Math.sin(i * 0.8) * 5)).toFixed(1),
      artifactType: i % 3 === 0 ? 'Jawline Boundary' : 'Forehead Seam'
    }))
  },
  {
    id: 'sample-2',
    title: 'Lip-Sync Speech & Dynamic Eye Texture Warping',
    type: 'fake',
    category: 'Feature Warping',
    confidence: 93.5,
    efficientNetScore: 94.8,
    mesoNetScore: 92.1,
    fps: 30,
    duration: 4.2,
    totalFrames: 126,
    primaryArtifact: 'Feature Warping & Distortions',
    description: 'Neural voice-driven facial reenactment artifact. Grad-CAM flags non-linear spatial warping surrounding the orbicularis oris (lips) during speech and unnatural iris specular highlights during eye blinking cycles.',
    avatarSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="faceGrad2" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stop-color="#f5d6ba"/>
          <stop offset="70%" stop-color="#d9a584"/>
          <stop offset="100%" stop-color="#bd8460"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#0b1329"/>
      <!-- Background -->
      <path d="M 60,390 C 70,300 130,270 200,270 C 270,270 330,300 340,390" fill="#1e293b"/>
      <rect x="172" y="215" width="56" height="65" fill="#c48e6c" rx="8"/>
      <!-- Face Base -->
      <ellipse cx="200" cy="170" rx="72" ry="92" fill="url(#faceGrad2)"/>
      <!-- Distorted Eyes during speech -->
      <ellipse cx="168" cy="152" rx="15" ry="10" fill="#ffffff" stroke="#ff2a6d" stroke-width="1.5"/>
      <ellipse cx="232" cy="152" rx="15" ry="7" fill="#ffffff" stroke="#ff2a6d" stroke-width="2"/>
      <circle cx="168" cy="152" r="5" fill="#0f172a"/>
      <circle cx="232" cy="152" r="4" fill="#0f172a"/>
      <!-- Warped Eyebrows -->
      <path d="M 148 136 Q 168 130 185 138" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <path d="M 215 138 Q 232 128 252 136" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M 200 152 L 196 182 L 205 183" stroke="#aa724f" stroke-width="3" fill="none"/>
      <!-- Warped Mouth (Warping Grid Overlay) -->
      <ellipse cx="200" cy="216" rx="22" ry="12" fill="#843929" stroke="#00f0ff" stroke-width="2" stroke-dasharray="3,3"/>
      <path d="M 178 216 Q 200 232 222 216" stroke="#ffffff" stroke-width="2"/>
      <!-- Hair -->
      <path d="M 125 155 C 120 85 155 55 200 55 C 245 55 280 85 275 155 Z" fill="#2d1d17"/>
    </svg>`,
    faceMeshPoints: [
      { x: 200, y: 70 }, { x: 168, y: 80 }, { x: 232, y: 80 },
      { x: 135, y: 115 }, { x: 265, y: 115 }, { x: 128, y: 165 }, { x: 272, y: 165 },
      { x: 168, y: 152 }, { x: 232, y: 152 }, { x: 200, y: 182 }, { x: 200, y: 216 }
    ],
    gradCamHotspots: [
      {
        x: 0.50, y: 0.54, radius: 0.25, intensity: 0.98, type: 'warping',
        title: 'Orbicularis Oris Lip Distortion',
        description: 'Unnatural texture deformation vectors around mouth corners generated by wav2lip neural model.'
      },
      {
        x: 0.58, y: 0.38, radius: 0.16, intensity: 0.88, type: 'warping',
        title: 'Asymmetric Eye Blink Anomaly',
        description: 'Unsynchronized temporal eyelid motion and pupil specularity mismatch during speech frame.'
      }
    ],
    anomalyMetrics: {
      boundarySeam: 68.3,
      featureWarp: 96.7,
      frequencyMismatch: 82.5
    },
    frameTimeline: Array.from({ length: 15 }, (_, i) => ({
      frame: i * 9,
      timestamp: (i * 0.30).toFixed(2),
      score: Math.min(98, Math.max(82, 90 + Math.cos(i * 1.1) * 7)).toFixed(1),
      artifactType: i % 2 === 0 ? 'Lip Warping' : 'Eyelid Mismatch'
    }))
  },
  {
    id: 'sample-3',
    title: 'Frequency Spectrum & Specular Lighting Mismatch',
    type: 'fake',
    category: 'Frequency Noise',
    confidence: 94.1,
    efficientNetScore: 95.3,
    mesoNetScore: 93.0,
    fps: 30,
    duration: 6.0,
    totalFrames: 180,
    primaryArtifact: 'Frequency & Lighting Mismatches',
    description: 'Discrepancy in high-frequency Fourier spectral domain. The facial region exhibits synthetic noise suppression compared to the ambient background, accompanied by inconsistent directional specular light highlights on the cheekbones.',
    avatarSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="lightSpot" cx="30%" cy="30%" r="40%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#ffd2a6" stop-opacity="0.2"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#080e1a"/>
      <!-- Background high-frequency noise background -->
      <pattern id="noiseBg" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#1e293b"/>
        <circle cx="12" cy="14" r="1.5" fill="#334155"/>
        <circle cx="18" cy="6" r="1" fill="#0f172a"/>
      </pattern>
      <rect width="400" height="400" fill="url(#noiseBg)"/>
      <!-- Face -->
      <ellipse cx="200" cy="170" rx="74" ry="94" fill="#e5b591"/>
      <!-- Lighting Mismatch Overlay -->
      <ellipse cx="175" cy="155" rx="35" ry="30" fill="url(#lightSpot)"/>
      <ellipse cx="170" cy="155" rx="14" ry="9" fill="#ffffff"/>
      <ellipse cx="230" cy="155" rx="14" ry="9" fill="#ffffff"/>
      <circle cx="170" cy="155" r="5" fill="#0284c7"/>
      <circle cx="230" cy="155" r="5" fill="#0284c7"/>
      <path d="M 180 210 Q 200 220 220 210" stroke="#8c432d" stroke-width="4" fill="none"/>
      <!-- Frequency grid highlight -->
      <rect x="135" y="110" width="130" height="130" fill="none" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="4,4"/>
    </svg>`,
    faceMeshPoints: [
      { x: 200, y: 70 }, { x: 170, y: 80 }, { x: 230, y: 80 },
      { x: 140, y: 115 }, { x: 260, y: 115 }, { x: 130, y: 165 }, { x: 270, y: 165 },
      { x: 170, y: 155 }, { x: 230, y: 155 }, { x: 200, y: 185 }, { x: 200, y: 210 }
    ],
    gradCamHotspots: [
      {
        x: 0.44, y: 0.38, radius: 0.28, intensity: 0.94, type: 'frequency',
        title: 'Specular Lighting Vector Mismatch',
        description: 'Directional light source vector on left cheekbone conflicts with key studio light angle.'
      },
      {
        x: 0.50, y: 0.45, radius: 0.35, intensity: 0.90, type: 'frequency',
        title: 'Fourier Spectral Noise Suppression',
        description: 'Synthetic generator output exhibits unnaturally smooth Laplacian high-frequency response.'
      }
    ],
    anomalyMetrics: {
      boundarySeam: 72.1,
      featureWarp: 79.4,
      frequencyMismatch: 97.6
    },
    frameTimeline: Array.from({ length: 15 }, (_, i) => ({
      frame: i * 12,
      timestamp: (i * 0.40).toFixed(2),
      score: Math.min(97, Math.max(85, 93 + Math.sin(i * 1.5) * 4)).toFixed(1),
      artifactType: 'Fourier Noise Mismatch'
    }))
  },
  {
    id: 'sample-4',
    title: 'Authentic HD Video Stream (Control Baseline)',
    type: 'real',
    category: 'Authentic Stream',
    confidence: 3.2,
    efficientNetScore: 2.8,
    mesoNetScore: 3.6,
    fps: 30,
    duration: 5.5,
    totalFrames: 165,
    primaryArtifact: 'None (Natural Facial Skin Physics & Lighting)',
    description: 'Verified organic camera recording. Spatial texture gradients, organic blood flow subsurface scattering, temporal eye micro-tremors, and natural ambient lighting falloff are all consistent across the entire frame sequence.',
    avatarSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="realFaceGrad" cx="50%" cy="45%" r="48%">
          <stop offset="0%" stop-color="#fed7aa"/>
          <stop offset="60%" stop-color="#fdba74"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#0f172a"/>
      <!-- Clean background -->
      <circle cx="200" cy="180" r="170" fill="#1e293b"/>
      <path d="M 80,380 C 90,290 140,260 200,260 C 260,260 310,290 320,380" fill="#334155"/>
      <rect x="172" y="210" width="56" height="70" fill="#f97316" opacity="0.7" rx="8"/>
      <!-- Natural Face -->
      <ellipse cx="200" cy="170" rx="74" ry="94" fill="url(#realFaceGrad)"/>
      <ellipse cx="170" cy="155" rx="14" ry="9" fill="#ffffff"/>
      <ellipse cx="230" cy="155" rx="14" ry="9" fill="#ffffff"/>
      <circle cx="170" cy="155" r="5" fill="#475569"/>
      <circle cx="230" cy="155" r="5" fill="#475569"/>
      <path d="M 180 210 Q 200 220 220 210" stroke="#9a3412" stroke-width="4" fill="none"/>
      <!-- Green Verified Shield Badge -->
      <circle cx="340" cy="60" r="28" fill="#10b981" opacity="0.9"/>
      <path d="M 330 60 L 337 67 L 352 52" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`,
    faceMeshPoints: [
      { x: 200, y: 70 }, { x: 170, y: 80 }, { x: 230, y: 80 },
      { x: 140, y: 115 }, { x: 260, y: 115 }, { x: 130, y: 165 }, { x: 270, y: 165 },
      { x: 170, y: 155 }, { x: 230, y: 155 }, { x: 200, y: 185 }, { x: 200, y: 210 }
    ],
    gradCamHotspots: [],
    anomalyMetrics: {
      boundarySeam: 4.1,
      featureWarp: 2.8,
      frequencyMismatch: 2.6
    },
    frameTimeline: Array.from({ length: 15 }, (_, i) => ({
      frame: i * 11,
      timestamp: (i * 0.36).toFixed(2),
      score: Math.max(1, (3.2 + Math.sin(i) * 1.2)).toFixed(1),
      artifactType: 'Organic Signal'
    }))
  }
];

export const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Frame Extraction & Face Alignment',
    tech: 'OpenCV / MediaPipe 468 Face Mesh',
    description: 'Video streams are sampled at 30fps. OpenCV extracts high-resolution candidate frames, while MediaPipe generates a 468-point 3D facial landmark mesh for metric normalization.',
    codeSnippet: `import cv2
import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1)
ret, frame = cap.read()
results = face_mesh.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))`
  },
  {
    step: '02',
    title: 'Dual CNN Backbone Feature Extraction',
    tech: 'EfficientNet-B0 + MesoNet-4 Ensemble',
    description: 'Cropped facial bounding regions pass through an ensemble CNN pipeline. EfficientNet-B0 analyzes spatial texture gradients, while MesoNet-4 inspects mesoscopic frame anomalies.',
    codeSnippet: `import torch
import torchvision.models as models

model_eff = models.efficientnet_b0(pretrained=False)
model_eff.classifier[1] = torch.nn.Linear(1280, 2)
features = model_eff.features(facial_tensor)`
  },
  {
    step: '03',
    title: 'Grad-CAM XAI Heatmap Computation',
    tech: 'Gradient-weighted Class Activation Mapping',
    description: 'Computes gradients of the manipulation logit score with respect to feature maps of the final convolutional layer to generate localized spatial heatmaps.',
    codeSnippet: `# Grad-CAM Calculation
gradients = grad_cam_target.get_gradients()
pooled_gradients = torch.mean(gradients, dim=[0, 2, 3])
for i in range(activations.size(1)):
    activations[:, i, :, :] *= pooled_gradients[i]
heatmap = torch.mean(activations, dim=1).squeeze()`
  },
  {
    step: '04',
    title: 'Aggregated Authenticity Score & Audit Log',
    tech: 'Forensic Risk Engine',
    description: 'Fuses boundary seam confidence, dynamic feature warp index, and spectral frequency discrepancy into a single verifiable authenticity score and forensic report.',
    codeSnippet: `authenticity_score = (
    0.45 * eff_net_score +
    0.35 * meso_net_score +
    0.20 * grad_cam_boundary_density
)`
  }
];

export const MODEL_BENCHMARKS = [
  { model: 'SatyaVision Ensemble (XAI)', accuracy: 98.6, auc: 0.994, f1: 0.985, latency: '14ms' },
  { model: 'Standard EfficientNet-B0', accuracy: 94.2, auc: 0.958, f1: 0.938, latency: '18ms' },
  { model: 'MesoNet-4 (Baseline)', accuracy: 89.5, auc: 0.912, f1: 0.887, latency: '8ms' },
  { model: 'ResNet-50 Classifier', accuracy: 91.0, auc: 0.925, f1: 0.902, latency: '24ms' },
  { model: 'XceptionNet (FaceForensics)', accuracy: 95.1, auc: 0.965, f1: 0.946, latency: '32ms' }
];
