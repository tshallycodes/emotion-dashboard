# Emotion Detector Web App

A full-stack AI web app for **facial emotion recognition** using a **PyTorch model** and a **React dashboard**. Users upload an image and receive emotion predictions with confidence and probability bars.

---

## Tech Stack

**Frontend**
- React (Vite)
- Axios
- CSS

**Backend**
- FastAPI
- PyTorch
- Torchvision
- PIL

---

## Model

- Trained on **FER2013**
- Input: 48×48 grayscale face images
- Architecture: ResNet-based CNN
- Classes: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral
- File: `emotion_model.pth`

---

## Project Structure


backend/
├── main.py
├── model.py
└── emotion_model.pth
emotion-dashboard/
├── src/App.jsx
├── src/App.css
└── package.json

---

## Setup

### Backend
```bash
cd backend
pip install fastapi uvicorn torch torchvision pillow
uvicorn main:app --reload
```

### Frontend
``` bash
cd emotion-dashboard
npm install
npm run dev
```

Frontend: http://localhost:5173
API: POST /predict

## How It Works

- User uploads an image
- Image is preprocessed and passed to the model
- API returns emotion, confidence, and probabilities
- UI displays results with probability bars


## Notes

- Best results on FER-style images (cropped faces)
- Webcam inference removed for consistency
- Real-world images may need face detection


## Future Improvements

- Face detection & cropping
- Better real-world generalization
- Deployment and UI polish


