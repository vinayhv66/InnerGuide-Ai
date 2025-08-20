import { Shield, AlertTriangle, Info, Phone, MessageSquare, UserCheck, Building2, Lock } from "lucide-react";

export default function CrisisResources() {
  return (
    <section className="mt-8">
      <div className="bg-gradient-to-r from-coral-50 to-coral-100 rounded-2xl p-6 border border-coral-200">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-coral-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="text-white" size={24} />
          </div>
          <h3 className="font-semibold text-charcoal mb-2">Important Information</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium text-charcoal mb-3 flex items-center">
              <AlertTriangle className="text-coral-500 mr-2" size={20} />
              Crisis Support
            </h4>
            <p className="text-sm text-sage-600 mb-3">
              If you're having thoughts of self-harm or suicide, please reach out immediately:
            </p>
            <div className="space-y-2">
              <a 
                href="tel:988" 
                className="flex items-center p-2 bg-coral-50 rounded-lg hover:bg-coral-100 transition-colors"
                data-testid="link-crisis-phone"
              >
                <Phone className="text-coral-500 mr-2" size={16} />
                <span className="text-sm font-medium">988 - Suicide & Crisis Lifeline</span>
              </a>
              <a 
                href="sms:741741" 
                className="flex items-center p-2 bg-coral-50 rounded-lg hover:bg-coral-100 transition-colors"
                data-testid="link-crisis-text"
              >
                <MessageSquare className="text-coral-500 mr-2" size={16} />
                <span className="text-sm font-medium">Text HOME to 741741 - Crisis Text Line</span>
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium text-charcoal mb-3 flex items-center">
              <Info className="text-sage-500 mr-2" size={20} />
              Professional Care
            </h4>
            <p className="text-sm text-sage-600 mb-3">
              This chatbot provides supportive conversation but is not a replacement for professional mental health care.
            </p>
            <div className="space-y-2">
              <button 
                className="w-full flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                data-testid="button-find-therapist"
              >
                <UserCheck className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">Find a Therapist</span>
              </button>
              <button 
                className="w-full flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                data-testid="button-mental-health-resources"
              >
                <Building2 className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">Mental Health Resources</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-4 p-4 bg-white rounded-xl">
          <h4 className="font-medium text-charcoal mb-2 flex items-center">
            <Lock className="text-sage-500 mr-2" size={20} />
            Your Privacy is Protected
          </h4>
          <p className="text-sm text-sage-600">
            All conversations are processed locally on your device. No personal information is shared with external servers. 
            Your data remains private and secure.
          </p>
        </div>
      </div>
    </section>
  );
}
