import { Message, ConversationContext } from "@/types";

interface ResponseTemplate {
  condition: (context: ConversationContext) => boolean;
  responses: string[];
  quickResponses?: string[];
}

export class ConversationEngine {
  private responseTemplates: ResponseTemplate[] = [
    {
      condition: (context) => context.keywords.includes('overwhelmed') || context.keywords.includes('stressed'),
      responses: [
        "I hear you, and what you're feeling is completely valid. Feeling overwhelmed is a common experience, especially during challenging times.",
        "It sounds like you're carrying a lot right now. Let's work together to break this down into manageable pieces.",
        "Overwhelm can feel suffocating, but remember that you've gotten through difficult times before. What usually helps you when you feel this way?"
      ],
      quickResponses: [
        "I need help organizing my thoughts",
        "I want to try a breathing exercise",
        "Tell me more about coping strategies"
      ]
    },
    {
      condition: (context) => context.keywords.includes('anxious') || context.keywords.includes('worry') || context.keywords.includes('worried'),
      responses: [
        "Anxiety can make everything feel uncertain and scary. You're not alone in feeling this way, and it's okay to acknowledge these feelings.",
        "Worry often comes from our mind trying to protect us by thinking through every possibility. Let's focus on what you can control right now.",
        "I understand that anxious thoughts can be overwhelming. Would you like to try some grounding techniques to help you feel more present?"
      ],
      quickResponses: [
        "What grounding techniques can help?",
        "I need to calm down right now",
        "Help me understand my anxiety better"
      ]
    },
    {
      condition: (context) => context.keywords.includes('sad') || context.keywords.includes('depressed') || context.keywords.includes('down'),
      responses: [
        "I'm sorry you're feeling this way. Sadness is a natural human emotion, and it's important to honor what you're experiencing.",
        "When we're feeling down, it can be hard to see beyond the current moment. Your feelings are valid, and this difficult time will pass.",
        "It takes courage to reach out when you're feeling low. That's already a positive step toward taking care of yourself."
      ],
      quickResponses: [
        "I don't know why I feel this way",
        "How can I feel better?",
        "I feel alone in this"
      ]
    },
    {
      condition: (context) => context.keywords.includes('work') || context.keywords.includes('job') || context.keywords.includes('career'),
      responses: [
        "Work-related stress is incredibly common. The pressure to perform and meet expectations can weigh heavily on us.",
        "It's challenging when work affects our well-being. Let's explore what specific aspects of work are causing you the most stress.",
        "Finding balance between work demands and personal well-being is an ongoing process. What boundaries might help you feel more in control?"
      ],
      quickResponses: [
        "I can't focus at work",
        "My workload is too much",
        "I need better work-life balance"
      ]
    },
    {
      condition: (context) => context.keywords.includes('sleep') || context.keywords.includes('tired') || context.keywords.includes('exhausted'),
      responses: [
        "Sleep issues can significantly impact our mental health and daily functioning. You're not alone in struggling with this.",
        "When we're not getting quality rest, everything else becomes more challenging. Let's talk about what might be affecting your sleep.",
        "Exhaustion affects our ability to cope with stress. Taking care of your sleep is an important step in caring for your mental health."
      ],
      quickResponses: [
        "I can't fall asleep",
        "I wake up feeling tired",
        "Stress is keeping me awake"
      ]
    }
  ];

  private defaultResponses = [
    "Thank you for sharing that with me. Your feelings and experiences are important.",
    "I'm here to listen and support you. Would you like to tell me more about what you're experiencing?",
    "It sounds like you're going through something difficult. Remember that seeking support is a sign of strength.",
    "I appreciate you opening up. Sometimes just talking about what we're feeling can be helpful."
  ];

  private greetingResponses = [
    "Hello! I'm here to support you today. How are you feeling right now?",
    "Welcome to your safe space. What would you like to talk about today?",
    "Hi there! I'm glad you're here. What's on your mind?"
  ];

