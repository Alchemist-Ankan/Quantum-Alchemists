import { useState, useEffect } from "react";
import MoodCheckIn from "../components/MoodCheckIn";
import MoodTracker from "../components/MoodTracker";
import AssistantChat from "../components/AssistantChat";
import ThemeToggle from "../components/ThemeToggle";
import MoodAnalytics from "../components/MoodAnalytics";
import EmergencySupport from "../components/EmergencySupport";
import PersonalizedCoach from "../components/PersonalizedCoach";
import WellnessActivities from "../components/WellnessActivities";
import { runDataCleanup, shouldRunCleanup, markCleanupComplete } from "../utils/dataCleanup";

export default function Index() {
  const [mood, setMood] = useState<string>();
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics' | 'coach' | 'wellness' | 'emergency'>('dashboard');

  // Run data cleanup on app startup if needed
  useEffect(() => {
    if (shouldRunCleanup()) {
      runDataCleanup();
      markCleanupComplete();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-300">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            🧠 Mind Bridge
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI-powered mental wellness companion
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center mb-6 overflow-x-auto" role="navigation" aria-label="Main navigation">
          <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl p-2 border border-white/20 dark:border-gray-700 shadow-lg min-w-fit">
            <div className="flex space-x-1 sm:space-x-2" role="tablist">
              <button
                onClick={() => setCurrentView('dashboard')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentView('dashboard');
                  }
                }}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  currentView === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                role="tab"
                aria-selected={currentView === 'dashboard'}
                aria-controls="dashboard-panel"
                aria-label="Dashboard - Main view with mood check-in and chat"
                tabIndex={0}
              >
                🏠 <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentView('analytics');
                  }
                }}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  currentView === 'analytics'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                role="tab"
                aria-selected={currentView === 'analytics'}
                aria-controls="analytics-panel"
                aria-label="Analytics - View mood trends and insights"
                tabIndex={0}
              >
                📊 <span className="hidden sm:inline">Analytics</span>
              </button>
              <button
                onClick={() => setCurrentView('coach')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentView('coach');
                  }
                }}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  currentView === 'coach'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                role="tab"
                aria-selected={currentView === 'coach'}
                aria-controls="coach-panel"
                aria-label="AI Coach - Personalized mental health guidance"
                tabIndex={0}
              >
                🤖 <span className="hidden sm:inline">AI Coach</span>
              </button>
              <button
                onClick={() => setCurrentView('wellness')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentView('wellness');
                  }
                }}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  currentView === 'wellness'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                role="tab"
                aria-selected={currentView === 'wellness'}
                aria-controls="wellness-panel"
                aria-label="Wellness - Mindfulness and self-care activities"
                tabIndex={0}
              >
                🌸 <span className="hidden sm:inline">Wellness</span>
              </button>
              <button
                onClick={() => setCurrentView('emergency')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentView('emergency');
                  }
                }}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  currentView === 'emergency'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                }`}
                role="tab"
                aria-selected={currentView === 'emergency'}
                aria-controls="emergency-panel"
                aria-label="Emergency Support - Crisis resources and immediate help"
                tabIndex={0}
              >
                🆘 <span className="hidden sm:inline">Support</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        {currentView === 'dashboard' && (
          <div id="dashboard-panel" role="tabpanel" aria-labelledby="dashboard-tab" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Mood Check-in */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <MoodCheckIn onMoodSelected={setMood} />
              <MoodTracker />
            </div>
            
            {/* Right Column: Chat */}
            <div className="lg:col-span-2">
              <AssistantChat mood={mood} />
            </div>
          </div>
        )}

        {currentView === 'analytics' && (
          <div id="analytics-panel" role="tabpanel" aria-labelledby="analytics-tab" className="max-w-6xl mx-auto">
            <MoodAnalytics />
          </div>
        )}

        {currentView === 'coach' && (
          <div id="coach-panel" role="tabpanel" aria-labelledby="coach-tab" className="max-w-4xl mx-auto">
            <PersonalizedCoach />
          </div>
        )}

        {currentView === 'wellness' && (
          <div id="wellness-panel" role="tabpanel" aria-labelledby="wellness-tab" className="max-w-6xl mx-auto">
            <WellnessActivities />
          </div>
        )}

        {currentView === 'emergency' && (
          <div id="emergency-panel" role="tabpanel" aria-labelledby="emergency-tab" className="max-w-4xl mx-auto">
            <EmergencySupport />
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with ❤️ by Quantum Alchemists | Your mental health matters</p>
        </div>
      </div>
    </div>
  );
}