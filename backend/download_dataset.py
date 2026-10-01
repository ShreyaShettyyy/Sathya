import os
import urllib.request
import cv2
import numpy as np

def create_dataset():
    base_dir = 'dataset'
    real_dir = os.path.join(base_dir, 'real')
    fake_dir = os.path.join(base_dir, 'fake')
    
    os.makedirs(real_dir, exist_ok=True)
    os.makedirs(fake_dir, exist_ok=True)
    
    print("Downloading sample real and fake images...")
    
    # Download some sample "real" face images
    real_urls = [
        ("real_1.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/256px-Pierre-Person.jpg"),
        ("real_2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/256px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"),
        ("real_3.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/256px-Brad_Pitt_2019_by_Glenn_Francis.jpg")
    ]
    
    # Download some sample "fake" face images (AI generated faces)
    fake_urls = [
        ("fake_1.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/256px-Woman_1.jpg"), # Using public AI faces where possible
        ("fake_2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Artificial_intelligence_face.jpg/256px-Artificial_intelligence_face.jpg"),
    ]
    
    for name, url in real_urls:
        try:
            urllib.request.urlretrieve(url, os.path.join(real_dir, name))
        except Exception as e:
            print(f"Failed to download {name}: {e}")
            
    for name, url in fake_urls:
        try:
            urllib.request.urlretrieve(url, os.path.join(fake_dir, name))
        except Exception as e:
            print(f"Failed to download {name}: {e}")
            
    print("Generating sample videos...")
    
    # Generate a dummy "real" video using OpenCV
    real_vid_path = os.path.join(real_dir, "real_video.mp4")
    out = cv2.VideoWriter(real_vid_path, cv2.VideoWriter_fourcc(*'mp4v'), 30, (256, 256))
    for i in range(90): # 3 seconds
        frame = np.zeros((256, 256, 3), dtype=np.uint8)
        # Draw a simple moving shape to simulate motion
        cv2.circle(frame, (128 + int(50 * np.sin(i * 0.1)), 128), 50, (0, 255, 0), -1)
        out.write(frame)
    out.release()
    
    # Generate a dummy "fake" video with glitches
    fake_vid_path = os.path.join(fake_dir, "fake_video.mp4")
    out = cv2.VideoWriter(fake_vid_path, cv2.VideoWriter_fourcc(*'mp4v'), 30, (256, 256))
    for i in range(90):
        frame = np.zeros((256, 256, 3), dtype=np.uint8)
        # Normal motion
        x_pos = 128 + int(50 * np.sin(i * 0.1))
        # Introduce "glitches" (sudden jumps) every 20 frames
        if i % 20 > 15:
            x_pos += 40
            
        cv2.circle(frame, (x_pos, 128), 50, (0, 0, 255), -1)
        # Add high frequency noise (ELA anomaly)
        noise = np.random.normal(0, 15, (256, 256, 3)).astype(np.uint8)
        frame = cv2.add(frame, noise)
        out.write(frame)
    out.release()
    
    print("Sample dataset created successfully!")
    print(f"Real samples: {len(os.listdir(real_dir))}")
    print(f"Fake samples: {len(os.listdir(fake_dir))}")
    print("\nNote: For a production model, please replace these samples with a real dataset like FaceForensics++.")

if __name__ == "__main__":
    create_dataset()
