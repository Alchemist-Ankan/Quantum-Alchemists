const stressTips = [
  "🌊 Try the 4-7-8 breathing technique: Inhale for 4s, hold for 7s, exhale for 8s. Repeat 4 times.",
  "🚶‍♀️ Take a 5-minute walk outside - fresh air reduces cortisol levels by 15%.",
  "📝 Brain dump: Write down 3 things stressing you. Cross off what you can't control right now.",
  "💪 Quick stress-buster: Do 10 jumping jacks or push-ups to release tension.",
  "🎵 Put on your favorite calming song and do some gentle stretching.",
  "❄️ Splash cold water on your wrists and face - it activates your vagus nerve for instant calm."
];

const motivationTips = [
  "⚡ Energy boost: Try the 2-minute rule - just start for 2 minutes, momentum will carry you forward.",
  "🎯 Break it down: What's the smallest possible step you can take right now?",
  "🏆 Reward system: Promise yourself something nice after completing one small task.",
  "☀️ Natural energy: Open curtains, get some sunlight, and drink a glass of water.",
  "🎉 Celebrate small wins: Did you get out of bed? That's already an achievement!",
  "🔄 Power pose: Stand tall for 2 minutes - it actually increases confidence hormones."
];

const meditationTips = [
  "🧘‍♀️ 5-Minute Energy Meditation: Sit comfortably, breathe deeply, and visualize golden light filling your body with each inhale.",
  "😴 Progressive Muscle Relaxation: Tense and release each muscle group from toes to head. Feel the tiredness melt away.",
  "🌊 Ocean Breathing: Breathe in like waves coming to shore, breathe out like waves retreating. Continue for 3-5 minutes.",
  "🌟 Body Scan: Close your eyes, mentally scan from head to toe, sending gratitude to each part of your body.",
  "🎵 Humming Meditation: Hum softly for 2 minutes - the vibrations boost energy and reduce fatigue.",
  "☁️ Cloud Watching: Lie down, breathe naturally, and imagine your tiredness floating away like clouds."
];

const anxietyTechniques = [
  "🔍 5-4-3-2-1 Grounding: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
  "🌱 Root yourself: Feel your feet on the ground. You are safe, you are here, this moment will pass.",
  "💭 Anxiety reframe: Ask yourself 'Is this thought helpful right now?' If not, gently let it go.",
  "🫂 Self-compassion: Place your hand on your heart and say 'This is a moment of struggle, I am not alone.'",
  "⏰ 10-minute rule: Tell your anxiety 'I'll worry about this in 10 minutes.' Often, the feeling passes.",
  "🌬️ Box breathing: In for 4, hold for 4, out for 4, hold for 4. This activates your calm response."
];

const reflectionPrompts = [
  "🌟 What's one small thing that brought you joy today, even if it lasted just a moment?",
  "💝 Who in your life would appreciate hearing from you right now? Consider sending them a quick message.",
  "🪞 If your best friend felt exactly like you do right now, what kind words would you offer them?",
  "🌱 What's one thing you learned about yourself today, good or challenging?",
  "🙏 Name three things you're grateful for right now - they can be as simple as having a roof over your head.",
  "🎯 What would make tomorrow just 1% better than today? Start small."
];

const closingLines = [
  "✨ You've taken a brave step by checking in with yourself. I'm here whenever you need support.",
  "🌙 Remember: healing isn't linear, progress isn't perfect, and you're exactly where you need to be.",
  "💪 Every moment you choose self-care is a victory. Take care, and see you soon! 🌈",
  "🕊️ It's okay to log off and rest now. Your mental health journey continues when you're ready.",
  "⭐ You matter, your feelings are valid, and tomorrow is a new opportunity. Rest well! ✨"
];

const encouragementMessages = [
  "🌟 I see you're taking care of your mental health - that takes real strength!",
  "💚 Your emotional awareness is a superpower. Keep nurturing it!",
  "🌈 Every time you check in with yourself, you're building emotional intelligence.",
  "🦋 Growth happens in small moments like this. You're doing amazing!",
  "🌸 Self-compassion is a practice, not a destination. You're on the right path."
];

// Advanced AI response system
export function getCoachResponse(topic: "stress" | "motivation" | "reflection" | "closing" | "meditation" | "anxiety" | "encouragement"): string {
  const sets: Record<string, string[]> = {
    stress: stressTips,
    motivation: motivationTips,
    meditation: meditationTips,
    anxiety: anxietyTechniques,
    reflection: reflectionPrompts,
    closing: closingLines,
    encouragement: encouragementMessages
  };
  const arr = sets[topic];
  return arr[Math.floor(Math.random() * arr.length)];
}

// Smart mood-based AI responses
export function getSmartMoodResponse(mood: string): string {
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? "morning" : currentHour < 17 ? "afternoon" : "evening";
  
  if (mood.includes("Tired")) {
    if (currentHour < 10) {
      return `Good ${timeOfDay}! I notice you're feeling tired. ${getCoachResponse("meditation")} Starting your day with mindfulness can boost energy naturally.`;
    } else if (currentHour > 20) {
      return `It's ${timeOfDay} and you're feeling tired - that's completely natural. ${getCoachResponse("meditation")} Consider preparing for restful sleep.`;
    } else {
      return `Feeling tired in the ${timeOfDay}? ${getCoachResponse("meditation")} A short meditation can be more refreshing than caffeine!`;
    }
  }
  
  if (mood.includes("Anxious")) {
    return `I understand you're feeling anxious right now. ${getCoachResponse("anxiety")} Remember, anxiety is temporary and you have tools to manage it.`;
  }
  
  if (mood.includes("Stressed")) {
    if (currentHour >= 9 && currentHour <= 17) {
      return `Workday stress getting to you? ${getCoachResponse("stress")} Even 2 minutes can make a huge difference.`;
    } else {
      return `Stress can follow us home, but you're taking control by acknowledging it. ${getCoachResponse("stress")}`;
    }
  }
  
  if (mood.includes("Sad")) {
    return `Thank you for sharing that you're feeling sad. Your emotions are valid. ${getCoachResponse("reflection")} Sometimes reflecting helps us process difficult feelings.`;
  }
  
  if (mood.includes("Happy")) {
    return `Wonderful to hear you're feeling happy! ${getCoachResponse("encouragement")} Positive emotions are worth celebrating and savoring.`;
  }
  
  return `Thank you for checking in with your emotions. ${getCoachResponse("reflection")}`;
}

// Interactive feature prompts
export function getInteractivePrompt(mood: string): string {
  if (mood.includes("Tired")) {
    return "Would you like me to guide you through a 3-minute energy meditation? Type 'meditation' to start.";
  }
  if (mood.includes("Anxious")) {
    return "I can guide you through a grounding exercise. Type 'grounding' to begin the 5-4-3-2-1 technique.";
  }
  if (mood.includes("Stressed")) {
    return "Want to try a quick stress-relief technique? Type 'breathing' for guided breathing or 'movement' for energizing exercises.";
  }
  return "I have several tools that might help. Type 'meditation', 'breathing', or 'grounding' to try guided exercises.";
}