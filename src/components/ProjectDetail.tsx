import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Search, 
  Settings, 
  Download, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Paperclip,
  BarChart3,
  TrendingUp,
  Activity,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Eye,
  Edit3,
  Filter,
  Layers,
  Target,
  Users,
  Calendar,
  AlertTriangle,
  Shield,
  Zap,
  Globe,
  BookOpen,
  HelpCircle,
  Lock,
  Unlock,
  Star,
  Tag,
  Share,
  ExternalLink,
  Copy,
  Sparkles,
  Brain,
  Lightbulb,
  Gauge,
  Award,
  Rocket,
  Wand2,
  Cpu,
  Database,
  Network,
  Layers3,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap as Lightning,
  Plus
} from 'lucide-react';
import { Project } from '../types';
import { useAuth } from '../hooks/useAuth';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

interface DocumentUpload {
  id: string;
  name: string;
  size: number;
  status: 'completed' | 'uploading' | 'failed';
  progress?: number;
  uploadedAt: Date;
}

interface RecentAnalysis {
  id: string;
  name: string;
  status: 'completed' | 'processing';
  timeAgo: string;
}

interface ClassificationItem {
  id: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  items: string[];
  confidence: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
}

interface ClassifiedDocument {
  id: string;
  name: string;
  summary: string;
  confidence: number;
  classifications: ClassificationItem[];
  extractedAt: Date;
  processingTime: number;
  totalInsights: number;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);

  const [recentAnalyses] = useState<RecentAnalysis[]>([
    { id: '1', name: 'Financial Report Q4', status: 'completed', timeAgo: '2 hours ago' },
    { id: '2', name: 'Policy Document', status: 'processing', timeAgo: '30 min ago' },
    { id: '3', name: 'Project Plan v2.1', status: 'completed', timeAgo: '1 day ago' }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string>('1');
  const [activeFilter, setActiveFilter] = useState('All Insights');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const uploadTimers = useRef<{ [key: string]: number }>({});

  // Mock classification data with enhanced properties
  const [classifiedDocuments] = useState<ClassifiedDocument[]>([
    {
      id: '1',
      name: 'Short SOW.pdf',
      summary: 'The project focuses on developing an AI-driven reconciliation application designed to automate financial reconciliation tasks between corporate and customer Statements of Account (SOAs), thereby addressing the inefficiencies and errors inherent in manual processes. This web-based platform caters to both users and administrators, offering features such as user sign-in and authentication, a dashboard for monitoring reconciled jobs and discrepancies, and user management with role-based access control.',
      confidence: 94,
      extractedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      processingTime: 2.3,
      totalInsights: 47,
      classifications: [
        {
          id: 'functional',
          category: 'Functional Requirement',
          icon: Zap,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          confidence: 96,
          priority: 'high',
          trend: 'up',
          description: 'Core system functionalities and features that define what the system should do',
          items: [
            'User login and authentication system with multi-factor support',
            'Real-time dashboard for monitoring reconciliation jobs and progress',
            'Advanced document upload and parsing capabilities with OCR',
            'Intelligent reconciliation query selector with 16+ predefined queries',
            'Batch processing engine with multi-select options and scheduling',
            'Comprehensive tools for viewing and managing reconciliation results',
            'Role-based access control with granular permissions',
            'Automated notification system for job completion and errors'
          ]
        },
        {
          id: 'constraint',
          category: 'System Constraints',
          icon: Lock,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          confidence: 85,
          priority: 'high',
          trend: 'stable',
          description: 'Technical and business limitations that constrain system design and implementation',
          items: [
            'Limited to PDF, DOCX, and XLSX file formats for processing',
            'Requires AWS infrastructure for deployment and scaling',
            'Dependent on third-party OCR services (Textract, Google Vision)',
            'Static FAQ and AI chat widget with predefined responses',
            'Maximum file size limit of 50MB per document',
            'Processing capacity limited to 1000 documents per hour'
          ]
        },
        {
          id: 'non-functional',
          category: 'Non-Functional Requirement',
          icon: Shield,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          confidence: 88,
          priority: 'medium',
          trend: 'up',
          description: 'Quality attributes and performance criteria that define how the system should behave',
          items: [
            'Enterprise-grade role-based access control with audit trails',
            'Advanced OCR and NLP technology integration for accuracy',
            'Multi-cloud support: AWS Textract, Google Vision, Tesseract',
            'Comprehensive file format support with validation',
            'Containerized deployment with Docker and Kubernetes',
            'High-performance FastAPI framework with async processing',
            '99.9% uptime SLA with automated failover',
            'Sub-second response times for dashboard queries'
          ]
        },
        {
          id: 'risk',
          category: 'Risk Assessment',
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          confidence: 78,
          priority: 'high',
          trend: 'down',
          description: 'Potential challenges, threats, and mitigation strategies for project success',
          items: [
            'OCR accuracy variations with poor document quality and handwriting',
            'Third-party service availability and API rate limiting dependencies',
            'Data security and privacy compliance (GDPR, HIPAA) requirements',
            'Integration complexity with legacy enterprise systems',
            'Scalability challenges during peak processing periods',
            'Potential data loss during system failures or outages'
          ]
        },
        {
          id: 'persona',
          category: 'User Personas',
          icon: Users,
          color: 'text-cyan-600',
          bgColor: 'bg-cyan-50',
          confidence: 92,
          priority: 'medium',
          trend: 'stable',
          description: 'Target user groups and stakeholders who will interact with the system',
          items: [
            'Financial analysts and reconciliation specialists (primary users)',
            'System administrators with role management and configuration needs',
            'Business users requiring dashboard insights and reporting',
            'IT support teams for system maintenance and troubleshooting',
            'Compliance officers monitoring audit trails and data access',
            'Executive stakeholders reviewing performance metrics'
          ]
        },
        {
          id: 'deliverable',
          category: 'Project Deliverables',
          icon: Target,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          confidence: 91,
          priority: 'high',
          trend: 'up',
          description: 'Expected outputs, artifacts, and project outcomes to be delivered',
          items: [
            'Fully functional web-based reconciliation application with UI/UX',
            'Secure user authentication and comprehensive role management system',
            'AI-powered document processing and analysis capabilities',
            'Interactive dashboard with real-time insights and metrics',
            'Complete deployment documentation and infrastructure guides',
            'User training materials and comprehensive system documentation',
            'API documentation and integration guides for third-party systems'
          ]
        },
        {
          id: 'platform',
          category: 'Technology Platform',
          icon: Globe,
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          confidence: 95,
          priority: 'medium',
          trend: 'up',
          description: 'Technology stack, infrastructure, and platform components',
          items: [
            'Modern web-based platform architecture with microservices',
            'React.js frontend with TypeScript and modern UI frameworks',
            'Advanced OpenCV integration for image preprocessing',
            'Cutting-edge Agentic OCR, Docling, and Marker PDF processing',
            'Hugging Face Transformers for state-of-the-art NLP',
            'Hybrid rule-based logic and LLM-assisted intelligent analyses',
            'Cloud-native deployment with auto-scaling capabilities'
          ]
        },
        {
          id: 'business-objective',
          category: 'Business Objectives',
          icon: Star,
          color: 'text-pink-600',
          bgColor: 'bg-pink-50',
          confidence: 93,
          priority: 'high',
          trend: 'up',
          description: 'Strategic business goals and expected value proposition',
          items: [
            'Automate 90% of manual financial reconciliation processes',
            'Reduce processing errors by 85% through intelligent automation',
            'Improve processing speed by 10x with parallel processing',
            'Enable seamless collaboration through role-based access',
            'Provide actionable insights through advanced analytics dashboard',
            'Achieve ROI of 300% within first year of implementation',
            'Establish foundation for future AI-driven financial operations'
          ]
        }
      ]
    }
  ]);

  // Add state for classification API data
  const [classificationData, setClassificationData] = useState<{ insights: any, summary: string, narrative?: string } | null>(null);
  const [loadingClassification, setLoadingClassification] = useState(false);
  const [classificationError, setClassificationError] = useState<string | null>(null);

  const tabs = [
    { id: 'upload', label: 'Document Upload', icon: Upload },
    { id: 'classification', label: 'Classification', icon: FileText },
    { id: 'flow-mapping', label: 'Flow Mapping', icon: Activity },
    { id: 'modules', label: 'Module Generation', icon: Settings },
    { id: 'features', label: 'Features', icon: BarChart3 },
    { id: 'gap-analysis', label: 'Gap Analysis', icon: TrendingUp }
  ];

  const filterOptions = [
    'All Insights',
    'Functional',
    'Non-Functional',
    'Risks & Constraints',
    'Other Categories'
  ];

  // Animation effects
  useEffect(() => {
    if (activeTab === 'classification') {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const selectedDoc = classifiedDocuments.find(doc => doc.id === selectedDocument);

  // Fetch classification data when tab or selectedDoc changes
  useEffect(() => {
    if (activeTab === 'classification' && selectedDoc) {
      setLoadingClassification(true);
      setClassificationError(null);
      setClassificationData(null);
      const fileBase = selectedDoc.name.replace(/\.[^/.]+$/, '');
      fetch(`http://127.0.0.1:8000/get-info/${encodeURIComponent(fileBase)}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch classification data');
          return res.json();
        })
        .then(data => setClassificationData(data))
        .catch(err => setClassificationError(err.message))
        .finally(() => setLoadingClassification(false));
    }
  }, [activeTab, selectedDoc]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleRemoveUpload = (uploadId: string) => {
    setUploads(prevUploads => prevUploads.filter(upload => upload.id !== uploadId));
  };

  const handleRetryUpload = (uploadId: string) => {
    setUploads(prevUploads => 
      prevUploads.map(upload => 
        upload.id === uploadId 
          ? { ...upload, status: 'uploading' as const, progress: 0 }
          : upload
      )
    );
    
    // Simulate retry upload progress
    const interval = setInterval(() => {
      setUploads(prevUploads => {
        const upload = prevUploads.find(u => u.id === uploadId);
        if (!upload || upload.status !== 'uploading') {
          clearInterval(interval);
          return prevUploads;
        }
        
        const newProgress = (upload.progress || 0) + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return prevUploads.map(u => 
            u.id === uploadId 
              ? { ...u, status: 'completed' as const, progress: 100 }
              : u
          );
        }
        
        return prevUploads.map(u => 
          u.id === uploadId 
            ? { ...u, progress: Math.min(Math.round(newProgress), 100) }
            : u
        );
      });
    }, 500);
  };

  // Helper to add a new upload entry
  const addUpload = (file: File) => {
    const newUpload: DocumentUpload = {
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 1,
      uploadedAt: new Date(),
    };
    setUploads((prev) => [newUpload, ...prev]);
    return newUpload.id;
  };

  // Helper to handle file upload and update status
  const handleFileUpload = async (file: File) => {
    const uploadId = addUpload(file);

    // Simulate progress
    let progress = 1;
    uploadTimers.current[uploadId] = setInterval(() => {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId && u.status === 'uploading'
            ? {
                ...u,
                progress: progress < 90 ? (progress += Math.random() * 5) : 90,
              }
            : u
        )
      );
    }, 200);

    try {
      await uploadDocument(file);
      clearInterval(uploadTimers.current[uploadId]);
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId
            ? { ...u, status: 'completed', progress: 100 }
            : u
        )
      );
    } catch (error) {
      clearInterval(uploadTimers.current[uploadId]);
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId
            ? { ...u, status: 'failed', progress: 0 }
            : u
        )
      );
      console.error(error);
    }
  };

  // Update handleFileSelect to use handleFileUpload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(handleFileUpload);
    }
  };

  // Restore handleDrag for drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Update handleDrop to use handleFileUpload
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(handleFileUpload);
    }
  }, []);

  const getStatusIcon = (status: DocumentUpload['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'uploading':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (upload: DocumentUpload) => {
    switch (upload.status) {
      case 'completed':
        return 'Completed';
      case 'uploading':
        return `Uploading (${Math.round(typeof upload.progress === 'number' ? upload.progress : 1)}%)`;
      case 'failed':
        return 'Upload Failed (Network Error)';
    }
  };

  const hasCompletedUploads = uploads.some(upload => upload.status === 'completed');
  const completedUploadsCount = uploads.filter(upload => upload.status === 'completed').length;

  const handleProceedToClassification = () => {
    setActiveTab('classification');
  };

  const getFilteredClassifications = () => {
    if (!selectedDoc) return [];
    
    let filtered = selectedDoc.classifications;
    
    // Apply category filter
    if (activeFilter !== 'All Insights') {
      switch (activeFilter) {
        case 'Functional':
          filtered = filtered.filter(c => c.id === 'functional');
          break;
        case 'Non-Functional':
          filtered = filtered.filter(c => c.id === 'non-functional');
          break;
        case 'Risks & Constraints':
          filtered = filtered.filter(c => ['risk', 'constraint'].includes(c.id));
          break;
        case 'Other Categories':
          filtered = filtered.filter(c => !['functional', 'non-functional', 'risk', 'constraint'].includes(c.id));
          break;
      }
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(classification => 
        classification.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classification.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      case 'stable':
        return <div className="w-3 h-0.5 bg-gray-400 rounded" />;
      default:
        return null;
    }
  };

  // Add state for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const toggleExpand = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) newSet.delete(category); else newSet.add(category);
      return newSet;
    });
  };

  const renderClassificationTab = () => {
    // Use classificationData from API
    if (loadingClassification) {
      return (
        <div className="flex items-center justify-center min-h-[40vh]">
          <span className="text-lg text-blue-600 animate-pulse">Loading classification insights...</span>
        </div>
      );
    }
    if (classificationError) {
      return (
        <div className="flex items-center justify-center min-h-[40vh]">
          <span className="text-lg text-red-600">{classificationError}</span>
        </div>
      );
    }
    if (!classificationData) {
      return null;
    }
    const insights = classificationData.insights || {};
    const summary = classificationData.summary || '';
    // Convert insights object to array for grid
    const categories = Object.entries(insights)
      .filter(([_, items]) => Array.isArray(items) && items.length > 0)
      .map(([category, items]) => ({ category, items: items as string[] }));
    return (
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">AI Classification Insights</h1>
              <p className="text-sm text-gray-600">
                File: <span className="font-medium text-blue-600">{selectedDoc?.name || 'N/A'}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-2 md:mt-0">
            <button className="border border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 text-sm bg-white hover:bg-gray-50 font-medium shadow-sm">
              <Download className="h-4 w-4" /> Export Report
            </button>
            <button className="border border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 text-sm bg-white hover:bg-gray-50 font-medium shadow-sm">
              <Share className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
        {/* Document Overview */}
        <div className="bg-stale rounded-2xl shadow border border-blue-100">
          <div className="flex items-center gap-3 p-6 border-b border-blue-100">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Document Overview</span>
          </div>
          <div className="p-6">
            <p className="text-gray-800 leading-relaxed text-s">{summary || 'No summary available.'}</p>
          </div>
        </div>
        {/* Key Insights Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Key Insights & Data Points</h2>
              <p className="text-sm text-gray-600">Categorized findings from the document analysis.</p>
            </div>
          </div>
          {/* Insights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(({ category, items }) => {
              const isExpanded = expandedCategories.has(category);
              return (
                <div key={category} className="border-l-4 rounded-2xl p-5 bg-white shadow hover:shadow-lg transition-shadow border-blue-400 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50">
                      <Layers3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base">{category}</h3>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-gray-600 mb-2">
                    {(isExpanded ? items : items.slice(0, 3)).map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  {items.length > 3 && (
                    <button
                      onClick={() => toggleExpand(category)}
                      className="text-xs text-blue-600 hover:underline mb-2 focus:outline-none self-start"
                    >
                      {isExpanded ? 'Show less' : `Show ${items.length - 3} more`}
                    </button>
                  )}
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderFlowMappingTab = () => {
    // Mock data for flows and metrics
    const flows = [
      {
        id: 1,
        persona: 'Admin User',
        platform: 'Web',
        status: 'active',
        description: 'Administrative workflow for web platform management and user oversight',
        actions: ['User management', 'System configuration', 'Analytics dashboard', '+1 more'],
      },
      {
        id: 2,
        persona: 'End User',
        platform: 'Web',
        status: 'active',
        description: 'Standard user experience flow for web platform interaction',
        actions: ['Account registration', 'Profile setup', 'Content consumption', '+1 more'],
      },
    ];
    const metrics = {
      totalFlows: 2,
      keyActions: 8,
      platformDistribution: { Web: 2 },
      personaTypes: { 'Admin User': 1, 'End User': 1 },
      flowStatus: { Active: 2 },
    };
    return (
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 py-8 px-2 sm:px-6">
        {/* Left main content */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 flex-1 max-w-full md:max-w-3xl flex flex-col">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Flow Mapping for <span className="italic">SOW.pdf</span>
            </h1>
            <button
              type="button"
              className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded px-3 py-1.5"
            >
              <Plus className="w-4 h-4" />
              Manage Flows
            </button>
          </header>
          <p className="text-sm text-gray-700 mb-4">Persona-Platform Flows</p>
          {/* Flow cards */}
          {flows.map(flow => (
            <article key={flow.id} className="border border-gray-200 rounded-md p-4 mb-4 text-gray-700 text-sm">
              <header className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-900">{flow.persona} - {flow.platform}</h2>
                <span className="bg-green-100 text-green-700 text-[10px] font-semibold rounded-full px-2 py-0.5">{flow.status}</span>
              </header>
              <p className="mb-2 text-xs text-gray-600">{flow.description}</p>
              <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-600">
                <span>
                  Platform:
                  <span className="bg-gray-200 text-gray-800 font-semibold rounded px-1.5 py-0.5 ml-1">{flow.platform}</span>
                </span>
                <span>
                  Persona:
                  <span className="bg-gray-200 text-gray-800 font-semibold rounded px-1.5 py-0.5 ml-1">{flow.persona}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {flow.actions.map((action, idx) => (
                  <span key={idx} className={action.includes('+')
                    ? 'bg-gray-200 text-gray-600 text-xs font-semibold rounded px-2 py-0.5'
                    : 'bg-blue-200 text-blue-700 text-xs font-semibold rounded px-2 py-0.5'}>
                    {action}
                  </span>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button aria-label={`Edit ${flow.persona} - ${flow.platform} flow`} className="text-gray-600 hover:text-gray-900">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button aria-label={`Delete ${flow.persona} - ${flow.platform} flow`} className="text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
          <hr className="border-gray-200 my-4" />
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-md text-gray-700 text-xs font-semibold py-2 px-3 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download Flows (JSON)
          </button>
        </section>
        {/* Right sidebar */}
        <aside className="flex flex-col gap-6 w-full max-w-sm">
          {/* Add New Flow */}
          <section className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-gray-900 text-sm">Add New Flow</h2>
            <p className="text-xs text-gray-600">Fill in the details to create a new flow.</p>
            <button
              type="button"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md py-2 px-4 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Flow
            </button>
          </section>
          {/* Flow Insights */}
          <section className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-4 text-gray-900 text-sm">
            <h3 className="font-semibold text-gray-900 text-sm">Flow Insights</h3>
            <p className="text-xs text-gray-700">Key metrics from your flow analysis</p>
            <div className="flex gap-3">
              <div className="flex flex-col items-center justify-center bg-blue-100 rounded-md w-20 h-16">
                <span className="text-blue-700 font-bold text-lg leading-none">{metrics.totalFlows}</span>
                <span className="text-xs text-blue-700">Total Flows</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-green-100 rounded-md w-20 h-16">
                <span className="text-green-700 font-bold text-lg leading-none">{metrics.keyActions}</span>
                <span className="text-xs text-green-700">Key Actions</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs mb-1">Platform Distribution</p>
              {Object.entries(metrics.platformDistribution).map(([platform, count]) => (
                <div key={platform} className="flex justify-between text-xs text-gray-600">
                  <span>{platform}</span>
                  <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 font-semibold">{count}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs mb-1">Persona Types</p>
              {Object.entries(metrics.personaTypes).map(([persona, count]) => (
                <div key={persona} className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>{persona}</span>
                  <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 font-semibold">{count}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs mb-1">Flow Status</p>
              {Object.entries(metrics.flowStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between text-xs text-gray-600">
                  <span>{status}</span>
                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-semibold">{count}</span>
                </div>
              ))}
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="font-semibold text-gray-900 text-xs mb-1">Quick Actions</p>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                <li>Export flows as JSON</li>
                <li>Generate flow diagrams</li>
                <li>Analyze flow complexity</li>
                <li>Create flow templates</li>
              </ul>
            </div>
          </section>
        </aside>
      </main>
    );
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.values(uploadTimers.current).forEach(clearInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
                <img 
                  src="/logo.jpeg" 
                  alt="AppInventiv Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">DocFlow AI</h1>
                <p className="text-sm text-gray-600">{project.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Welcome, {user?.name || 'User'}!
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'classification' ? renderClassificationTab() : activeTab === 'flow-mapping' ? renderFlowMappingTab() : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Empower Your Workflow <span className="text-blue-600">with Smart</span>
                  <br />
                  Document Processing
                </h2>
                <p className="text-gray-600 mb-8 max-w-lg">
                  Seamlessly upload, analyze, and manage your business documents with our AI-powered platform.
                </p>

                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag & Drop or Select Documents
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Effortlessly upload your business documents: PDF, DOCX, XLSX, and more supported.
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                    />
                    <span className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center gap-2">
                      <Paperclip className="w-4 h-4" />
                      Choose Files
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    Max file size: 10MB. For larger files, consider bulk upload.
                  </p>
                </div>
              </div>

              {/* Current Uploads */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Current Uploads</h3>
                  {hasCompletedUploads && (
                    <button
                      onClick={handleProceedToClassification}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all flex items-center gap-2 font-medium text-sm transform hover:scale-105"
                    >
                      Proceed to Classification
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {hasCompletedUploads && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">
                        {completedUploadsCount} document{completedUploadsCount > 1 ? 's' : ''} ready for classification
                      </p>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Your documents have been successfully uploaded and are ready for the next step.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {uploads.map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(upload.status)}
                        <div>
                          <p className="font-medium text-gray-900">{upload.name}</p>
                          <p className="text-sm text-gray-600">
                            {formatFileSize(upload.size)} • {getStatusText(upload)}
                          </p>
                          {upload.status === 'uploading' && (
                            <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${Math.round(typeof upload.progress === 'number' ? upload.progress : 1)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {upload.status === 'failed' && (
                          <button 
                            onClick={() => handleRetryUpload(upload.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Retry upload"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleRemoveUpload(upload.id)}
                          className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Remove upload"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {uploads.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No uploads yet. Start by uploading your first document.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Upload className="w-6 h-6 text-blue-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900 text-sm">Bulk Upload</p>
                      <p className="text-xs text-gray-600">Upload multiple files at once</p>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Search className="w-6 h-6 text-green-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900 text-sm">Search Docs</p>
                      <p className="text-xs text-gray-600">Find specific documents</p>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download className="w-6 h-6 text-purple-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900 text-sm">Export Results</p>
                      <p className="text-xs text-gray-600">Download analysis reports</p>
                    </div>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Settings className="w-6 h-6 text-orange-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900 text-sm">Configure</p>
                      <p className="text-xs text-gray-600">Adjust system settings</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Analyses */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analyses</h3>
                <div className="space-y-3">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{analysis.name}</p>
                        <p className="text-xs text-gray-600">{analysis.timeAgo}</p>
                      </div>
                      {analysis.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing Overview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Total Documents</span>
                    </div>
                    <span className="font-semibold text-gray-900">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Successfully Processed</span>
                    </div>
                    <span className="font-semibold text-green-600">1,189</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-gray-600">Currently in Progress</span>
                    </div>
                    <span className="font-semibold text-yellow-600">58</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Overall Success Rate</span>
                    </div>
                    <span className="font-semibold text-purple-600">95.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

async function uploadDocument(file: File): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);

  let response;
  try {
    response = await fetch('http://127.0.0.1:8000/convert-pdf/', {
      method: 'POST',
      body: formData,
    });
  } catch (networkError) {
    console.error('Network error:', networkError);
    throw new Error('Network error');
  }

  if (!response.ok) {
    let errorDetail = 'Upload failed';
    try {
      const data = await response.json();
      errorDetail = data.detail || errorDetail;
    } catch (e) {
      // Not JSON, keep default error
    }
    console.error('API error:', errorDetail);
    throw new Error(errorDetail);
  }

  // If status is 2xx, treat as success regardless of JSON
  try {
    const data = await response.json();
    console.log('Upload success, JSON response:', data);
    return data;
  } catch (e) {
    // Not JSON, but still success
    console.log('Upload success, but response is not JSON.');
    return {};
  }
}
