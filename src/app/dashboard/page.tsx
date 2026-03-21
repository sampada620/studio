"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BrainCircuit, 
  Plus, 
  History, 
  Settings, 
  LogOut, 
  User, 
  TrendingUp, 
  AlertCircle,
  FileText,
  Star,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
  const [userName] = useState("John Doe");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-headline font-bold text-primary">CogniPrep AI</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-primary bg-primary/5" asChild>
            <Link href="/dashboard"><TrendingUp className="mr-2 w-4 h-4" /> Overview</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/history"><History className="mr-2 w-4 h-4" /> My Sessions</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/profile"><User className="mr-2 w-4 h-4" /> Profile</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/settings"><Settings className="mr-2 w-4 h-4" /> Settings</Link>
          </Button>
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5">
            <LogOut className="mr-2 w-4 h-4" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-headline font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-medium bg-muted/50">PRO Plan</Badge>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 container max-w-6xl mx-auto">
          {/* Welcome Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-headline font-bold">Welcome back, {userName}! 👋</h2>
              <p className="text-muted-foreground mt-1 text-lg">You&apos;re doing great. Keep practicing to reach your goals.</p>
            </div>
            <Link href="/interview/setup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8">
                <Plus className="mr-2 w-5 h-5" /> New Mock Interview
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Completed Sessions", value: "12", icon: <CheckCircle2 className="text-green-500" />, sub: "+2 this week" },
              { label: "Average Score", value: "84%", icon: <Star className="text-amber-500" />, sub: "Top 15% of users" },
              { label: "Questions Answered", value: "156", icon: <MessageSquareText className="text-blue-500" />, sub: "78 technical" },
              { label: "Improvement", value: "+12%", icon: <TrendingUp className="text-indigo-500" />, sub: "In last 30 days" }
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Recent Sessions */}
            <Card className="md:col-span-2 border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Recent Sessions</CardTitle>
                <CardDescription>Your last 3 mock interviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: "Senior Frontend Developer", date: "Oct 24, 2024", score: 88, status: "Excellent" },
                  { role: "React Native Developer", date: "Oct 21, 2024", score: 72, status: "Good" },
                  { role: "Full Stack Engineer", date: "Oct 18, 2024", score: 94, status: "Outstanding" }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-bold">{session.role}</div>
                        <div className="text-xs text-muted-foreground">{session.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-primary">{session.score}%</div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{session.status}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2" asChild>
                   <Link href="/dashboard/history">View All Sessions</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Analysis */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Weakness Analyzer</CardTitle>
                <CardDescription>Areas needing focus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>System Design</span>
                      <span className="text-destructive">Critical</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Cloud Architecture</span>
                      <span className="text-amber-500">Moderate</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Soft Skills</span>
                      <span className="text-green-500">Strong</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-xl space-y-2 border border-primary/10">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <AlertCircle className="w-4 h-4" /> AI Suggestion
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focus on scalability patterns and database sharding. Your last session showed hesitation in these areas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}