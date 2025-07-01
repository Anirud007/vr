
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  TrendingUp, 
  Zap, 
  Shield, 
  Search,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
  User,
  Database,
  Monitor,
  Target
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Insights");

  const filters = ["All Insights", "Functional", "Non-Functional", "Risks & Constraints", "Other Categories"];

  const insightCategories = [
    {
      id: 1,
      title: "Functional Requirement",
      description: "User login and authentication system with multi-factor support. This includes secure session management and role-based access controls.",
      icon: CheckCircle,
      color: "blue",
      source: "Document AI"
    },
    {
      id: 2,
      title: "Constraint",
      description: "Limited to PDF, DOCX, and XLSX file formats for processing. System must handle large file uploads efficiently.",
      icon: AlertTriangle,
      color: "orange",
      source: "Document AI"
    },
    {
      id: 3,
      title: "Non-Functional Requirement",
      description: "Real-time dashboard for monitoring reconciliation jobs and progress with 99.9% uptime requirement.",
      icon: Layers,
      color: "purple",
      source: "Document AI"
    },
    {
      id: 4,
      title: "Risk",
      description: "Security vulnerabilities in file upload process. Requires comprehensive input validation and malware scanning.",
      icon: Shield,
      color: "red",
      source: "Document AI"
    },
    {
      id: 5,
      title: "Persona",
      description: "Administrative users who manage system configurations and user permissions across multiple departments.",
      icon: User,
      color: "blue",
      source: "Document AI"
    },
    {
      id: 6,
      title: "Deliverable",
      description: "Comprehensive API documentation with examples and integration guides for third-party systems.",
      icon: Database,
      color: "green",
      source: "Document AI"
    },
    {
      id: 7,
      title: "Platform",
      description: "Cloud-based deployment on AWS infrastructure with auto-scaling capabilities and load balancing.",
      icon: Monitor,
      color: "purple",
      source: "Document AI"
    },
    {
      id: 8,
      title: "Business Objective",
      description: "Reduce manual reconciliation time by 80% and improve accuracy to 99.5% through automated processing.",
      icon: Target,
      color: "pink",
      source: "Document AI"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "border-blue-200 bg-blue-50",
      orange: "border-orange-200 bg-orange-50",
      purple: "border-purple-200 bg-purple-50",
      red: "border-red-200 bg-red-50",
      green: "border-green-200 bg-green-50",
      pink: "border-pink-200 bg-pink-50"
    };
    return colorMap[color as keyof typeof colorMap] || "border-gray-200 bg-gray-50";
  };

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-600",
      orange: "text-orange-600", 
      purple: "text-purple-600",
      red: "text-red-600",
      green: "text-green-600",
      pink: "text-pink-600"
    };
    return colorMap[color as keyof typeof colorMap] || "text-gray-600";
  };

  // ... keep existing code (header, metrics, and document overview sections)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Classification Insights</h1>
              <p className="text-sm text-gray-600">File: Short SOM.pdf • Processed in 2.3s • 47 insights extracted</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Layers className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600">Total Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">90%</p>
                  <p className="text-sm text-gray-600">Avg Confidence</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2.3s</p>
                  <p className="text-sm text-gray-600">Processing Speed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Overview */}
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Document Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              The project focuses on developing an AI-driven reconciliation application designed to automate financial reconciliation tasks between corporate and customer Statements of Account (SOAs), thereby addressing the inefficiencies and errors inherent in manual processes.
            </p>
          </CardContent>
        </Card>

        {/* Key Insights Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Key Insights & Data Points</h2>
              <p className="text-sm text-gray-600">Categorized findings from the document analysis.</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insightCategories.map((category) => (
              <Card key={category.id} className={`border ${getColorClasses(category.color)} hover:shadow-md transition-shadow`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <category.icon className={`h-5 w-5 ${getIconColorClasses(category.color)}`} />
                    <h3 className="font-semibold text-gray-900 text-sm">{category.title}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">Source: {category.source}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
