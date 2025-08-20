import { useState, useRef, useEffect } from "react";
import { Heart, Smile, Mic, Send, User } from "lucide-react";
import { conversationEngine } from "@/lib/conversationEngine";
import { Message } from "@/types";

interface ChatInterfaceProps {
  initialMood?: string;
}

export default function ChatInterface({ initialMood }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with greeting
    const greeting = conversationEngine.generateResponse("", true);
    const initialMessage: Message = {
      id: '1',
      content: greeting.response,
      sender: 'bot',
      timestamp: new Date(),
      quickResponses: greeting.quickResponses
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    // Add mood-based message if mood is selected
    if (initialMood && messages.length === 1) {
      handleSendMessage(`I'm feeling ${initialMood}`);
    }
  }, [initialMood]);

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = conversationEngine.generateResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        sender: 'bot',
        timestamp: new Date(),
        quickResponses: response.quickResponses
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
        <div className="bg-gradient-to-r from-sage-400 to-sage-500 p-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Heart size={16} />
            </div>
            <div>
              <h3 className="font-medium">Mental Health Assistant</h3>
              <p className="text-sage-100 text-sm">Always here to listen</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-2 py-1 bg-white/20 rounded-full text-xs">
                <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
                Online
              </span>
            </div>
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-sage-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white" size={12} />
                </div>
              )}
              
              <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-2xl p-4 max-w-sm ${
                  message.sender === 'user' 
                    ? 'bg-lavender-400 text-white rounded-tr-md ml-auto' 
                    : 'bg-sage-50 rounded-tl-md'
                }`}>
                  <p className={`leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-charcoal'}`}>
                    {message.content}
                  </p>
                  
                  {message.quickResponses && message.sender === 'bot' && (
                    <div className="mt-3 space-y-2">
                      {message.quickResponses.map((response, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-2 bg-white rounded-lg hover:bg-sage-100 transition-colors text-sm border border-sage-200"
                          onClick={() => handleQuickResponse(response)}
                          data-testid={`button-quick-response-${index}`}
                        >
                          {response}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-sage-500 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-lavender-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={12} />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-sage-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-white" size={12} />
              </div>
              <div className="flex-1">
                <div className="bg-sage-50 rounded-2xl rounded-tl-md p-4 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-sage-100 p-4">
          <div className="flex space-x-3">
            <button className="p-2 text-sage-500 hover:text-sage-600 hover:bg-sage-50 rounded-full transition-colors">
              <Smile size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all"
                data-testid="input-chat-message"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-sage-500 hover:text-sage-600 transition-colors">
                <Mic size={16} />
              </button>
            </div>
            <button
              onClick={() => handleSendMessage()}
              className="px-6 py-3 bg-sage-400 text-white rounded-2xl hover:bg-sage-500 transition-colors font-medium"
              data-testid="button-send-message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
