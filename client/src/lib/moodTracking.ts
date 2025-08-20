import { MoodData } from "@/types";

export class MoodTracker {
  private storageKey = 'mindspace_mood_data';

  getMoodData(): MoodData[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading mood data:', error);
      return [];
    }
  }

  saveMoodEntry(mood: MoodData['mood'], notes?: string): void {
    try {
      const existingData = this.getMoodData();
      const today = new Date().toISOString().split('T')[0];
      
      // Remove any existing entry for today
      const filteredData = existingData.filter(entry => entry.date !== today);
      
      // Add new entry
      const newEntry: MoodData = {
        mood,
        date: today,
        notes
      };
      
      filteredData.push(newEntry);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredData));
    } catch (error) {
      console.error('Error saving mood data:', error);
    }
  }

  getWeeklyMoodData(): MoodData[] {
    const data = this.getMoodData();
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return data.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo && entryDate <= today;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getMoodTrend(): 'improving' | 'stable' | 'declining' {
    const weeklyData = this.getWeeklyMoodData();
    if (weeklyData.length < 3) return 'stable';

    const moodValues = {
      'great': 5,
      'good': 4,
      'okay': 3,
      'low': 2,
      'struggling': 1
    };

    const recent = weeklyData.slice(-3).map(entry => moodValues[entry.mood]);
    const earlier = weeklyData.slice(0, 3).map(entry => moodValues[entry.mood]);

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;

    if (recentAvg > earlierAvg + 0.5) return 'improving';
    if (recentAvg < earlierAvg - 0.5) return 'declining';
    return 'stable';
  }

  getMoodColor(mood: MoodData['mood']): string {
    const colors = {
      'great': 'bg-green-400',
      'good': 'bg-sage-400',
      'okay': 'bg-yellow-400',
      'low': 'bg-orange-400',
      'struggling': 'bg-red-400'
    };
    return colors[mood] || 'bg-gray-400';
  }

  getMoodEmoji(mood: MoodData['mood']): string {
    const emojis = {
      'great': '😊',
      'good': '🙂',
      'okay': '😐',
      'low': '😔',
      'struggling': '😰'
    };
    return emojis[mood] || '😐';
  }
}

export const moodTracker = new MoodTracker();
