import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  User, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft,
  X,
  Zap,
  PenTool,
  Cog,
  TrendingUp,
  Code,
  Megaphone,
  Palette,
  GraduationCap,
  Building,
  DollarSign,
  Star,
  Play
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (userData: UserProfile) => void;
  onSkip: () => void;
}

interface UserProfile {
  intent: string;
  challenge: string;
  role: string;
  experience: string;
  budget: string;
  interests: string[];
}

const OnboardingFlow: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<Partial<UserProfile>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const updateUserData = (key: keyof UserProfile, value: string | string[]) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    onComplete(userData as UserProfile);
  };

  const ProgressBar = () => (
    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />
    </div>
  );

  const renderStep = () => {
    const stepClass = `transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`;

    switch (currentStep) {
      case 0:
        return (
          <div className={`${stepClass} text-center max-w-2xl mx-auto`}>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to AIMarketCap!
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Let's find the perfect AI tools for your needs in just 60 seconds
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">What brings you here today?</h3>
              {[
                { id: 'solve-problem', icon: Target, text: "I'm looking for AI tools to solve a specific problem", color: 'purple' },
                { id: 'explore-trending', icon: TrendingUp, text: "I want to explore what's trending in AI", color: 'blue' },
                { id: 'market-research', icon: Brain, text: "I'm researching the AI tools market", color: 'teal' },
                { id: 'browsing', icon: Sparkles, text: "Just browsing and discovering", color: 'pink' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    updateUserData('intent', option.id);
                    nextStep();
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
                    userData.intent === option.id
                      ? `border-${option.color}-500 bg-${option.color}-50`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center">
                    <option.icon className={`w-6 h-6 mr-4 text-${option.color}-500`} />
                    <span className="text-left font-medium text-gray-800">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className={`${stepClass} text-center max-w-2xl mx-auto`}>
            <div className="mb-8">
              <Target className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What's your biggest challenge?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Help us understand what you're trying to accomplish
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'content-creation', icon: PenTool, text: "Creating content faster", desc: "Writing, design, video" },
                { id: 'automation', icon: Cog, text: "Automating repetitive tasks", desc: "Workflows, processes" },
                { id: 'productivity', icon: Zap, text: "Improving productivity", desc: "Time management, efficiency" },
                { id: 'building', icon: Code, text: "Building something new", desc: "Apps, websites, products" },
                { id: 'marketing', icon: Megaphone, text: "Growing my business", desc: "Marketing, sales, analytics" },
                { id: 'learning', icon: GraduationCap, text: "Learning and research", desc: "Education, analysis" }
              ].map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => {
                    updateUserData('challenge', challenge.id);
                    nextStep();
                  }}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg text-left ${
                    userData.challenge === challenge.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <challenge.icon className="w-8 h-8 text-purple-500 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">{challenge.text}</h3>
                  <p className="text-sm text-gray-600">{challenge.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`${stepClass} text-center max-w-2xl mx-auto`}>
            <div className="mb-8">
              <User className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Tell us about yourself
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                This helps us recommend the right tools for your skill level
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">What's your role?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'developer', icon: Code, text: "Developer" },
                    { id: 'marketer', icon: Megaphone, text: "Marketer" },
                    { id: 'designer', icon: Palette, text: "Designer" },
                    { id: 'student', icon: GraduationCap, text: "Student" },
                    { id: 'entrepreneur', icon: Building, text: "Entrepreneur" },
                    { id: 'freelancer', icon: User, text: "Freelancer" },
                    { id: 'researcher', icon: Brain, text: "Researcher" },
                    { id: 'other', icon: Sparkles, text: "Other" }
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => updateUserData('role', role.id)}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        userData.role === role.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <role.icon className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <span className="text-sm font-medium text-gray-800">{role.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">AI Experience Level</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'beginner', text: "New to AI", desc: "Just getting started" },
                    { id: 'intermediate', text: "Some experience", desc: "Used a few AI tools" },
                    { id: 'expert', text: "AI Expert", desc: "Power user" }
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() => updateUserData('experience', level.id)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-center ${
                        userData.experience === level.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-800">{level.text}</h4>
                      <p className="text-sm text-gray-600">{level.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {userData.role && userData.experience && (
                <button
                  onClick={nextStep}
                  className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 transition-all"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`${stepClass} text-center max-w-2xl mx-auto`}>
            <div className="mb-8">
              <DollarSign className="w-16 h-16 text-teal-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What's your budget range?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We'll prioritize tools that fit your budget
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'free', text: "Free tools only", desc: "No monthly costs", color: 'green' },
                { id: 'low', text: "Up to $25/month", desc: "Basic paid plans", color: 'blue' },
                { id: 'medium', text: "Up to $100/month", desc: "Professional plans", color: 'purple' },
                { id: 'high', text: "$100+/month", desc: "Enterprise solutions", color: 'orange' },
                { id: 'flexible', text: "I'm flexible", desc: "Show me everything", color: 'gray' }
              ].map((budget) => (
                <button
                  key={budget.id}
                  onClick={() => {
                    updateUserData('budget', budget.id);
                    nextStep();
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
                    userData.budget === budget.id
                      ? `border-${budget.color}-500 bg-${budget.color}-50`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{budget.text}</h3>
                      <p className="text-sm text-gray-600">{budget.desc}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-${budget.color}-500`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`${stepClass} text-center max-w-3xl mx-auto`}>
            <div className="mb-8">
              <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Perfect! Here's what we found for you
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Based on your preferences, these AI tools are tailored just for you
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "ChatGPT", category: "Conversational AI", match: "95%", reason: "Perfect for content creation", price: "Free + $20/mo" },
                  { name: "Notion AI", category: "Productivity", match: "92%", reason: "Great for workflow automation", price: "Free + $10/mo" },
                  { name: "Canva AI", category: "Design", match: "88%", reason: "Easy visual content creation", price: "Free + $15/mo" },
                  { name: "GitHub Copilot", category: "Code Assistant", match: "85%", reason: "Boosts development speed", price: "$10/mo" }
                ].map((tool, index) => (
                  <div key={tool.name} className="p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{tool.name}</h3>
                      <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {tool.match} match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tool.category}</p>
                    <p className="text-sm text-purple-600 mb-2">{tool.reason}</p>
                    <p className="text-sm font-medium text-gray-700">{tool.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Explore Your Personalized Dashboard
                </div>
              </button>
              
              <p className="text-sm text-gray-500">
                Want to explore more categories? You can always browse our full interactive map later!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ProgressBar />

          {/* Content */}
          <div className="min-h-[400px] flex items-center justify-center">
            {renderStep()}
          </div>

          {/* Navigation */}
          {currentStep > 0 && currentStep < totalSteps - 1 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              
              <button
                onClick={onSkip}
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;