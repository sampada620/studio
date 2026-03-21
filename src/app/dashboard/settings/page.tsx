"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Shield, Eye, Smartphone, BrainCircuit } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 container max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1">Configure your account preferences and application behavior.</p>
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <CardTitle>AI Preferences</CardTitle>
            </div>
            <CardDescription>Control how the AI interacts with you during mock interviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Real-time Feedback</Label>
                <p className="text-sm text-muted-foreground">Receive hints and feedback during the session.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Adaptive Difficulty</Label>
                <p className="text-sm text-muted-foreground">AI adjusts question difficulty based on your answers.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Stay updated with session reminders and performance insights.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded of scheduled preparation sessions.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">New Feature Announcements</Label>
                <p className="text-sm text-muted-foreground">Be the first to know about new AI models and tools.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Privacy & Security</CardTitle>
            </div>
            <CardDescription>Manage your data and account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Delete Account & Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
