import { useState } from 'react';
import { 
  Rocket, 
  Brain, 
  Smartphone, 
  Video, 
  Shield, 
  CheckCircle,
  Circle,
  ChevronRight,
  Star,
  Target,
  TrendingUp
} from 'lucide-react';

interface RoadmapPhase {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'planned';
  timeline: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: any;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export default function FutureRoadmap() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  const phases: RoadmapPhase[] = [
    {
      id: 1,
      title: "Current Implementation (MVP)",
      status: 'completed',
      timeline: "Sept 2025 (Current)",
      description: "Solid foundation with React.js + TypeScript + Vite + Tailwind CSS frontend and Firebase serverless backend",
      features: [
        "Frontend: React.js + TypeScript + Vite + Tailwind CSS",
        "Mobile: Progressive Web App (PWA) - Responsive design",
        "Backend: Firebase SDK (Serverless architecture)",
        "Database: Firebase Firestore (NoSQL with Security Rules)",
        "Authentication: Firebase Auth + Google OAuth 2.0",
        "Deployment: Vercel (Frontend) + Firebase (Backend)",
        "Response System: Static mood-based responses"
      ],
      technologies: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Firebase", "Vercel", "PWA"],
      icon: CheckCircle,
      color: "text-green-600 bg-green-50 border-green-200",
      priority: 'high'
    },
    {
      id: 2,
      title: "AI Integration",
      status: 'current',
      timeline: "Next 3-6 months",
      description: "Transform from static responses to intelligent AI-powered mental health support",
      features: [
        "AI & NLP: Google Gemini API integration",
        "Chatbot: 24/7 AI support with personalized recommendations",
        "Analytics: Enhanced mood pattern analysis"
      ],
      technologies: ["Google Gemini API", "Natural Language Processing", "Machine Learning"],
      icon: Brain,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      priority: 'high'
    },
    {
      id: 3,
      title: "Mobile & Telecounseling",
      status: 'planned',
      timeline: "6-12 months",
      description: "Native mobile apps and professional telecounseling platform",
      features: [
        "Mobile: React Native app (iOS/Android)",
        "Video: WebRTC for tele-counseling",
        "Scheduling: Google Calendar API integration",
        "Real-time: Live chat support"
      ],
      technologies: ["React Native", "WebRTC", "Google Calendar API", "Real-time messaging"],
      icon: Smartphone,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      priority: 'high'
    },
    {
      id: 4,
      title: "Enterprise Scale",
      status: 'planned',
      timeline: "1-2 years",
      description: "Microservices architecture with enterprise-grade features and compliance",
      features: [
        "Backend: Node.js microservices + Express",
        "Database: PostgreSQL + MongoDB hybrid",
        "Cloud: AWS Lambda, GCP Functions",
        "AI: Hugging Face Transformers, custom ML models",
        "Compliance: Full HIPAA/GDPR implementation"
      ],
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "AWS Lambda", "GCP", "Hugging Face"],
      icon: Video,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority as keyof typeof colors]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Rocket className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            MindBridge Future Roadmap
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Our strategic roadmap for transforming mental healthcare through technology. 
          From a solid MVP foundation to an enterprise-scale AI-powered wellness platform.
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Overview</h2>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">4 Phases Planned</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <span className="text-green-800 dark:text-green-200 font-medium">Completed</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
              1 Phase
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">MVP Foundation Ready</div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 dark:text-blue-200 font-medium">In Progress</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
              1 Phase
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">AI Integration Starting</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-gray-800 dark:text-gray-200 font-medium">Planned</span>
              <Target className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              2 Phases
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Strategic Roadmap</div>
          </div>
        </div>
      </div>

      {/* Roadmap Phases */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}>
        {phases.map((phase) => {
          const IconComponent = phase.icon;
          const isSelected = selectedPhase === phase.id;
          
          return (
            <div
              key={phase.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border transition-all duration-300 cursor-pointer ${
                isSelected 
                  ? 'ring-2 ring-blue-500 border-blue-300 dark:border-blue-600' 
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
            >
              <div className="p-6">
                {/* Phase Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${phase.color.split(' ').slice(1).join(' ')}`}>
                      <IconComponent className={`w-6 h-6 ${phase.color.split(' ')[0]}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Phase {phase.id}: {phase.title}
                        </h3>
                        {getStatusIcon(phase.status)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {phase.timeline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(phase.priority)}
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </div>

                {/* Phase Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {phase.description}
                </p>

                {/* Expanded Content */}
                {isSelected && (
                  <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 text-center">
        <Rocket className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Building the Future of Mental Healthcare
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Our strategic 4-phase roadmap demonstrates a clear vision for scaling from a solid MVP to an 
          enterprise-grade mental health platform. Each phase builds upon the previous, ensuring sustainable 
          growth and maximum impact for users worldwide.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Production Ready</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span>Scalable Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
}