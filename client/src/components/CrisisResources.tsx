import { Shield, AlertTriangle, Info, Phone, MessageSquare, UserCheck, Building2, Lock } from "lucide-react";

export default function CrisisResources() {
  return (
    <section className="mt-8">
      <div className="bg-gradient-to-r from-sage-50 to-lavender-50 rounded-2xl p-6 border border-sage-200 shadow-sm">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <Shield className="text-white" size={24} />
          </div>
          <h3 className="font-semibold text-charcoal mb-2">Important Information</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 border border-sage-100">
            <h4 className="font-medium text-charcoal mb-3 flex items-center">
              <AlertTriangle className="text-sage-500 mr-2" size={20} />
              Crisis Support
            </h4>
            <p className="text-sm text-sage-600 mb-3">
              If you're having thoughts of self-harm or suicide, please reach out immediately:
            </p>
            <div className="space-y-2">
              <a 
                href="tel:+18005990019" 
                className="flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors border border-sage-200"
                data-testid="link-crisis-phone-kiran"
              >
                <Phone className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">1800-599-0019 - KIRAN Mental Health</span>
              </a>
              <a 
                href="tel:+919999666555" 
                className="flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors border border-sage-200"
                data-testid="link-crisis-phone-vandrevala"
              >
                <Phone className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">+91 9999 666 555 - Vandrevala Foundation</span>
              </a>
              <a 
                href="tel:+914424640050" 
                className="flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors border border-sage-200"
                data-testid="link-crisis-phone-sneha"
              >
                <Phone className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">+91 44 2464 0050 - Sneha India</span>
              </a>
              <a 
                href="tel:+919152987821" 
                className="flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors border border-sage-200"
                data-testid="link-crisis-phone-icall"
              >
                <Phone className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">+91 9152 987 821 - iCall Mumbai</span>
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
              <a 
                href="https://www.practo.com/counselling"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                data-testid="link-find-therapist-practo"
              >
                <UserCheck className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">Find Therapist - Practo</span>
              </a>
              <a 
                href="https://www.1to1help.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                data-testid="link-online-therapy-1to1"
              >
                <Building2 className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">1to1Help - Online Therapy</span>
              </a>
              <a 
                href="https://manasthali.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                data-testid="link-manasthali"
              >
                <UserCheck className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">Manasthali - Mental Health</span>
              </a>
              <a 
                href="https://www.betterhelp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center p-2 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
                data-testid="link-betterhelp"
              >
                <Building2 className="text-sage-500 mr-2" size={16} />
                <span className="text-sm font-medium">BetterHelp - Online Counseling</span>
              </a>
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
