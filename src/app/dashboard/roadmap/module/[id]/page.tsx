"use client";

import { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Play, 
  Pause,
  CheckCircle2, 
  BookOpen, 
  Clock, 
  ChevronRight,
  Loader2,
  Trophy
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const MODULES_DATA: Record<string, any> = {
  "1": {
    title: "System Design Fundamentals",
    description: "Learn the core principles of building scalable systems.",
    duration: "4 hours",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    lessons: [
      { id: 'l1', title: "Understanding Load Balancers", type: "Video", duration: "12:45" },
      { id: 'l2', title: "Caching Strategies & Patterns", type: "Video", duration: "18:20" },
      { id: 'l3', title: "Database Sharding & Partitioning", type: "Text", duration: "15 mins" },
      { id: 'l4', title: "System Design Interview Framework", type: "Video", duration: "25:00" },
    ]
  },
  "2": {
    title: "Advanced React Patterns",
    description: "Deep dive into state management and performance.",
    duration: "3 hours",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    lessons: [
      { id: 'l1', title: "Higher Order Components vs Hooks", type: "Video", duration: "15:30" },
      { id: 'l2', title: "Compound Components Pattern", type: "Video", duration: "22:10" },
      { id: 'l3', title: "Render Props & Logic Reusability", type: "Text", duration: "10 mins" },
      { id: 'l4', title: "React 18 Concurrent Rendering", type: "Video", duration: "28:00" },
    ]
  },
  "3": {
    title: "Behavioral Excellence",
    description: "Perfecting your storytelling for cultural fit interviews.",
    duration: "2 hours",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    lessons: [
      { id: 'l1', title: "The STAR Method Explained", type: "Video", duration: "08:45" },
      { id: 'l2', title: "Handling Negative Feedback Questions", type: "Video", duration: "14:20" },
      { id: 'l3', title: "Conflict Resolution Examples", type: "Text", duration: "12 mins" },
      { id: 'l4', title: "Negotiation Strategies", type: "Video", duration: "19:00" },
    ]
  }
};

export default function ModuleStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const moduleId = resolvedParams.id;
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [module, setModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModule(MODULES_DATA[moduleId] || MODULES_DATA["1"]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [moduleId]);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Opening Study Guide",
      description: "Opening the documentation in a new tab.",
    });
    window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank");
  };

  const handleStartQuiz = () => {
    toast({
      title: "Quiz Started",
      description: "Redirecting to the assessment portal.",
    });
    window.open("https://www.google.com/forms", "_blank");
  };

  const handleCompleteModule = () => {
    setIsCompleted(true);
    toast({
      title: "Congratulations!",
      description: "You've marked this module as complete. Achievement unlocked!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 container max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/roadmap">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <Badge className="mb-2 bg-primary/10 text-primary border-none">Module Study</Badge>
          <h2 className="text-3xl font-headline font-bold">{module.title}</h2>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-black aspect-video relative group flex items-center justify-center">
             <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={`https://picsum.photos/seed/${moduleId}/1280/720`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
             >
                <source src={module.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
             </video>

             {!isPlaying && (
               <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-opacity group-hover:bg-black/20">
                  <Button 
                    size="lg" 
                    className="h-20 w-20 rounded-full bg-white text-black hover:bg-white/90 shadow-2xl"
                    onClick={handlePlayToggle}
                  >
                      <Play className="fill-current w-8 h-8 ml-1" />
                  </Button>
                  <p className="mt-4 text-white font-bold text-xl drop-shadow-md">
                    Play Lesson 1: Introduction
                  </p>
               </div>
             )}

             {isPlaying && (
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    onClick={handlePlayToggle}
                  >
                      <Pause className="w-5 h-5" />
                  </Button>
               </div>
             )}
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Lesson Resources</CardTitle>
              <CardDescription>Handy links and documents for this module.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
               <Button variant="outline" className="justify-start h-auto py-3 px-4 group" onClick={handleDownloadPDF}>
                  <BookOpen className="mr-3 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Study Guide PDF</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Opens in New Tab</div>
                  </div>
               </Button>
               <Button variant="outline" className="justify-start h-auto py-3 px-4 group" onClick={handleStartQuiz}>
                  <CheckCircle2 className="mr-3 w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Self-Check Quiz</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Opens External Portal</div>
                  </div>
               </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Course Content</span>
                <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {module.duration}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {module.lessons.map((lesson: any, i: number) => (
                  <div 
                    key={lesson.id} 
                    className={`p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors ${i === 0 ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                    onClick={i === 0 ? handlePlayToggle : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {i + 1}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${i === 0 ? 'text-primary' : ''}`}>{lesson.title}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{lesson.type} • {lesson.duration}</div>
                      </div>
                    </div>
                    {i === 0 && (
                      isPlaying ? <Pause className="w-4 h-4 text-primary animate-pulse" /> : <Play className="w-4 h-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t">
               <Button 
                className="w-full bg-primary h-12 rounded-xl font-bold"
                onClick={handleCompleteModule}
                disabled={isCompleted}
               >
                  {isCompleted ? "Module Completed!" : "Mark as Complete"}
               </Button>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-muted/20">
             <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Trophy className="w-5 h-5" />
                   </div>
                   <div>
                      <div className="text-sm font-bold">Achievement Awaiting</div>
                      <div className="text-xs text-muted-foreground italic">Complete this module to earn "System Master" badge</div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
