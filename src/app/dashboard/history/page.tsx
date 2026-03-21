"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const sessions = [
    { id: '1', role: "Senior Frontend Developer", date: "Oct 24, 2024", score: 88, status: "Excellent", duration: "45 mins" },
    { id: '2', role: "React Native Developer", date: "Oct 21, 2024", score: 72, status: "Good", duration: "32 mins" },
    { id: '3', role: "Full Stack Engineer", date: "Oct 18, 2024", score: 94, status: "Outstanding", duration: "51 mins" },
    { id: '4', role: "UI Designer", date: "Oct 12, 2024", score: 81, status: "Very Good", duration: "28 mins" },
    { id: '5', role: "Backend Developer", date: "Oct 05, 2024", score: 65, status: "Improving", duration: "40 mins" },
  ];

  return (
    <div className="p-4 md:p-8 container max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold">Session History</h2>
        <p className="text-muted-foreground mt-1">Review your past performances and track your progress.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Interviews</CardTitle>
            <CardDescription>A complete list of your mock interview sessions.</CardDescription>
          </div>
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-lg text-sm border-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group border border-transparent hover:border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <FileText className="w-6 h-6 text-primary/70" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{session.role}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{session.date}</span>
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0">
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{session.score}%</div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold border-primary/20 bg-primary/5 text-primary">
                      {session.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild className="rounded-full">
                    <Link href={`/interview/feedback/${session.id}`}>
                      View Report <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
