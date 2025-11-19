import { useState } from "react";
import { Leaf, Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-sage-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-lavender-500 rounded-full flex items-center justify-center shadow-md">
              <Leaf className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-charcoal">InnerGuide Ai</h1>
              <p className="text-sm text-sage-600">Your mental wellness companion</p>
            </div>
          </div>
          <button 
            className="p-2 hover:bg-sage-50 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu"
          >
            <Menu className="text-sage-600" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
