import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Database, 
  Eye, 
  Star, 
  Globe, 
  BarChart3, 
  Zap, 
  ArrowRight, 
  ChevronLeft,
  Play,
  Brain,
  Users,
  Target
} from 'lucide-react';
import OnboardingFlow from './components/OnboardingFlow';
import PersonalizedDashboard from './components/PersonalizedDashboard';

interface AITool {
  name: string;
  category: string;
  marketCap: number;
  change: number;
  users: string;
}

interface UserProfile {
  intent: string;
  challenge: string;
  role: string;
  experience: string;
  budget: string;
  interests: string[];
}

const mockAITools: AITool[] = [
  { name: "ChatGPT", category: "Conversational AI", marketCap: 29000000000, change: 12.5, users: "100M+" },
  { name: "Midjourney", category: "Image Generation", marketCap: 5200000000, change: 8.3, users: "25M+" },
  { name: "Claude", category: "Conversational AI", marketCap: 4100000000, change: 15.7, users: "18M+" },
  { name: "Stable Diffusion", category: "Image Generation", marketCap: 3800000000, change: -2.1, users: "35M+" },
  { name: "GitHub Copilot", category: "Code Assistant", marketCap: 3200000000, change: 6.8, users: "20M+" }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showPersonalizedDashboard, setShowPersonalizedDashboard] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const totalSteps = 6;

  // Check if user has completed onboarding before
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('aimarketcap_onboarding_completed');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
    setShowPersonalizedDashboard(true);
    localStorage.setItem('aimarketcap_onboarding_completed', 'true');
    localStorage.setItem('aimarketcap_user_profile', JSON.stringify(profile));
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('aimarketcap_onboarding_completed', 'true');
  };

  const handleExploreMore = () => {
    setShowPersonalizedDashboard(false);
  };

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

  const addToWatchlist = (toolName: string) => {
    if (!watchlist.includes(toolName)) {
      setWatchlist([...watchlist, toolName]);
    }
  };

  const ProgressBar = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />
    </div>
  );

  const BubbleChart = () => (
    <div className="relative w-full h-64 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl overflow-hidden">
      {mockAITools.map((tool, index) => (
        <div
          key={tool.name}
          className={`absolute rounded-full bg-gradient-to-br from-purple-400 to-blue-500 cursor-pointer transform transition-all duration-300 hover:scale-110 ${
            selectedTool === tool.name 
              ? 'ring-4 ring-yellow-400 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: `${Math.sqrt(tool.marketCap / 100000000) * 2}px`,
            height: `${Math.sqrt(tool.marketCap / 100000000) * 2}px`,
            left: `${15 + index * 18}%`,
            top: `${20 + (index % 2) * 35}%`,
          }}
          onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
        >
          <div className="w-full h-full flex items-center justify-center text-white text-xs font-semibold">
            {tool.name.substring(0, 3)}
          </div>
        </div>
      ))}
      {selectedTool && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          {(() => {
            const tool = mockAITools.find(t => t.name === selectedTool);
            return tool ? (
              <div>
                <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                <p className="text-sm text-gray-600">{tool.category}</p>
                <p className="text-sm font-medium text-green-600">
                  {tool.change > 0 ? '+' : ''}{tool.change}% • {tool.users}
                </p>
              </div>
            ) : null;
          })()}
        </div>
      )}
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                AIMarketCap
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                The ultimate discovery and analytics platform for AI tools, startups, and emerging technologies
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Real-time Rankings</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Interactive Analytics</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Global Traffic Data</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={`${stepClass} max-w-4xl mx-auto`}>
            <div className="text-center mb-8">
              <Database className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Comprehensive AI Tools Directory
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Discover thousands of AI tools ranked by real traffic data and user engagement
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Top AI Tools</h3>
                  <span className="text-sm text-gray-500">Updated live</span>
                </div>
                <div className="space-y-3">
                  {mockAITools.slice(0, 3).map((tool, index) => (
                    <div key={tool.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-800">{tool.name}</h4>
                          <p className="text-sm text-gray-500">{tool.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{tool.users}</p>
                        <p className={`text-sm ${tool.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {tool.change > 0 ? '+' : ''}{tool.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`${stepClass} max-w-4xl mx-auto`}>
            <div className="text-center mb-8">
              <Eye className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Interactive Bubble Visualizations
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Explore AI tools through dynamic bubble charts based on market cap, traffic, and growth
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Market Overview</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Play className="w-4 h-4 mr-1" />
                  Click bubbles to explore
                </div>
              </div>
              <BubbleChart />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Bubble size represents market influence • Color intensity shows growth rate</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`${stepClass} max-w-4xl mx-auto`}>
            <div className="text-center mb-8">
              <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Custom Watchlists & Tracking
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Monitor your favorite AI tools and get notified about trends and updates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Tools</h3>
                <div className="space-y-2">
                  {mockAITools.map((tool) => (
                    <div key={tool.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="font-medium text-gray-700">{tool.name}</span>
                      <button
                        onClick={() => addToWatchlist(tool.name)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          watchlist.includes(tool.name)
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                        disabled={watchlist.includes(tool.name)}
                      >
                        {watchlist.includes(tool.name) ? 'Added' : 'Watch'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Watchlist</h3>
                {watchlist.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Add tools to start tracking</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {watchlist.map((toolName) => {
                      const tool = mockAITools.find(t => t.name === toolName);
                      return tool ? (
                        <div key={toolName} className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                          <span className="font-medium text-gray-700">{tool.name}</span>
                          <span className={`text-sm font-medium ${tool.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {tool.change > 0 ? '+' : ''}{tool.change}%
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`${stepClass} max-w-4xl mx-auto`}>
            <div className="text-center mb-8">
              <Zap className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Real-time Analytics & Insights
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get actionable insights from thousands of data sources updated in real-time
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <TrendingUp className="w-8 h-8 mb-4" />
                <h3 className="text-2xl font-bold mb-2">10,000+</h3>
                <p className="text-purple-100">AI tools tracked</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <Users className="w-8 h-8 mb-4" />
                <h3 className="text-2xl font-bold mb-2">500M+</h3>
                <p className="text-blue-100">Monthly users analyzed</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white">
                <Globe className="w-8 h-8 mb-4" />
                <h3 className="text-2xl font-bold mb-2">24/7</h3>
                <p className="text-teal-100">Real-time monitoring</p>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Market Pulse</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-gray-700">Market Status: Active</span>
                </div>
                <div className="text-sm text-gray-500">Last updated: Just now</div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`${stepClass} text-center max-w-2xl mx-auto`}>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mb-6">
                <ArrowRight className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Ready to Explore?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Join thousands of AI enthusiasts discovering the next big breakthrough in artificial intelligence
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setShowOnboarding(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Personalized Recommendations
              </button>
              
              <button className="w-full bg-white text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all">
                Explore Without Personalization
              </button>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Free to use
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  No signup required
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Real-time data
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show personalized dashboard if user has completed onboarding
  if (showPersonalizedDashboard && userProfile) {
    return (
      <PersonalizedDashboard 
        userProfile={userProfile} 
        onExploreMore={handleExploreMore}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      )}

      <ProgressBar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="min-h-[80vh] flex items-center justify-center">
          {renderStep()}
        </div>
        
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`p-3 rounded-full transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-purple-500 w-8'
                    : index < currentStep
                    ? 'bg-purple-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className={`p-3 rounded-full transition-all ${
              currentStep === totalSteps - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;