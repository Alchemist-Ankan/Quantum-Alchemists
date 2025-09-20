import { useState, useEffect } from "react";

interface MoodEntry {
  date: string;
  mood: string;
  timestamp: number;
}

export default function MoodTracker() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const loadMoodHistory = () => {
      try {
        const moodData = localStorage.getItem("moodHistory");
        if (!moodData) {
          setMoodHistory([]);
          return;
        }
        
        const parsedHistory: MoodEntry[] = JSON.parse(moodData);
        // Limit to last 20 entries for performance optimization
        const limitedHistory = parsedHistory.slice(0, 20);
        setMoodHistory(limitedHistory);
      } catch (error) {
        console.error('Failed to load mood history:', error);
        setMoodHistory([]);
      }
    };

    loadMoodHistory();
  }, []);

  const getMoodEmoji = (mood: string) => {
    const emojiMap: { [key: string]: string } = {
      "Happy": "😊",
      "Sad": "😢", 
      "Anxious": "😰",
      "Angry": "😡",
      "Tired": "😴"
    };
    return emojiMap[mood] || "😐";
  };

  const getInsights = () => {
    if (moodHistory.length === 0) return "No mood data available yet.";
    
    const recentMoods = moodHistory.slice(-7);
    const moodCounts = recentMoods.reduce((acc: { [key: string]: number }, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    
    const dominantMood = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )[0];
    
    const insights = [
      `Your most frequent mood this week has been ${dominantMood}. ${getMoodEmoji(dominantMood)}`,
      `You have tracked ${moodHistory.length} mood entries total.`,
      "Tracking patterns helps identify triggers and positive influences."
    ];
    
    if (dominantMood === "Anxious") {
      insights.push("💡 Try grounding exercises when feeling anxious - they can really help!");
    } else if (dominantMood === "Tired") {
      insights.push("💡 Consider meditation or gentle movement to boost your energy naturally.");
    } else if (dominantMood === "Happy") {
      insights.push("💡 Great to see you are feeling positive! Keep doing what makes you happy.");
    }
    
    return insights.join("\n\n");
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Mood History
        </h3>
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition-all text-sm duration-300"
        >
          {showInsights ? "Hide" : "Show"} AI Insights
        </button>
      </div>
      
      {showInsights && (
        <div className="mb-6 p-4 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 backdrop-blur-sm">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
            🤖 AI Pattern Analysis
          </h4>
          <p className="text-sm text-purple-700 dark:text-purple-300 whitespace-pre-line">
            {getInsights()}
          </p>
        </div>
      )}
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {moodHistory.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No mood entries yet. Start by selecting your current mood above!
          </p>
        ) : (
          moodHistory.slice(-10).reverse().map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50/80 dark:bg-gray-700 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {entry.mood}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(entry.timestamp).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
