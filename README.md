# CogniPrep AI 
(AI-Powered Interview Preparation Platform)

## 🚀 Live Demo

🔗 cogniprepai.vercel.app

---

## 📌 Features

* 📄 Resume Upload & AI Parsing
* 🎯 Role-based Interview Questions (HR + Technical)
* 💬 Text-based Mock Interview
* 🎤 Voice-based Interview (WebRTC)
* 🧠 AI Feedback System (confidence, accuracy, communication)
* 📊 Performance Dashboard with insights
* ⚠️ Weakness Detection & Improvement Suggestions

---

## 🛠 Tech Stack

**Frontend:**

* React.js
* Tailwind CSS

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**AI Integration:**

* OpenAI API / LangChain
* Speech-to-Text APIs

---

## 🧠 How It Works

1. Upload your resume
2. Select your target job role
3. Start mock interview (text/voice)
4. Answer AI-generated questions
5. Get detailed feedback & performance score

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-interview-coach.git
cd ai-interview-coach
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_api_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 📂 Project Structure

```
ai-interview-coach/
│
├── client/          # React frontend
├── server/          # Node backend
├── docs/            # PRD & documentation
├── README.md
└── .env.example
```

---

## 🔐 Environment Variables

| Variable       | Description               |
| -------------- | ------------------------- |
| MONGO_URI      | MongoDB connection string |
| OPENAI_API_KEY | OpenAI API key            |
| PORT           | Server port               |

---

## 📊 Future Enhancements

* 🤖 AI Avatar Interviewer
* 🎥 Video Interview Simulation
* 🏢 Company-specific interview prep
* 🏆 Gamification (badges, leaderboard)


---

