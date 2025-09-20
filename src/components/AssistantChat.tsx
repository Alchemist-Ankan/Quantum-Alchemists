import { useState, useEffect } from "react";
import { getCoachResponse, getSmartMoodResponse, getInteractivePrompt } from "../utils/coachResponses";

export default function AssistantChat({ mood }: { mood?: string }) {
  const [messages, setMessages] = useState<
    { id: number; role: "user" | "assistant"; text: string; type?: "guided" }[]
  >([]);
  const [input, setInput] = useState("");
  const [isGuidedMode, setIsGuidedMode] = useState(false);

  useEffect(() => {
    if (mood) {
      const smartResponse = getSmartMoodResponse(mood);
      const interactivePrompt = getInteractivePrompt(mood);
      
      setMessages([
        {
          id: Date.now(),
          role: "assistant" as const,
          text: smartResponse
        },
        {
          id: Date.now() + 1,
          role: "assistant" as const,
          text: interactivePrompt,
          type: "guided"
        }
      ]);
    }
  }, [mood]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user" as const, text: input };
    setMessages(prev => [...prev, userMsg]);

    const inputLower = input.toLowerCase();
    let response = "";

    if (inputLower.includes("meditation")) {
      setIsGuidedMode(true);
      response = `🧘‍♀️ Starting 3-Minute Energy Meditation:

1. Sit comfortably and close your eyes
2. Take 3 deep breaths, releasing tension
3. Visualize warm, golden light entering your body
4. With each breath, feel energy filling every cell
5. When ready, slowly open your eyes

Take your time. Type 'done' when finished. 🌟`;
    } else if (inputLower.includes("grounding")) {
      setIsGuidedMode(true);
      response = `🌱 5-4-3-2-1 Grounding Exercise:

Look around and name:
👁️ 5 things you can SEE
✋ 4 things you can TOUCH
👂 3 things you can HEAR
👃 2 things you can SMELL
👅 1 thing you can TASTE

Take your time with each step. This brings you into the present moment. Type 'complete' when done.`;
    } else if (inputLower.includes("breathing")) {
      setIsGuidedMode(true);
      response = `🌬️ 4-7-8 Calming Breath:

1. Exhale completely
2. Inhale through nose for 4 counts
3. Hold breath for 7 counts
4. Exhale through mouth for 8 counts

Repeat 4 cycles. Focus only on counting. Type 'finished' when complete. 💙`;
    } else if (inputLower.includes("movement")) {
      setIsGuidedMode(true);
      response = `💪 Quick Energy Movement:

1. Stand up and stretch arms overhead
2. Do 10 gentle jumping jacks
3. Roll your shoulders back 5 times
4. Take 3 deep breaths
5. Shake out your hands and feet

Notice how your body feels! Type 'energized' when done. ⚡`;
    } else if (inputLower.includes("done") || inputLower.includes("complete") || inputLower.includes("finished") || inputLower.includes("energized")) {
      setIsGuidedMode(false);
      response = `🌟 Wonderful! You've completed the exercise. How are you feeling now? Remember, these tools are always available to you. Your dedication to self-care is inspiring! ✨`;
    } else {
      if (inputLower.includes("stress") || inputLower.includes("overwhelm")) {
        response = getCoachResponse("stress");
      } else if (inputLower.includes("anxious") || inputLower.includes("worry") || inputLower.includes("nervous")) {
        response = getCoachResponse("anxiety");
      } else if (inputLower.includes("tired") || inputLower.includes("exhausted") || inputLower.includes("energy")) {
        response = getCoachResponse("meditation");
      } else if (inputLower.includes("sad") || inputLower.includes("down") || inputLower.includes("depressed")) {
        response = getCoachResponse("reflection");
      } else if (inputLower.includes("thanks") || inputLower.includes("bye") || inputLower.includes("goodbye")) {
        response = getCoachResponse("closing");
      } else if (inputLower.includes("help") || inputLower.includes("options")) {
        response = `I'm here to support you! Try typing:

• 'meditation' for guided energy meditation
• 'grounding' for anxiety relief
• 'breathing' for calming exercises
• 'movement' for energizing activities

Or just tell me how you're feeling. 💙`;
      } else {
        response = getCoachResponse("encouragement");
      }
    }

    setMessages(prev => [
      ...prev,
      { id: Date.now() + 1, role: "assistant" as const, text: response }
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-auto min-h-[700px] border border-white/20 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800 backdrop-blur-sm w-full shadow-lg">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`${
                m.role === "user"
                  ? "bg-gradient-to-br from-teal-600 to-indigo-600 text-white shadow-md"
                  : m.type === "guided"
                  ? "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-900 dark:text-purple-100 border-purple-300 dark:border-purple-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              } max-w-[80%] rounded-2xl border px-4 py-3 text-sm shadow-sm whitespace-pre-line`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isGuidedMode && (
          <div className="flex justify-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded-full text-xs font-medium">
               Guided Exercise in Progress
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          className="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm bg-white/80 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="Share your thoughts or try 'meditation', 'breathing', 'grounding'..."
        />
        <button
          onClick={handleSend}
          className="rounded-lg bg-gradient-to-br from-teal-500 to-indigo-500 px-4 py-2 text-white text-sm hover:from-teal-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
