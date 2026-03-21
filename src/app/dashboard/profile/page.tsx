"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Briefcase, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [userName, setUserName] = useState("User");
  const [userInitials, setUserInitials] = useState("U");

  useEffect(() => {
    const storedName = sessionStorage.getItem('userName');
    const storedInitials = sessionStorage.getItem('userInitials');
    if (storedName) {
      setUserName(storedName);
    }
    if (storedInitials) {
      setUserInitials(storedInitials);
    }
  }, []);

  return (
    <div className="p-4 md:p-8 container max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold">Your Profile</h2>
        <p className="text-muted-foreground mt-1">Manage your personal information and career goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-sm h-fit">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                {userInitials}
              </div>
              <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-lg">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold">{userName}</h3>
              <p className="text-sm text-muted-foreground">Software Engineer</p>
            </div>
            <div className="w-full pt-4 space-y-2 border-t text-sm text-left">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> user@example.com
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" /> San Francisco, CA
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Update your information to get more accurate mock interviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Full Name</Label>
                <Input id="firstName" defaultValue={userName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Target Job Title</Label>
                <Input id="title" placeholder="e.g. Senior Frontend Developer" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Summary</Label>
              <textarea 
                id="bio" 
                className="w-full min-h-[100px] p-3 rounded-md border bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder="Brief description of your career goals..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
