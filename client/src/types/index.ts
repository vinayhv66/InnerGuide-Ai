export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickResponses?: string[];
}

export interface MoodData {
  mood: 'great' | 'good' | 'okay' | 'low' | 'struggling';
  date: string;
  notes?: string;
}

export interface SelfCareActivity {
  id: string;
  name: string;
  icon: string;
  duration: string;
  category: 'breathing' | 'mindfulness' | 'physical' | 'creative';
}

export interface ConversationContext {
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  topic: string;
  intensity: number; // 1-5 scale
}
