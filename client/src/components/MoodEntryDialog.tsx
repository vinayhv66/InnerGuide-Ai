import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Smile, Meh, Frown, X } from 'lucide-react';
import { MoodData } from '@/types';
import { moodTracker } from '@/lib/moodTracking';

interface MoodEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mood: MoodData['mood'], notes?: string) => void;
}

export default function MoodEntryDialog({ isOpen, onClose, onSave }: MoodEntryDialogProps) {
  const [selectedMood, setSelectedMood] = useState<MoodData['mood'] | null>(null);
  const [notes, setNotes] = useState('');

  const moodOptions = [
    { value: 'great', label: 'Great', emoji: '😊', color: 'bg-green-400', description: 'Feeling amazing' },
    { value: 'good', label: 'Good', emoji: '🙂', color: 'bg-sage-400', description: 'Feeling positive' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-400', description: 'Feeling neutral' },
    { value: 'low', label: 'Low', emoji: '😔', color: 'bg-orange-400', description: 'Feeling down' },
    { value: 'struggling', label: 'Struggling', emoji: '😰', color: 'bg-red-400', description: 'Having a hard time' }
  ] as const;

  const handleSave = () => {
    if (selectedMood) {
      // Save to local storage
      moodTracker.saveMoodEntry(selectedMood, notes.trim() || undefined);
      
      // Call parent callback
      onSave(selectedMood, notes.trim() || undefined);
      
      // Reset form and close
      setSelectedMood(null);
      setNotes('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedMood(null);
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-charcoal">
            <Heart className="text-coral-500 mr-2" size={20} />
            How are you feeling today?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-charcoal">Your mood</Label>
            <div className="space-y-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value 
                      ? 'border-sage-400 bg-sage-50' 
                      : 'border-gray-200 hover:border-sage-300 bg-white'
                  }`}
                  data-testid={`mood-option-${mood.value}`}
                >
                  <div className={`w-10 h-10 ${mood.color} rounded-full flex items-center justify-center mr-3`}>
                    <span className="text-white text-lg">{mood.emoji}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-charcoal">{mood.label}</p>
                    <p className="text-sm text-sage-600">{mood.description}</p>
                  </div>
                  {selectedMood === mood.value && (
                    <div className="w-6 h-6 bg-sage-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="mood-notes" className="text-sm font-medium text-charcoal">
              Notes (optional)
            </Label>
            <Textarea
              id="mood-notes"
              placeholder="What's on your mind? Any specific thoughts or experiences you'd like to remember about today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
              data-testid="input-mood-notes"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              data-testid="button-cancel-mood"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!selectedMood}
              className="flex-1 bg-sage-500 hover:bg-sage-600"
              data-testid="button-save-mood"
            >
              Save Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}