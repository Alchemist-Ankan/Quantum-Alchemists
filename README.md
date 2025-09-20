# MindBridge Coach

A mental health coaching application built with React, TypeScript, and Tailwind CSS.

## Features

- **Mood Check-in**: Select from 5 mood states (Happy, Sad, Anxious, Stressed, Tired)
- **AI Assistant Chat**: Get contextual responses and mental health tips based on your mood
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light theme switching

## Project Structure

```
├── src/
│   ├── App.tsx              # Main application entry point
│   ├── global.css           # Global styles with Tailwind directives
│   ├── components/
│   │   ├── MoodCheckIn.tsx  # Mood selection component
│   │   └── AssistantChat.tsx # Chat interface component
│   ├── pages/
│   │   └── Index.tsx        # Main page layout
│   └── utils/
│       └── coachResponses.ts # Mental health tips and responses
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Prerequisites

Before running this project, make sure you have Node.js installed on your system:

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
2. **Verify installation**: 
   ```bash
   node --version
   npm --version
   ```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Mental Health Resources

This app provides general wellness tips and is not a substitute for professional mental health care. If you're experiencing a mental health crisis, please contact:

- **Emergency**: 911 (US) or your local emergency number
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988

## Development

The project uses:
- Vite for fast development and building
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint and TypeScript for code quality

## Fixed Issues

✅ Restructured deeply nested directory structure  
✅ Moved configuration files to project root  
✅ Updated import paths throughout the application  
✅ Fixed HTML entry point reference  
✅ Organized components into logical directories

## Known Requirements

⚠️ **Node.js Installation Required**: This project requires Node.js to be installed to resolve React module dependencies and run the development server.

Once Node.js is installed, run `npm install` to install all dependencies and resolve the current TypeScript import errors.