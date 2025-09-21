# 🧠 Mind Bridge

<div align="center">

![Mind Bridge Logo](https://img.shields.io/badge/🧠-Mind%20Bridge-blue?style=for-the-badge&labelColor=darkblue)

**AI-Powered Mental Wellness Platform**

*Transforming mental healthcare through technology, privacy, and compassion*

[![Live Demo](https://img.shields.io/badge/🌐-Live%20Demo-success?style=for-the-badge)](https://quantum-alchemists.vercel.app/)

</div>

## What is this?

Mind Bridge is a mental health platform that helps users track their mood, get AI-powered support, and access wellness resources. It provides a safe, private space for mental health management with real-time mood tracking and personalized assistance.

## Why this?

Mental health issues are increasing globally, but access to professional help remains limited and expensive. Mind Bridge aims to:

- **Provide accessible mental health support** available 24/7
- **Ensure complete privacy** with secure, isolated user data
- **Offer personalized guidance** through AI-powered responses
- **Bridge the gap** between users and professional mental health resources

## Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern UI with type safety
- **Tailwind CSS** - Responsive design system
- **Vite** - Fast development and build tool

### Backend
- **Firebase Authentication** - Google OAuth integration
- **Firestore Database** - Real-time NoSQL database
- **Firebase Security Rules** - Server-side data protection

### Deployment
- **Vercel** - Production hosting with global CDN
- **GitHub** - Version control and CI/CD

## Future Planning

### Phase 1: Current (MVP)
- ✅ User authentication with Google OAuth
- ✅ Real-time mood tracking
- ✅ Basic AI assistant responses
- ✅ Production deployment

### Phase 2: Enhanced AI (3-6 months)
- 🔄 Google Gemini integration
- 🔄 Advanced mood analysis
- 🔄 Personalized recommendations

### Phase 3: Mobile & Therapy (6-12 months)
- 📅 React Native mobile app
- 📅 Video consultation platform
- 📅 Licensed therapist network

### Phase 4: Enterprise (1-2 years)
- 📅 Advanced AI/ML models
- 📅 Healthcare provider integration
- 📅 Full HIPAA compliance

## File Structure

```
Quantum-Alchemists/
├── src/
│   ├── components/          # React UI components
│   │   ├── MoodTracker.tsx  # Mood tracking interface
│   │   ├── AssistantChat.tsx # AI chat component
│   │   ├── MoodAnalytics.tsx # Analytics dashboard
│   │   ├── WellnessActivities.tsx # Wellness activities
│   │   └── EmergencySupport.tsx # Crisis resources
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── ThemeContext.tsx # Dark mode toggle
│   ├── utils/              # Helper functions
│   └── global.css          # Global styles
├── public/                 # Static assets
├── firestore.rules         # Database security rules
├── firebase.json           # Firebase configuration
└── vercel.json            # Deployment configuration
```

## Quick Start

```bash
# Clone repository
git clone https://github.com/Alchemist-Ankan/Quantum-Alchemists.git

# Install dependencies
npm install

# Start development server
npm run dev

# Visit: http://localhost:5174
```

**Live Demo**: [https://quantum-alchemists.vercel.app/](https://quantum-alchemists.vercel.app/)

---

**Built with ❤️ by Quantum Alchemists | Your mental health matters**