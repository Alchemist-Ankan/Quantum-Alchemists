import { useState, useEffect } from "react";

interface WellnessActivity {
  id: string;
  title: string;
  description: string;
  category: 'journaling' | 'meditation' | 'breathing' | 'movement' | 'mindfulness';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  completionCount: number;
  lastCompleted?: number;
}

interface JournalEntry {
  id: string;
  prompt: string;
  response: string;
  date: number;
  mood?: string;
}

export default function WellnessActivities() {
  const [activeTab, setActiveTab] = useState<'activities' | 'journal' | 'meditation' | 'breathing'>('activities');
  const [selectedActivity, setSelectedActivity] = useState<WellnessActivity | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isActivityRunning, setIsActivityRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activityTimer, setActivityTimer] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [isActivityPaused, setIsActivityPaused] = useState(false);
  const [activities] = useState<WellnessActivity[]>([
    {
      id: '1',
      title: 'Gratitude Reflection',
      description: 'Practice daily gratitude to shift focus to positive aspects of life',
      category: 'journaling',
      duration: 10,
      difficulty: 'beginner',
      instructions: [
        'Find a quiet, comfortable space',
        'Think about your day or recent experiences',
        'Write down 3 things you\'re grateful for',
        'For each item, write why it\'s meaningful to you',
        'Reflect on how these things make you feel'
      ],
      completionCount: 0
    },
    {
      id: '2',
      title: 'Mindful Breathing',
      description: 'Simple breathing exercise to reduce stress and increase mindfulness',
      category: 'breathing',
      duration: 5,
      difficulty: 'beginner',
      instructions: [
        'Sit comfortably with your back straight',
        'Close your eyes or soften your gaze',
        'Breathe in slowly through your nose for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly through your mouth for 6 counts',
        'Repeat for 5-10 cycles'
      ],
      completionCount: 0
    },
    {
      id: '3',
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation technique to release tension and increase awareness',
      category: 'meditation',
      duration: 15,
      difficulty: 'intermediate',
      instructions: [
        'Lie down comfortably on your back',
        'Close your eyes and take three deep breaths',
        'Start at the top of your head, notice any sensations',
        'Slowly move your attention down through your body',
        'Notice each part without judgment',
        'If you find tension, breathe into that area',
        'Continue until you reach your toes'
      ],
      completionCount: 0
    },
    {
      id: '4',
      title: 'Gentle Stretching',
      description: 'Light movement to release physical tension and boost mood',
      category: 'movement',
      duration: 10,
      difficulty: 'beginner',
      instructions: [
        'Stand with feet hip-width apart',
        'Reach arms overhead and stretch upward',
        'Slowly roll shoulders backward 5 times',
        'Gently stretch neck side to side',
        'Touch toes or reach toward the ground',
        'Hold each stretch for 15-30 seconds'
      ],
      completionCount: 0
    },
    {
      id: '5',
      title: '5-4-3-2-1 Grounding',
      description: 'Sensory grounding technique for anxiety and overwhelm',
      category: 'mindfulness',
      duration: 3,
      difficulty: 'beginner',
      instructions: [
        'Name 5 things you can see around you',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste',
        'Take a deep breath and notice how you feel'
      ],
      completionCount: 0
    }
  ]);

  const [journalPrompts] = useState<string[]>([
    "What am I grateful for today?",
    "How did I grow as a person this week?",
    "What challenge did I overcome recently?",
    "What would I tell a friend who was struggling with my current situation?",
    "What small thing brought me joy today?",
    "How can I be kinder to myself?",
    "What am I looking forward to?",
    "What did I learn about myself today?",
    "How did I show love or kindness today?",
    "What positive change would I like to make in my life?"
  ]);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [emergencyJournalEntries, setEmergencyJournalEntries] = useState<Array<{content: string, timestamp: string}>>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [journalResponse, setJournalResponse] = useState<string>('');
  const [meditationTimer, setMeditationTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathingCount, setBreathingCount] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathingCycles, setBreathingCycles] = useState<number>(0);
  const [showAllJournals, setShowAllJournals] = useState<boolean>(false);

  useEffect(() => {
    // Load wellness journal entries
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setJournalEntries(JSON.parse(saved));
    }

    // Load emergency journal entries
    const emergencySaved = localStorage.getItem('emergencyJournalEntries');
    if (emergencySaved) {
      setEmergencyJournalEntries(JSON.parse(emergencySaved));
    }

    // Set a random prompt for journaling
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(randomPrompt);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isTimerActive && meditationTimer > 0) {
      interval = window.setInterval(() => {
        setMeditationTimer(timer => timer - 1);
      }, 1000);
    } else if (meditationTimer === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, meditationTimer]);

  const saveJournalEntry = () => {
    if (!journalResponse.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt,
      response: journalResponse,
      date: Date.now()
    };

    const updatedEntries = [entry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    setJournalResponse('');
    // Get new random prompt
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const deleteJournalEntry = (entryId: string) => {
    const updatedEntries = journalEntries.filter(entry => entry.id !== entryId);
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const exportAllJournalEntries = () => {
    if (journalEntries.length === 0 && emergencyJournalEntries.length === 0) {
      alert('No journal entries to export.');
      return;
    }

    let exportData = '';
    
    // Add wellness journal entries
    if (journalEntries.length > 0) {
      exportData += '🌱 WELLNESS JOURNAL ENTRIES\n' + '='.repeat(50) + '\n\n';
      journalEntries.forEach(entry => {
        exportData += `Date: ${new Date(entry.date).toLocaleString()}\n`;
        exportData += `Prompt: "${entry.prompt}"\n\n`;
        exportData += `Response:\n${entry.response}\n\n`;
        exportData += '='.repeat(50) + '\n\n';
      });
    }

    // Add emergency journal entries
    if (emergencyJournalEntries.length > 0) {
      exportData += '🆘 EMERGENCY JOURNAL ENTRIES\n' + '='.repeat(50) + '\n\n';
      emergencyJournalEntries.forEach(entry => {
        exportData += `Date: ${entry.timestamp}\n\n`;
        exportData += `${entry.content}\n\n`;
        exportData += '='.repeat(50) + '\n\n';
      });
    }

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `complete-journal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startActivity = (activity: WellnessActivity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
    // Note: In a real app, you'd update and save activity completion data
  };

  const startGuidedActivity = () => {
    if (!selectedActivity) return;
    
    setIsActivityRunning(true);
    setCurrentStep(0);
    setActivityTimer(selectedActivity.duration * 60); // Convert minutes to seconds
    setStepTimer(Math.floor((selectedActivity.duration * 60) / selectedActivity.instructions.length));
    setIsActivityPaused(false);
    setShowActivityModal(false); // Close modal and show guided view
  };

  const pauseActivity = () => {
    setIsActivityPaused(!isActivityPaused);
  };

  const stopActivity = () => {
    setIsActivityRunning(false);
    setCurrentStep(0);
    setActivityTimer(0);
    setStepTimer(0);
    setIsActivityPaused(false);
    setSelectedActivity(null);
  };

  const nextStep = () => {
    if (!selectedActivity) return;
    
    if (currentStep < selectedActivity.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      const remainingSteps = selectedActivity.instructions.length - currentStep - 1;
      if (remainingSteps > 0) {
        setStepTimer(Math.floor(activityTimer / remainingSteps));
      }
    }
  };

  const completeActivity = () => {
    // Reset state
    stopActivity();
    
    // Show completion message (you could add a completion modal here)
    alert(`🎉 Great job! You completed "${selectedActivity?.title}". Keep up the wonderful work on your wellness journey!`);
  };

  const startMeditationTimer = (minutes: number) => {
    setMeditationTimer(minutes * 60);
    setIsTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingCycles(0);
    setBreathingPhase('inhale');
    setBreathingCount(4);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCount(4);
  };

  // Activity timer effect
  useEffect(() => {
    let interval: number;
    if (isActivityRunning && !isActivityPaused && activityTimer > 0) {
      interval = window.setInterval(() => {
        setActivityTimer(prev => {
          if (prev <= 1) {
            completeActivity();
            return 0;
          }
          return prev - 1;
        });
        
        setStepTimer(prev => {
          if (prev <= 1) {
            nextStep();
            return Math.floor(activityTimer / (selectedActivity?.instructions.length || 1));
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActivityRunning, isActivityPaused, activityTimer, stepTimer, selectedActivity]);

  // Breathing cycle effect
  useEffect(() => {
    let interval: number;
    if (isBreathingActive) {
      interval = window.setInterval(() => {
        setBreathingCount(prev => {
          if (prev > 1) {
            return prev - 1;
          }
          
          // Move to next phase
          setBreathingPhase(currentPhase => {
            switch (currentPhase) {
              case 'inhale':
                setBreathingCount(4);
                return 'hold';
              case 'hold':
                setBreathingCount(6);
                return 'exhale';
              case 'exhale':
                setBreathingCount(2);
                return 'pause';
              case 'pause':
                setBreathingCycles(cycles => cycles + 1);
                setBreathingCount(4);
                return 'inhale';
              default:
                return 'inhale';
            }
          });
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      journaling: '📝',
      meditation: '🧘',
      breathing: '🫁',
      movement: '🤸',
      mindfulness: '🌿'
    };
    return icons[category as keyof typeof icons] || '✨';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      journaling: 'from-purple-500 to-pink-500',
      meditation: 'from-green-500 to-teal-500',
      breathing: 'from-blue-500 to-cyan-500',
      movement: 'from-orange-500 to-red-500',
      mindfulness: 'from-indigo-500 to-purple-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          🌸 Wellness Activities
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <button
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'activities'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          ✨ All Activities
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'journal'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          📝 Journal
        </button>
        <button
          onClick={() => setActiveTab('meditation')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'meditation'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          🧘 Meditation
        </button>
        <button
          onClick={() => setActiveTab('breathing')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'breathing'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          🫁 Breathing
        </button>
      </div>

      {/* Activities List */}
      {activeTab === 'activities' && (
        <div className="grid gap-4 md:grid-cols-2">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white/60 dark:bg-gray-700/60 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(activity.category)}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>{activity.duration} min</span>
                <span className="capitalize">{activity.difficulty}</span>
                <span>{activity.completionCount} times completed</span>
              </div>

              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Instructions:</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {activity.instructions.slice(0, 3).map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                  {activity.instructions.length > 3 && (
                    <li className="text-gray-400 italic">...and {activity.instructions.length - 3} more steps</li>
                  )}
                </ul>
              </div>

              <button 
                onClick={() => startActivity(activity)}
                className={`w-full py-2 rounded-md text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(activity.category)} hover:opacity-90 transition-all`}
              >
                Start Activity
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Journal Tab */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h4 className="text-lg font-medium text-purple-800 dark:text-purple-200 mb-4">
              📝 Today's Journal Prompt
            </h4>
            <p className="text-purple-700 dark:text-purple-300 mb-4 text-lg italic">
              "{currentPrompt}"
            </p>
            <textarea
              value={journalResponse}
              onChange={(e) => setJournalResponse(e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => {
                  const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
                  setCurrentPrompt(randomPrompt);
                }}
                className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm"
              >
                🎲 New Prompt
              </button>
              <button
                onClick={saveJournalEntry}
                disabled={!journalResponse.trim()}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Save Entry
              </button>
            </div>
          </div>

          {/* All Journal Entries */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">All Journal Entries</h4>
              <div className="flex gap-2">
                <button
                  onClick={exportAllJournalEntries}
                  className="px-4 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all"
                  disabled={journalEntries.length === 0 && emergencyJournalEntries.length === 0}
                >
                  📥 Export All
                </button>
                <button
                  onClick={() => setShowAllJournals(!showAllJournals)}
                  className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all"
                >
                  {showAllJournals ? 'Show Less' : 'View All'}
                </button>
              </div>
            </div>
            
            {journalEntries.length === 0 && emergencyJournalEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">📖</div>
                <p>No journal entries yet. Start writing!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Wellness Journal Entries */}
                {journalEntries.length > 0 && (
                  <div>
                    <h5 className="text-md font-medium text-green-700 dark:text-green-300 mb-3 flex items-center">
                      🌱 Wellness Journal ({journalEntries.length} entries)
                    </h5>
                    {(showAllJournals ? journalEntries : journalEntries.slice(0, 2)).map((entry) => (
                      <div key={entry.id} className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 mb-3">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 flex-1">"{entry.prompt}"</p>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs text-green-600 dark:text-green-400">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => deleteJournalEntry(entry.id)}
                              className="text-red-500 hover:text-red-600 text-sm"
                              title="Delete entry"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed whitespace-pre-wrap">
                          {entry.response}
                        </p>
                      </div>
                    ))}
                    {!showAllJournals && journalEntries.length > 2 && (
                      <p className="text-center text-sm text-green-600 dark:text-green-400 mb-4">
                        {journalEntries.length - 2} more wellness entries...
                      </p>
                    )}
                  </div>
                )}

                {/* Emergency Journal Entries */}
                {emergencyJournalEntries.length > 0 && (
                  <div>
                    <h5 className="text-md font-medium text-red-700 dark:text-red-300 mb-3 flex items-center">
                      🆘 Emergency Journal ({emergencyJournalEntries.length} entries)
                    </h5>
                    {(showAllJournals ? emergencyJournalEntries : emergencyJournalEntries.slice(0, 2)).slice().reverse().map((entry, index) => (
                      <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 mb-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium">Emergency Entry</span>
                          <span className="text-xs text-red-600 dark:text-red-400">
                            {entry.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed whitespace-pre-wrap">
                          {entry.content}
                        </p>
                      </div>
                    ))}
                    {!showAllJournals && emergencyJournalEntries.length > 2 && (
                      <p className="text-center text-sm text-red-600 dark:text-red-400">
                        {emergencyJournalEntries.length - 2} more emergency entries...
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meditation Tab */}
      {activeTab === 'meditation' && (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
            <h4 className="text-xl font-medium text-green-800 dark:text-green-200 mb-4">
              🧘 Meditation Timer
            </h4>
            {meditationTimer > 0 ? (
              <div className="space-y-4">
                <div className="text-4xl font-mono text-green-700 dark:text-green-300">
                  {formatTime(meditationTimer)}
                </div>
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    isTimerActive
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isTimerActive ? 'Pause' : 'Resume'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-700 dark:text-green-300 mb-6">
                  Choose your meditation duration
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => startMeditationTimer(5)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                  >
                    5 min
                  </button>
                  <button
                    onClick={() => startMeditationTimer(10)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                  >
                    10 min
                  </button>
                  <button
                    onClick={() => startMeditationTimer(15)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                  >
                    15 min
                  </button>
                  <button
                    onClick={() => startMeditationTimer(20)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                  >
                    20 min
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Breathing Tab */}
      {activeTab === 'breathing' && (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
            <h4 className="text-xl font-medium text-blue-800 dark:text-blue-200 mb-6">
              🫁 Guided Breathing Exercise
            </h4>
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                  isBreathingActive 
                    ? breathingPhase === 'inhale' || breathingPhase === 'hold'
                      ? 'scale-110 border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'scale-90 border-blue-600 bg-blue-100 dark:bg-blue-800/20'
                    : 'scale-100 border-blue-500'
                }`}>
                  <div className="text-center">
                    <div className="text-lg font-medium text-blue-600 dark:text-blue-400 capitalize">
                      {isBreathingActive ? breathingPhase.replace('_', ' ') : 'Ready'}
                    </div>
                    {isBreathingActive && (
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {breathingCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {isBreathingActive && (
                <div className="text-center space-y-2">
                  <div className="text-lg text-blue-700 dark:text-blue-300">
                    Cycles completed: {breathingCycles}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {breathingPhase === 'inhale' && 'Slowly breathe in through your nose...'}
                    {breathingPhase === 'hold' && 'Hold your breath gently...'}
                    {breathingPhase === 'exhale' && 'Slowly breathe out through your mouth...'}
                    {breathingPhase === 'pause' && 'Rest and prepare for the next breath...'}
                  </div>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                {!isBreathingActive ? (
                  <button 
                    onClick={startBreathingExercise}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                  >
                    Start Breathing Exercise
                  </button>
                ) : (
                  <button 
                    onClick={stopBreathingExercise}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                  >
                    Stop Exercise
                  </button>
                )}
              </div>
              
              {!isBreathingActive && (
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>Follow the 4-4-6-2 breathing pattern:</p>
                  <p>Inhale for 4 seconds → Hold for 4 seconds → Exhale for 6 seconds → Pause for 2 seconds</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Guided Activity Session */}
      {isActivityRunning && selectedActivity && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full text-center shadow-2xl border border-white/20 dark:border-gray-700/50">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl mr-3">{getCategoryIcon(selectedActivity.category)}</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedActivity.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Guided Wellness Session
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Step {currentStep + 1} of {selectedActivity.instructions.length}</span>
                <span>{Math.floor(activityTimer / 60)}:{(activityTimer % 60).toString().padStart(2, '0')} remaining</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(selectedActivity.category)}`}
                  style={{ width: `${((currentStep + 1) / selectedActivity.instructions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Step */}
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">
                Current Step:
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-lg leading-relaxed">
                {selectedActivity.instructions[currentStep]}
              </p>
            </div>

            {/* Timer and Controls */}
            <div className="mb-6">
              <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-4">
                {Math.floor(stepTimer / 60)}:{(stepTimer % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Time for this step
              </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={pauseActivity}
                className={`px-6 py-3 rounded-lg text-white transition-all ${
                  isActivityPaused 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {isActivityPaused ? '▶️ Resume' : '⏸️ Pause'}
              </button>
              
              {currentStep < selectedActivity.instructions.length - 1 && (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  ⏭️ Next Step
                </button>
              )}
              
              {currentStep === selectedActivity.instructions.length - 1 && (
                <button
                  onClick={completeActivity}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                >
                  ✅ Complete
                </button>
              )}
              
              <button
                onClick={stopActivity}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
              >
                ❌ Stop
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Activity Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">{getCategoryIcon(selectedActivity.category)}</span>
                  {selectedActivity.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {selectedActivity.duration} minutes • {selectedActivity.difficulty}
                </p>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedActivity.description}
            </p>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Instructions:</h4>
              <ol className="space-y-2">
                {selectedActivity.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowActivityModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Close
              </button>
              <button
                onClick={startGuidedActivity}
                className={`flex-1 py-2 px-4 text-white rounded-lg bg-gradient-to-r ${getCategoryColor(selectedActivity.category)} hover:opacity-90 transition-all`}
              >
                Start Guided Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}