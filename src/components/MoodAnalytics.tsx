import { useState, useEffect } from "react";

interface MoodEntry {
  date: string;
  mood: string;
  timestamp: number;
  intensity?: number;
  triggers?: string[];
  notes?: string;
}

interface MoodData {
  mood: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export default function MoodAnalytics() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedMoods = localStorage.getItem("moodHistory");
      if (savedMoods) {
        const allMoods: MoodEntry[] = JSON.parse(savedMoods);
        // Limit data processing to last 30 days for performance
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const recentMoods = allMoods.filter(mood => mood.timestamp > thirtyDaysAgo);
        setMoodHistory(recentMoods);
      }
    } catch (error) {
      console.error('Failed to load mood history for analytics:', error);
      setMoodHistory([]);
    }
  }, []);

  const getMoodColor = (mood: string) => {
    const colorMap: { [key: string]: string } = {
      "Happy": "bg-green-500",
      "Sad": "bg-blue-500",
      "Anxious": "bg-yellow-500",
      "Angry": "bg-red-500",
      "Tired": "bg-purple-500"
    };
    return colorMap[mood] || "bg-gray-500";
  };

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

  const getFilteredData = () => {
    const now = new Date();
    const daysBack = timeframe === 'week' ? 7 : 30;
    const cutoff = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    return moodHistory.filter(entry => new Date(entry.timestamp) >= cutoff);
  };

  const calculateTrend = (mood: string): 'up' | 'down' | 'stable' => {
    const filtered = getFilteredData();
    const moodEntries = filtered.filter(entry => entry.mood === mood);
    
    if (moodEntries.length < 2) return 'stable';
    
    // Split entries into two halves (earlier vs later)
    const midpoint = Math.floor(moodEntries.length / 2);
    const earlierHalf = moodEntries.slice(0, midpoint);
    const laterHalf = moodEntries.slice(midpoint);
    
    const earlierCount = earlierHalf.length;
    const laterCount = laterHalf.length;
    
    // Calculate percentage difference
    const totalDays = timeframe === 'week' ? 7 : 30;
    const earlierPeriodDays = Math.floor(totalDays / 2);
    const laterPeriodDays = totalDays - earlierPeriodDays;
    
    const earlierRate = earlierCount / earlierPeriodDays;
    const laterRate = laterCount / laterPeriodDays;
    
    const changeThreshold = 0.1; // 10% change to be considered trending
    
    if (laterRate > earlierRate * (1 + changeThreshold)) return 'up';
    if (laterRate < earlierRate * (1 - changeThreshold)) return 'down';
    return 'stable';
  };

  const getMoodDistribution = (): MoodData[] => {
    const filtered = getFilteredData();
    const moodCounts = filtered.reduce((acc: { [key: string]: number }, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    const total = filtered.length;
    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      trend: calculateTrend(mood)
    }));
  };

  const getChartData = () => {
    const filtered = getFilteredData();
    const periods = [];
    const now = new Date();
    const daysToShow = timeframe === 'week' ? 7 : 30;
    
    if (timeframe === 'week') {
      // Show daily data for week view
      for (let i = daysToShow - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dayEntries = filtered.filter(entry => {
          const entryDate = new Date(entry.timestamp);
          return entryDate.toDateString() === date.toDateString();
        });
        
        periods.push({
          date: date.toLocaleDateString('en', { weekday: 'short' }),
          entries: dayEntries,
          dominantMood: dayEntries.length > 0 ? dayEntries[dayEntries.length - 1].mood : null
        });
      }
    } else {
      // Show weekly data for month view (4-5 weeks)
      const weeksToShow = 4;
      for (let i = weeksToShow - 1; i >= 0; i--) {
        const weekStart = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
        const weekEnd = new Date(weekStart.getTime() + (6 * 24 * 60 * 60 * 1000));
        
        const weekEntries = filtered.filter(entry => {
          const entryDate = new Date(entry.timestamp);
          return entryDate >= weekStart && entryDate <= weekEnd;
        });
        
        // Find most common mood for the week
        const moodCounts = weekEntries.reduce((acc: { [key: string]: number }, entry) => {
          acc[entry.mood] = (acc[entry.mood] || 0) + 1;
          return acc;
        }, {});
        
        const dominantMood = Object.entries(moodCounts).length > 0 
          ? Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
          : null;
        
        periods.push({
          date: `W${weeksToShow - i}`,
          entries: weekEntries,
          dominantMood
        });
      }
    }
    
    return periods;
  };

  const generateInsights = () => {
    const distribution = getMoodDistribution();
    const filtered = getFilteredData();
    const insights = [];

    if (distribution.length === 0) {
      return ["Start tracking your mood to see personalized insights!"];
    }

    // Dominant mood insight
    const dominantMood = distribution.reduce((a, b) => a.percentage > b.percentage ? a : b);
    insights.push(`Your most frequent mood this ${timeframe} has been ${dominantMood.mood} (${dominantMood.percentage}%)`);

    // Frequency insight
    if (filtered.length > 0) {
      const avgPerDay = Math.round(filtered.length / (timeframe === 'week' ? 7 : 30));
      insights.push(`You've been tracking consistently with ${avgPerDay} entries per day on average`);
    }

    // Trend insight
    if (dominantMood.mood === 'Happy') {
      insights.push("🌟 Great to see you're feeling positive! Keep up the activities that bring you joy.");
    } else if (dominantMood.mood === 'Anxious') {
      insights.push("💙 Consider practicing breathing exercises or grounding techniques when feeling anxious.");
    } else if (dominantMood.mood === 'Tired') {
      insights.push("😴 Regular sleep schedule and gentle movement might help boost your energy levels.");
    }

    return insights;
  };

  useEffect(() => {
    setInsights(generateInsights());
  }, [moodHistory, timeframe]);

  const chartData = getChartData();
  const distribution = getMoodDistribution();

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          📊 Mood Analytics
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              timeframe === 'week'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              timeframe === 'month'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          {timeframe === 'week' ? 'Daily Mood Pattern (7 Days)' : 'Weekly Mood Pattern (4 Weeks)'}
        </h4>
        <div className={`grid gap-2 ${timeframe === 'week' ? 'grid-cols-7' : 'grid-cols-4'}`}>
          {chartData.map((period, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {period.date}
              </div>
              <div className={`h-12 rounded-lg flex items-center justify-center text-2xl ${
                period.dominantMood 
                  ? getMoodColor(period.dominantMood) + ' text-white'
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                {period.dominantMood ? getMoodEmoji(period.dominantMood) : '·'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {period.entries.length} {period.entries.length === 1 ? 'entry' : 'entries'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Distribution */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Mood Distribution - {timeframe === 'week' ? 'Past 7 Days' : 'Past 30 Days'}
        </h4>
        {distribution.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-6xl mb-4">📊</div>
            <h4 className="text-lg font-medium mb-2">No Mood Data Yet</h4>
            <p className="mb-4">Start tracking your moods to see analytics here!</p>
            <div className="bg-blue-50/80 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 text-left">
              <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                📝 How Data Storage Works:
              </h5>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Go to <strong>Dashboard</strong> and select your current mood</li>
                <li>• Each selection is automatically saved to your browser's localStorage</li>
                <li>• Data includes: mood name, timestamp, and date</li>
                <li>• Your data stays private on your device (never sent to servers)</li>
                <li>• Analytics update in real-time as you track more moods</li>
                <li>• Data persists between browser sessions</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {distribution.map((data) => (
              <div key={data.mood} className="flex items-center">
                <div className="flex items-center w-20">
                  <span className="text-lg mr-2">{getMoodEmoji(data.mood)}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{data.mood}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getMoodColor(data.mood)}`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right w-16">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {data.percentage}%
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ({data.count} entries)
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2 flex items-center">
          🤖 AI Insights
        </h4>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <p key={index} className="text-sm text-indigo-700 dark:text-indigo-300">
              • {insight}
            </p>
          ))}
        </div>
      </div>

      {/* Data Management */}
      {moodHistory.length > 0 && (
        <div className="mt-6 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            🗂️ Data Management
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Storage Info:</h5>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Total entries: <strong>{moodHistory.length}</strong></li>
                <li>• Oldest entry: <strong>{new Date(Math.min(...moodHistory.map(e => e.timestamp))).toLocaleDateString()}</strong></li>
                <li>• Latest entry: <strong>{new Date(Math.max(...moodHistory.map(e => e.timestamp))).toLocaleDateString()}</strong></li>
                <li>• Storage: Browser localStorage</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Data Actions:</h5>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(moodHistory, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `mood-data-${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-all"
                >
                  📥 Export Data (JSON)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}