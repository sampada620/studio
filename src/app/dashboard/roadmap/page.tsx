"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  PlayCircle, 
  Trophy,
  Target,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function RoadmapPage() {
  const modules = [
    {
      id: 1,
      title: "System Design Fundamentals",
      description: "Master load balancing, caching strategies, and database sharding.",
      status: "In Progress",
      progress: 45,
      duration: "4 hours",
      topics: ["Scalability Patterns", "Microservices Architecture", "CAP Theorem"]
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      description: "Deep dive into performance optimization and custom hooks.",
      status: "Todo",
      progress: 0,
      duration: "3 hours",
      topics: ["Memoization", "Concurrent Rendering", "State Management Scale"]
    },
    {
      id: 3,
      title: "Behavioral Excellence",
      description: "Refining the STAR method for complex conflict scenarios.",
      status: "Completed",
      progress: 100,
      duration: "2 hours",
      topics: ["Conflict Resolution", "Leadership Principles", "Stakeholder Management"]
    }
  ];

  return (
    <div className="p-4 md:p-8 container max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-headline font-bold">Your Preparation Roadmap</h2>
          <p className="text-muted-foreground mt-1">AI-curated learning path to bridge your skill gaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-primary text-white">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold">32%</div>
                <div className="text-xs opacity-80 uppercase font-bold tracking-wider">Overall Completion</div>
              </div>
              <Progress value={32} className="h-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="secondary" className="w-full justify-center py-1">System Design</Badge>
              <Badge variant="secondary" className="w-full justify-center py-1">Cloud Infrastructure</Badge>
              <Badge variant="secondary" className="w-full justify-center py-1">Data Structures</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Modules List */}
        <div className="lg:col-span-3 space-y-6">
          {modules.map((module) => (
            <Card key={module.id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {module.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-primary" />
                      )}
                      <h3 className="text-xl font-bold">{module.title}</h3>
                    </div>
                    <Badge variant={module.status === 'Completed' ? 'default' : 'outline'} className={module.status === 'In Progress' ? 'bg-amber-500 text-white border-none' : ''}>
                      {module.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{module.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, i) => (
                      <span key={i} className="text-[10px] bg-muted px-2 py-1 rounded-md font-medium text-muted-foreground uppercase">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" /> 5 Lessons
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {module.progress > 0 && module.progress < 100 && (
                        <span className="text-sm font-bold text-primary">{module.progress}%</span>
                      )}
                      <Button size="sm" variant={module.status === 'Completed' ? 'outline' : 'default'} className="rounded-full" asChild>
                        <Link href={`/dashboard/roadmap/module/${module.id}`}>
                          {module.status === 'Completed' ? 'Review' : 'Start Now'} <ChevronRight className="ml-1 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                {module.progress > 0 && module.progress < 100 && (
                  <div className="w-1 bg-primary" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