  private keywords = {
    emotions: ['happy', 'sad', 'angry', 'frustrated', 'anxious', 'worried', 'stressed', 'overwhelmed', 'depressed', 'excited', 'nervous', 'scared', 'lonely', 'confused', 'tired', 'exhausted'],
    work: ['work', 'job', 'career', 'boss', 'colleague', 'deadline', 'meeting', 'project', 'office'],
    relationships: ['family', 'friend', 'partner', 'relationship', 'marriage', 'divorce', 'breakup', 'conflict'],
    health: ['sleep', 'eating', 'exercise', 'pain', 'medication', 'therapy', 'counseling'],
    coping: ['help', 'cope', 'manage', 'handle', 'deal', 'support', 'advice', 'technique', 'strategy']
  };

  analyzeMessage(message: string): ConversationContext {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Extract keywords
    const foundKeywords: string[] = [];
    Object.values(this.keywords).flat().forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        foundKeywords.push(keyword);
      }
    });

    // Determine sentiment (simple approach)
    const positiveWords = ['good', 'great', 'happy', 'better', 'helped', 'thankful', 'grateful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'worse', 'hate', 'angry', 'sad', 'depressed', 'anxious', 'worried', 'stressed'];
    
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;
    
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    // Determine topic
    let topic = 'general';
    if (foundKeywords.some(k => this.keywords.work.includes(k))) topic = 'work';
    else if (foundKeywords.some(k => this.keywords.relationships.includes(k))) topic = 'relationships';
    else if (foundKeywords.some(k => this.keywords.health.includes(k))) topic = 'health';
    else if (foundKeywords.some(k => this.keywords.emotions.includes(k))) topic = 'emotions';

    // Determine intensity based on message length and emotional words
    const intensity = Math.min(5, Math.max(1, Math.floor(words.length / 10) + negativeCount));

    return {
      sentiment,
      keywords: foundKeywords,
      topic,
      intensity
    };
  }

  generateResponse(message: string, isFirstMessage: boolean = false): { response: string; quickResponses?: string[] } {
    if (isFirstMessage) {
      return {
        response: this.greetingResponses[Math.floor(Math.random() * this.greetingResponses.length)],
        quickResponses: [
          "I'm feeling overwhelmed",
          "I'd like to talk about my anxiety",
          "I'm having trouble sleeping",
          "Work has been stressful"
        ]
      };
    }

    const context = this.analyzeMessage(message);
    
    // Find matching template
    const matchingTemplate = this.responseTemplates.find(template => 
      template.condition(context)
    );

    if (matchingTemplate) {
      const response = matchingTemplate.responses[
        Math.floor(Math.random() * matchingTemplate.responses.length)
      ];
      return {
        response,
        quickResponses: matchingTemplate.quickResponses
      };
    }

    // Default response
    const response = this.defaultResponses[
      Math.floor(Math.random() * this.defaultResponses.length)
    ];
    
    return {
      response,
      quickResponses: [
        "Can you tell me more?",
        "What would help right now?",
        "I'd like some coping strategies"
      ]
    };
  }

  getCopingStrategies(context: ConversationContext): string[] {
    const strategies = {
      anxiety: [
        "Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8",
        "Practice grounding: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
        "Use progressive muscle relaxation: tense and release each muscle group",
        "Challenge anxious thoughts: ask yourself 'Is this thought helpful? Is it realistic?'"
      ],
      stress: [
        "Take regular breaks throughout your day, even if just for a few minutes",
        "Practice mindful breathing: focus on your breath for 5-10 minutes",
        "Write down your concerns and action steps you can take",
        "Engage in physical activity to release tension"
      ],
      sadness: [
        "Allow yourself to feel the emotion without judgment",
        "Reach out to a trusted friend or family member",
        "Engage in a creative activity like drawing, writing, or music",
        "Practice self-compassion: treat yourself as you would a good friend"
      ]
    };

    if (context.keywords.includes('anxious') || context.keywords.includes('worried')) {
      return strategies.anxiety;
    } else if (context.keywords.includes('stressed') || context.keywords.includes('overwhelmed')) {
      return strategies.stress;
    } else if (context.keywords.includes('sad') || context.keywords.includes('depressed')) {
      return strategies.sadness;
    }

    return [
      "Take slow, deep breaths to center yourself",
      "Practice mindfulness: focus on the present moment",
      "Do something kind for yourself today",
      "Remember that this feeling is temporary and will pass"
    ];
  }
}

export const conversationEngine = new ConversationEngine();
