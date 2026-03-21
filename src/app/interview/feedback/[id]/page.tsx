"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BrainCircuit, 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare, 
  Zap,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';

// Mock data for existing sessions to prevent loading hang
const MOCK_FEEDBACKS = [
  {
    question: "Tell me about a time you faced a significant technical challenge and how you overcame it.",
    answerQualityFeedback: "Great structure using the STAR method. You clearly defined the conflict and the technical resolution.",
    communicationFeedback: "Very clear and professional tone. Good eye contact (simulated).",
    technicalAccuracyFeedback: "Demonstrated deep understanding of system architecture and performance trade-offs."
  },
  {
    question: "How do you handle state management in large scale React applications?",
    answerQualityFeedback: "Comprehensive answer covering various tools like Redux, Context API, and Zustand.",
    communicationFeedback: "Articulate explanation of complex concepts. Could be slightly more concise.",
    technicalAccuracyFeedback: "Correctly identified when to use server state (React Query) vs client state."
  }
];

export default function FeedbackReport({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.id;
  
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [role, setRole] = useState("Software Engineer");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      // If it's the most recent session
      if (sessionId === 'last') {
        const data = sessionStorage.getItem('lastInterviewFeedback');
        const savedRole = sessionStorage.getItem('currentInterviewRole');
        if (data) {
          setFeedbacks(JSON.parse(data));
          if (savedRole) setRole(savedRole);
        } else {
          // Fallback to mock if nothing in session
          setFeedbacks(MOCK_FEEDBACKS);
        }
      } else {
        // For historical mock sessions (IDs 1-5 from history page)
        setFeedbacks(MOCK_FEEDBACKS);
        // Map ID to roles just for the prototype feel
        const roles: Record<string, string> = {
          '1': "Senior Frontend Developer",
          '2': "React Native Developer",
          '3': "Full Stack Engineer",
          '4': "UI Designer",
          '5': "Backend Developer"
        };
        if (roles[sessionId]) setRole(roles[sessionId]);
      }
      setIsLoading(false);
    };

    // Small delay to simulate processing
    const timer = setTimeout(loadData, 800);
    return () => clearTimeout(timer);
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium animate-pulse">Analyzing your performance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-white border-b py-6 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/history">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-headline font-bold">Performance Report</h1>
              <p className="text-sm text-muted-foreground">Session for {role} • Oct 27, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 w-4 h-4" /> Download PDF
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Share2 className="mr-2 w-4 h-4" /> Share
            </Button>
            <Link href="/interview/setup">
              <Button size="sm" className="bg-primary">Practice Again</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8 space-y-8 max-w-6xl">
        {/* Overall Score */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-primary text-white border-none shadow-xl relative overflow-hidden">
            <CardContent className="p-10 space-y-6 relative z-10">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-none">INTERVIEW STATUS: EXCELLENT</Badge>
                <h2 className="text-5xl font-headline font-bold">Overall Score: 88%</h2>
                <p className="text-primary-foreground/80 text-lg">You demonstrated strong technical knowledge and clear communication. A few refinements in your scenario-based answers will make you a top candidate.</p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Technical</div>
                  <div className="text-2xl font-bold">92%</div>
                  <Progress value={92} className="h-1.5 bg-white/20" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Communication</div>
                  <div className="text-2xl font-bold">84%</div>
                  <Progress value={84} className="h-1.5 bg-white/20" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Confidence</div>
                  <div className="text-2xl font-bold">88%</div>
                  <Progress value={88} className="h-1.5 bg-white/20" />
                </div>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-amber-500 w-5 h-5" /> Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">Excellent explanation of React hooks lifecycle.</p>
              </div>
              <div className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                <TrendingUp className="text-blue-500 w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">Use more quantifiable metrics in your project results.</p>
              </div>
              <div className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                <ShieldCheck className="text-indigo-500 w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">Confident tone maintained throughout the session.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question by Question Feedback */}
        <div className="space-y-6">
          <h3 className="text-2xl font-headline font-bold">Detailed Breakdown</h3>
          <div className="space-y-4">
            {feedbacks.map((f, i) => (
              <Card key={i} className="border-none shadow-sm overflow-hidden group">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-muted/30 p-6 border-r">
                    <div className="space-y-4">
                      <Badge variant="outline" className="font-bold">QUESTION {i + 1}</Badge>
                      <h4 className="font-bold text-lg leading-tight">{f.question}</h4>
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>SCORE</span>
                          <span>{Math.floor(Math.random() * 20) + 80}%</span>
                        </div>
                        <Progress value={85} className="h-1" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <Search className="w-4 h-4" /> Technical Feedback
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.technicalAccuracyFeedback}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                          <MessageSquare className="w-4 h-4" /> Communication
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.communicationFeedback}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="font-bold text-sm text-primary mb-1">Answer Quality</div>
                      <p className="text-sm text-muted-foreground">{f.answerQualityFeedback}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <Card className="bg-secondary text-white border-none shadow-xl">
          <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold">Personalized Improvement Plan</h3>
              <p className="text-secondary-foreground/80 max-w-xl">We&apos;ve curated a learning path based on your performance to bridge your skill gaps before your real interview.</p>
            </div>
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90 h-14 px-8 rounded-full font-bold">
              View My Roadmap <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
