import { useState, useEffect } from "react";
import { Wind, TrendingUp, Heart, Music, Sprout, PenTool } from "lucide-react";
import { moodTracker } from "@/lib/moodTracking";
import { MoodData } from "@/types";
import MoodEntryDialog from "@/components/MoodEntryDialog";
import { useToast } from "@/hooks/use-toast";

export default function Sidebar() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [weeklyMoodData, setWeeklyMoodData] = useState<MoodData[]>([]);
  const [isMoodDialogOpen, setIsMoodDialogOpen] = useState(false);
  const [breathingTimeouts, setBreathingTimeouts] = useState<NodeJS.Timeout[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setWeeklyMoodData(moodTracker.getWeeklyMoodData());
  }, []);

  const startBreathingExercise = () => {
    setIsBreathing(true);
    // Implement 4-7-8 breathing pattern
    let phase: 'inhale' | 'hold' | 'exhale' = 'inhale';
    let cycleCount = 0;
    const maxCycles = 4;
    const timeouts: NodeJS.Timeout[] = [];

    const breathingCycle = () => {
      if (cycleCount >= maxCycles) {
        setIsBreathing(false);
        setBreathingTimeouts([]);
        return;
      }

      // Inhale for 4 seconds
      setBreathingPhase('inhale');
      const timeout1 = setTimeout(() => {
        // Hold for 7 seconds
        setBreathingPhase('hold');
        const timeout2 = setTimeout(() => {
          // Exhale for 8 seconds
          setBreathingPhase('exhale');
          const timeout3 = setTimeout(() => {
            cycleCount++;
            if (cycleCount < maxCycles) {
              breathingCycle();
            } else {
              setIsBreathing(false);
              setBreathingPhase('inhale');
              setBreathingTimeouts([]);
            }
          }, 8000);
          timeouts.push(timeout3);
        }, 7000);
        timeouts.push(timeout2);
      }, 4000);
      timeouts.push(timeout1);
    };

    setBreathingTimeouts(timeouts);
    breathingCycle();
  };

  const stopBreathingExercise = () => {
    // Clear all timeouts
    breathingTimeouts.forEach(timeout => clearTimeout(timeout));
    setBreathingTimeouts([]);
    setIsBreathing(false);
    setBreathingPhase('inhale');
  };

  const getBreathingText = () => {
    if (!isBreathing) return 'Breathe';
    switch (breathingPhase) {
      case 'inhale': return 'Inhale';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale';
      default: return 'Breathe';
    }
  };

  const selfCareActivities = [
    {
      icon: Music,
      name: "Listen to Calming Music",
      duration: "5-10 minutes",
      color: "lavender"
    },
    {
      icon: Sprout,
      name: "Mindful Walking",
      duration: "10-15 minutes",
      color: "sage"
    },
    {
      icon: PenTool,
      name: "Gratitude Journaling",
      duration: "5 minutes",
      color: "lavender"
    }
  ];

  // Generate week days for mood chart
  const generateWeekDays = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const moodEntry = weeklyMoodData.find(entry => entry.date === dateString);
      const moodValue = moodEntry ? getMoodHeight(moodEntry.mood) : 20;
      const moodColor = moodEntry ? moodTracker.getMoodColor(moodEntry.mood) : 'bg-gray-300';
      
      weekData.push({
        day: days[6 - i],
        height: moodValue,
        color: moodColor
      });
    }

    return weekData;
  };

  const getMoodHeight = (mood: MoodData['mood']) => {
    const heights = {
      'struggling': 20,
      'low': 40,
      'okay': 60,
      'good': 80,
      'great': 100
    };
    return heights[mood] || 20;
  };

  const handleMoodSave = (mood: MoodData['mood'], notes?: string) => {
    // Refresh the mood data to show the new entry
    setWeeklyMoodData(moodTracker.getWeeklyMoodData());
    
    // Show success message
    toast({
      title: "Mood entry saved",
      description: `Your mood has been recorded as "${mood}". Thank you for checking in with yourself.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Breathing Exercise */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-200">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <Wind className="text-white" size={24} />
          </div>
          <h3 className="font-semibold text-charcoal mb-2">Guided Breathing</h3>
          <p className="text-sm text-sage-600">Take a moment to center yourself</p>
        </div>
        
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-32 h-32 border-4 border-sage-200 rounded-full flex items-center justify-center">
            <div className={`w-20 h-20 bg-gradient-to-br from-sage-400 to-sage-500 rounded-full flex items-center justify-center transition-all duration-1000 ${
              isBreathing && breathingPhase === 'inhale' ? 'scale-110' : 
              isBreathing && breathingPhase === 'exhale' ? 'scale-90' : ''
            }`}>
              <span className="text-white font-medium text-sm">{getBreathingText()}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <button
            onClick={isBreathing ? stopBreathingExercise : startBreathingExercise}
            className={`w-full py-3 text-white rounded-xl transition-colors font-medium ${
              isBreathing 
                ? 'bg-red-400 hover:bg-red-500' 
                : 'bg-lavender-500 hover:bg-lavender-600'
            }`}
            data-testid="button-breathing-control"
          >
            {isBreathing ? 'Stop Exercise' : 'Start Exercise (4-7-8)'}
          </button>
          <button className="w-full py-2 text-sage-600 hover:text-sage-700 transition-colors text-sm">
            More Techniques
          </button>
        </div>
      </div>
      
      {/* Mood Tracking */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-200">
        <h3 className="font-semibold text-charcoal mb-4 flex items-center">
          <TrendingUp className="text-sage-500 mr-2" size={20} />
          Mood Journal
        </h3>
        
        <div className="mb-4">
          <div className="flex justify-between items-end h-20 mb-2">
            {generateWeekDays().map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-4 rounded-t ${day.color}`}
                  style={{ height: `${day.height}%` }}
                ></div>
                <span className="text-xs text-sage-500 mt-1">{day.day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-sage-500 text-center">This week's mood pattern</p>
        </div>
        
        <button 
          onClick={() => setIsMoodDialogOpen(true)}
          className="w-full py-3 bg-sage-50 text-sage-700 rounded-xl hover:bg-sage-100 transition-colors font-medium border border-sage-200"
          data-testid="button-add-mood-entry"
        >
          Add Today's Entry
        </button>
      </div>
      
      {/* Self-Care Activities */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-200">
        <h3 className="font-semibold text-charcoal mb-4 flex items-center">
          <Heart className="text-lavender-500 mr-2" size={20} />
          Self-Care Activities
        </h3>
        
        <div className="space-y-3">
          {selfCareActivities.map((activity, index) => (
            <div 
              key={index}
              className={`flex items-center p-3 bg-${activity.color}-50 rounded-xl hover:bg-${activity.color}-100 transition-colors cursor-pointer`}
              data-testid={`button-activity-${index}`}
            >
              <div className={`w-8 h-8 bg-${activity.color}-400 rounded-full flex items-center justify-center mr-3`}>
                <activity.icon className="text-white" size={12} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.name}</p>
                <p className="text-xs text-sage-500">{activity.duration}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-3 py-2 text-sage-600 hover:text-sage-700 transition-colors text-sm">
          View All Activities
        </button>
      </div>

      <MoodEntryDialog
        isOpen={isMoodDialogOpen}
        onClose={() => setIsMoodDialogOpen(false)}
        onSave={handleMoodSave}
      />
    </div>
  );
}
