import { useState } from "react";
import Header from "@/components/Header";
import WelcomeSection from "@/components/WelcomeSection";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";
import CrisisResources from "@/components/CrisisResources";
import { HelpCircle } from "lucide-react";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | undefined>();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  return (
    <div className="bg-cream font-sans text-charcoal min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <WelcomeSection onMoodSelect={handleMoodSelect} />
        
        <div className="grid lg:grid-cols-3 gap-6">
          <ChatInterface initialMood={selectedMood} />
          <Sidebar />
        </div>
        
        <CrisisResources />
      </main>
      
      {/* Floating Action Button for Quick Help */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          className="w-14 h-14 bg-coral-400 hover:bg-coral-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          data-testid="button-quick-help"
        >
          <HelpCircle size={24} />
        </button>
      </div>
    </div>
  );
}
