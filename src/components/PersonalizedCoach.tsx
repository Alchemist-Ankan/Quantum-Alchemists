import { useState, useEffect } from "react";

interface UserPreferences {
  preferredExercises: string[];
  helpfulResponses: string[];
  triggerWords: string[];
  goals: Goal[];
  lastInteraction: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  type: 'daily' | 'weekly' | 'monthly';
  category: 'mood' | 'exercise' | 'social' | 'self-care';
  createdAt: number;
  completedDates: number[];
}

export default function PersonalizedCoach() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredExercises: [],
    helpfulResponses: [],
    triggerWords: [],
    goals: [],
    lastInteraction: Date.now()
  });
  const [showGoals, setShowGoals] = useState(true);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: 1,
    type: 'daily' as 'daily' | 'weekly' | 'monthly',
    category: 'mood' as 'mood' | 'exercise' | 'social' | 'self-care'
  });

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const savePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
  };

  const createGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      target: newGoal.target,
      current: 0,
      type: newGoal.type,
      category: newGoal.category,
      createdAt: Date.now(),
      completedDates: []
    };

    const updatedPrefs = {
      ...preferences,
      goals: [...preferences.goals, goal]
    };
    
    savePreferences(updatedPrefs);
    setNewGoal({ title: '', description: '', target: 1, type: 'daily', category: 'mood' });
    setShowNewGoal(false);
  };

  const updateGoalProgress = (goalId: string) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const updatedGoals = preferences.goals.map(goal => {
      if (goal.id === goalId) {
        const alreadyCompleted = goal.completedDates.includes(today);
        if (!alreadyCompleted) {
          return {
            ...goal,
            current: goal.current + 1,
            completedDates: [...goal.completedDates, today]
          };
        }
      }
      return goal;
    });

    savePreferences({ ...preferences, goals: updatedGoals });
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = preferences.goals.filter(goal => goal.id !== goalId);
    savePreferences({ ...preferences, goals: updatedGoals });
  };

  const getGoalProgress = (goal: Goal) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const isCompletedToday = goal.completedDates.includes(today);
    
    let progress = 0;
    if (goal.type === 'daily') {
      progress = isCompletedToday ? 100 : 0;
    } else if (goal.type === 'weekly') {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const thisWeekCompletions = goal.completedDates.filter(date => date >= weekStart.getTime()).length;
      progress = Math.min((thisWeekCompletions / goal.target) * 100, 100);
    } else {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      
      const thisMonthCompletions = goal.completedDates.filter(date => date >= monthStart.getTime()).length;
      progress = Math.min((thisMonthCompletions / goal.target) * 100, 100);
    }
    
    return Math.round(progress);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      mood: '🎭',
      exercise: '💪',
      social: '🤝',
      'self-care': '🌸'
    };
    return icons[category as keyof typeof icons] || '🎯';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      mood: 'from-pink-500 to-rose-500',
      exercise: 'from-green-500 to-emerald-500',
      social: 'from-blue-500 to-cyan-500',
      'self-care': 'from-purple-500 to-violet-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getPersonalizedMessage = () => {
    const messages = [
      "You're making great progress! Keep up the wonderful work on your mental health journey.",
      "Remember, small steps every day lead to big changes over time.",
      "Your commitment to self-care is inspiring. How are you feeling today?",
      "I've noticed you're building healthy habits. That's fantastic!",
      "Taking time for your mental health shows real strength and wisdom."
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          🤖 Your Personal AI Coach
        </h3>
        <button
          onClick={() => setShowGoals(!showGoals)}
          className="px-3 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all text-sm"
        >
          {showGoals ? 'Hide Goals' : 'Show Goals'}
        </button>
      </div>

      {/* Personalized Message */}
      <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6 border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
          💬 Daily Message
        </h4>
        <p className="text-indigo-700 dark:text-indigo-300 text-sm">
          {getPersonalizedMessage()}
        </p>
      </div>

      {showGoals && (
        <div className="space-y-4">
          {/* Goals Header */}
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              🎯 Your Wellness Goals
            </h4>
            <button
              onClick={() => setShowNewGoal(!showNewGoal)}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-all text-sm"
            >
              + New Goal
            </button>
          </div>

          {/* New Goal Form */}
          {showNewGoal && (
            <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div className="grid gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="e.g., Practice mindfulness daily"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="mood">Mood Tracking</option>
                      <option value="exercise">Exercise</option>
                      <option value="social">Social Connection</option>
                      <option value="self-care">Self Care</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Frequency
                    </label>
                    <select
                      value={newGoal.type}
                      onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Target ({newGoal.type})
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={createGoal}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-all text-sm"
                  >
                    Create Goal
                  </button>
                  <button
                    onClick={() => setShowNewGoal(false)}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-3">
            {preferences.goals.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">🎯</div>
                <p>No goals set yet. Create your first wellness goal!</p>
              </div>
            ) : (
              preferences.goals.map((goal) => {
                const progress = getGoalProgress(goal);
                const today = new Date().setHours(0, 0, 0, 0);
                const isCompletedToday = goal.completedDates.includes(today);
                
                return (
                  <div key={goal.id} className="bg-white/60 dark:bg-gray-700/60 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getCategoryIcon(goal.category)}</span>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {goal.title}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {goal.type} goal • {goal.target} {goal.type === 'daily' ? 'time' : 'times'} per {goal.type.replace('ly', '')}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(goal.category)}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.completedDates.length} total completions
                      </span>
                      <button
                        onClick={() => updateGoalProgress(goal.id)}
                        disabled={isCompletedToday && goal.type === 'daily'}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          isCompletedToday && goal.type === 'daily'
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : 'bg-teal-500 hover:bg-teal-600 text-white'
                        }`}
                      >
                        {isCompletedToday && goal.type === 'daily' ? '✓ Completed Today' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}