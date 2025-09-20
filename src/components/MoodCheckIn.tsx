import { useState, memo } from "react";

// Define the mood entry interface for clear data structure
interface MoodEntry {
  date: string;
  mood: string;
  timestamp: number;
}

export default memo(function MoodCheckIn({ onMoodSelected }: { onMoodSelected: (mood: string) => void }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { name: "Happy", emoji: "😊" },
    { name: "Sad", emoji: "😢" },
    { name: "Anxious", emoji: "😰" },
    { name: "Angry", emoji: "😡" },
    { name: "Tired", emoji: "😴" }
  ];

  // Save mood data to localStorage for analytics and tracking
  const saveMoodToHistory = (moodName: string) => {
    try {
      const timestamp = Date.now();
      const newEntry: MoodEntry = {
        date: new Date(timestamp).toISOString(),
        mood: moodName,
        timestamp: timestamp
      };

      // Get existing mood history from localStorage
      const existingHistory = localStorage.getItem("moodHistory");
      const moodHistory: MoodEntry[] = existingHistory ? JSON.parse(existingHistory) : [];
      
      // Add new entry to the beginning of the array (most recent first)
      moodHistory.unshift(newEntry);
      
      // Limit to last 100 entries to prevent excessive storage
      if (moodHistory.length > 100) {
        moodHistory.splice(100);
      }
      
      // Save back to localStorage
      localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    } catch (error) {
      console.error('Failed to save mood data:', error);
      // Still allow the function to continue even if localStorage fails
      alert('Failed to save mood data. Your mood was recorded but may not persist.');
    }
  };

  const handleMoodSelect = (moodName: string) => {
    setSelectedMood(moodName);
    onMoodSelected(moodName);
    
    // Save the mood selection to localStorage for analytics
    saveMoodToHistory(moodName);
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center" id="mood-selection-heading">
        How are you feeling today?
      </h2>
      <div className="flex flex-col gap-3" role="radiogroup" aria-labelledby="mood-selection-heading">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleMoodSelect(mood.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMoodSelect(mood.name);
              }
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-teal-500 hover:bg-teal-50/80 dark:hover:bg-teal-900/20 hover:shadow-md flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              selectedMood === mood.name
                ? "border-teal-500 bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-teal-900/30 dark:to-indigo-900/30 shadow-md"
                : "border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700 hover:bg-white/80"
            }`}
            role="radio"
            aria-checked={selectedMood === mood.name}
            aria-label={`Select ${mood.name} mood`}
            aria-describedby={`mood-${mood.name.toLowerCase()}-description`}
            tabIndex={0}
          >
            <div className="text-3xl" aria-hidden="true">{mood.emoji}</div>
            <div className={`font-medium text-left ${
              selectedMood === mood.name 
                ? "text-teal-700 dark:text-teal-300" 
                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            }`}>
              {mood.name}
              <span id={`mood-${mood.name.toLowerCase()}-description`} className="sr-only">
                {mood.name === 'Happy' && 'Feeling positive and joyful'}
                {mood.name === 'Sad' && 'Feeling down or melancholy'}
                {mood.name === 'Anxious' && 'Feeling worried or nervous'}
                {mood.name === 'Angry' && 'Feeling frustrated or irritated'}
                {mood.name === 'Tired' && 'Feeling exhausted or sleepy'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});
