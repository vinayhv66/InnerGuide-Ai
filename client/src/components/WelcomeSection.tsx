import { useState } from "react";
import { moodTracker } from "@/lib/moodTracking";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { value: 'great' as const, emoji: '😊', label: 'Great' },
  { value: 'good' as const, emoji: '🙂', label: 'Good' },
  { value: 'okay' as const, emoji: '😐', label: 'Okay' },
  { value: 'low' as const, emoji: '😔', label: 'Low' },
  { value: 'struggling' as const, emoji: '😰', label: 'Struggling' }
];

interface WelcomeSectionProps {
  onMoodSelect: (mood: string) => void;
}

export default function WelcomeSection({ onMoodSelect }: WelcomeSectionProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    moodTracker.saveMoodEntry(mood as any);
    onMoodSelect(mood);
    
    toast({
      title: "Mood recorded",
      description: "Thank you for sharing how you're feeling today.",
    });
  };

  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-sage-50 to-lavender-50 rounded-2xl p-6 border border-sage-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-charcoal mb-2">Welcome to Your Safe Space</h2>
          <p className="text-sage-600 max-w-2xl mx-auto leading-relaxed">
            I'm here to listen, support, and help you navigate your feelings. Take a moment to breathe and know that you're not alone.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-3 text-center">How are you feeling right now?</h3>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`flex flex-col items-center p-3 rounded-xl hover:bg-sage-50 transition-all duration-200 ${
                  selectedMood === mood.value ? 'bg-sage-100 scale-105' : ''
                }`}
                onClick={() => handleMoodSelect(mood.value)}
                data-testid={`button-mood-${mood.value}`}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs text-sage-600">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
