import React, { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ExternalLink, 
  Heart,
  Filter,
  Search,
  ArrowRight,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

interface UserProfile {
  intent: string;
  challenge: string;
  role: string;
  experience: string;
  budget: string;
  interests: string[];
}

interface PersonalizedDashboardProps {
  userProfile: UserProfile;
  onExploreMore: () => void;
}

interface AITool {
  name: string;
  category: string;
  description: string;
  matchScore: number;
  matchReason: string;
  pricing: string;
  users: string;
  growth: number;
  rating: number;
  tags: string[];
  isBookmarked: boolean;
}

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({ userProfile, onExploreMore }) => {
  const [bookmarkedTools, setBookmarkedTools] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock personalized recommendations based on user profile
  const getPersonalizedTools = (): AITool[] => {
    const baseTools: AITool[] = [
      {
        name: "ChatGPT",
        category: "Conversational AI",
        description: "Advanced AI assistant for writing, coding, and creative tasks",
        matchScore: 95,
        matchReason: "Perfect for content creation and productivity",
        pricing: "Free + $20/mo",
        users: "100M+",
        growth: 12.5,
        rating: 4.8,
        tags: ["writing", "coding", "creative"],
        isBookmarked: false
      },
      {
        name: "Notion AI",
        category: "Productivity",
        description: "AI-powered workspace for notes, docs, and project management",
        matchScore: 92,
        matchReason: "Great for workflow automation and organization",
        pricing: "Free + $10/mo",
        users: "30M+",
        growth: 8.3,
        rating: 4.6,
        tags: ["productivity", "organization", "collaboration"],
        isBookmarked: false
      },
      {
        name: "Midjourney",
        category: "Image Generation",
        description: "AI art generator for stunning visual content",
        matchScore: 88,
        matchReason: "Excellent for visual content creation",
        pricing: "$10-60/mo",
        users: "25M+",
        growth: 15.7,
        rating: 4.7,
        tags: ["design", "art", "visual"],
        isBookmarked: false
      },
      {
        name: "GitHub Copilot",
        category: "Code Assistant",
        description: "AI pair programmer that helps you write code faster",
        matchScore: 85,
        matchReason: "Boosts development productivity significantly",
        pricing: "$10/mo",
        users: "20M+",
        growth: 6.8,
        rating: 4.5,
        tags: ["coding", "development", "automation"],
        isBookmarked: false
      },
      {
        name: "Grammarly",
        category: "Writing Assistant",
        description: "AI writing assistant for grammar, style, and tone",
        matchScore: 82,
        matchReason: "Essential for professional communication",
        pricing: "Free + $12/mo",
        users: "30M+",
        growth: 4.2,
        rating: 4.4,
        tags: ["writing", "editing", "communication"],
        isBookmarked: false
      },
      {
        name: "Canva AI",
        category: "Design",
        description: "AI-powered design platform for graphics and presentations",
        matchScore: 80,
        matchReason: "Easy visual content creation for non-designers",
        pricing: "Free + $15/mo",
        users: "135M+",
        growth: 9.1,
        rating: 4.6,
        tags: ["design", "graphics", "presentations"],
        isBookmarked: false
      }
    ];

    // Adjust match scores based on user profile
    return baseTools.map(tool => ({
      ...tool,
      isBookmarked: bookmarkedTools.includes(tool.name)
    })).sort((a, b) => b.matchScore - a.matchScore);
  };

  const toggleBookmark = (toolName: string) => {
    setBookmarkedTools(prev => 
      prev.includes(toolName) 
        ? prev.filter(name => name !== toolName)
        : [...prev, toolName]
    );
  };

  const personalizedTools = getPersonalizedTools();
  const categories = ['all', ...Array.from(new Set(personalizedTools.map(tool => tool.category)))];

  const filteredTools = personalizedTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getUserInsight = () => {
    const insights = {
      'solve-problem': 'problem-solving',
      'explore-trending': 'trend exploration',
      'market-research': 'market research',
      'browsing': 'discovery'
    };
    return insights[userProfile.intent as keyof typeof insights] || 'AI exploration';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your AI Toolkit
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Personalized recommendations for {getUserInsight()} • {userProfile.role} • {userProfile.experience} level
              </p>
            </div>
            <button
              onClick={onExploreMore}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Full Map
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{personalizedTools.length}</p>
                  <p className="text-sm text-gray-600">Matched Tools</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{bookmarkedTools.length}</p>
                  <p className="text-sm text-gray-600">Bookmarked</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(personalizedTools.reduce((acc, tool) => acc + tool.matchScore, 0) / personalizedTools.length)}%
                  </p>
                  <p className="text-sm text-gray-600">Avg Match</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center">
                <Zap className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {categories.length - 1}
                  </p>
                  <p className="text-sm text-gray-600">Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.name} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800 mr-2">{tool.name}</h3>
                      <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {tool.matchScore}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{tool.category}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(tool.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(tool.name)}
                    className={`p-2 rounded-full transition-all ${
                      tool.isBookmarked 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${tool.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 line-clamp-2">{tool.description}</p>

                {/* Match Reason */}
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-700 font-medium">
                    Why it's perfect for you: {tool.matchReason}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{tool.users}</p>
                    <p className="text-xs text-gray-500">Users</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">+{tool.growth}%</p>
                    <p className="text-xs text-gray-500">Growth</p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{tool.pricing}</p>
                    <p className="text-xs text-gray-500">Pricing</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all group-hover:shadow-lg flex items-center justify-center">
                  <span>Try {tool.name}</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow-lg p-8">
          <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Want to discover more AI tools?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our interactive bubble chart with thousands of AI tools across all categories
          </p>
          <button
            onClick={onExploreMore}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center mx-auto"
          >
            <span>Explore Full AIMarketCap</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;