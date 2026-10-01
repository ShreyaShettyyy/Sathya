import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms, models
from PIL import Image
import cv2

# Example training script for Deepfake Detection
# Recommended Dataset: FaceForensics++ or Celeb-DF
# Download the dataset and place it in the `dataset/` directory:
# dataset/
#  ├── real/
#  │   ├── real1.mp4
#  │   └── real2.mp4
#  └── fake/
#      ├── fake1.mp4
#      └── fake2.mp4

class DeepfakeDataset(Dataset):
    def __init__(self, data_dir, transform=None):
        self.data_dir = data_dir
        self.transform = transform
        self.samples = []
        
        # Load real videos
        real_dir = os.path.join(data_dir, 'real')
        if os.path.exists(real_dir):
            for f in os.listdir(real_dir):
                if f.endswith(('.mp4', '.avi', '.jpg', '.png')):
                    self.samples.append((os.path.join(real_dir, f), 0))
                    
        # Load fake videos
        fake_dir = os.path.join(data_dir, 'fake')
        if os.path.exists(fake_dir):
            for f in os.listdir(fake_dir):
                if f.endswith(('.mp4', '.avi', '.jpg', '.png')):
                    self.samples.append((os.path.join(fake_dir, f), 1))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        file_path, label = self.samples[idx]
        
        # If it's a video, extract a random frame
        if file_path.endswith(('.mp4', '.avi')):
            cap = cv2.VideoCapture(file_path)
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            # Pick a middle frame for simplicity in this example
            cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, frame_count // 2))
            ret, frame = cap.read()
            cap.release()
            
            if ret:
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                image = Image.fromarray(image)
            else:
                image = Image.new('RGB', (224, 224))
        else:
            image = Image.open(file_path).convert('RGB')
            
        if self.transform:
            image = self.transform(image)
            
        return image, label

def get_model():
    # Using ResNet50 as a backbone, pretrained on ImageNet
    model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)
    # Change final layer for binary classification (Real vs Fake)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 2)
    return model

def train_model(data_dir='dataset', epochs=10, batch_size=16):
    print("Initializing training pipeline...")
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    dataset = DeepfakeDataset(data_dir, transform=transform)
    
    if len(dataset) == 0:
        print(f"No data found in {data_dir}. Please download FaceForensics++ or Celeb-DF dataset.")
        print(f"Create folders {data_dir}/real and {data_dir}/fake and put your videos/images there.")
        return
        
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    model = get_model().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.0001)
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        corrects = 0
        total = 0
        
        for inputs, labels in dataloader:
            inputs = inputs.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            
            outputs = model(inputs)
            _, preds = torch.max(outputs, 1)
            loss = criterion(outputs, labels)
            
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item() * inputs.size(0)
            corrects += torch.sum(preds == labels.data)
            total += inputs.size(0)
            
        epoch_loss = running_loss / total
        epoch_acc = corrects.double() / total
        
        print(f'Epoch {epoch}/{epochs - 1} - Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')
        
    print("Training complete! Saving model...")
    torch.save(model.state_dict(), 'deepfake_model.pth')
    print("Saved to deepfake_model.pth")

if __name__ == '__main__':
    # To run this, place data in the 'dataset' folder and execute: python train.py
    # train_model('dataset', epochs=5)
    print("Train script ready. Uncomment train_model() at the bottom to begin training.")
