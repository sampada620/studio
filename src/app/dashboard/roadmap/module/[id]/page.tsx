"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  ChevronRight,
  Loader2,
  Trophy
} from 'lucide-react';
import Image from 'next/image';

const MODULES_DATA: Record<string, any> = {
  "1": {
    title: "System Design Fundamentals",
    description: "Learn the core principles of building scalable systems.",
    duration: "4 hours",
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
  const [module, setModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => {
      setModule(MODULES_DATA[moduleId] || MODULES_DATA["1"]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [moduleId]);

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
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-black aspect-video relative group flex items-center justify-center">
             <Image 
                src={`https://picsum.photos/seed/${moduleId}/1280/720`} 
                alt="Lesson Thumbnail" 
                fill 
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="learning video"
             />
             <div className="relative z-10 text-center">
                <Button size="lg" className="h-16 w-16 rounded-full bg-white text-black hover:bg-white/90">
                    <Play className="fill-current w-6 h-6 ml-1" />
                </Button>
                <p className="mt-4 text-white font-bold text-lg shadow-sm">Play Lesson 1: Introduction</p>
             </div>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Lesson Resources</CardTitle>
              <CardDescription>Handy links and documents for this module.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
               <Button variant="outline" className="justify-start h-auto py-3 px-4">
                  <BookOpen className="mr-3 w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Study Guide PDF</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Downloadable</div>
                  </div>
               </Button>
               <Button variant="outline" className="justify-start h-auto py-3 px-4">
                  <CheckCircle2 className="mr-3 w-5 h-5 text-green-500" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Self-Check Quiz</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Mandatory</div>
                  </div>
               </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Lessons List */}
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
                    {i === 0 && <ChevronRight className="w-4 h-4 text-primary" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t">
               <Button className="w-full bg-primary h-12 rounded-xl font-bold">
                  Mark as Complete
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
