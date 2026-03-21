"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BrainCircuit, 
  Upload, 
  Loader2, 
  ChevronRight, 
  ChevronLeft,
  FileCheck,
  Briefcase,
  FileWarning
} from 'lucide-react';
import { parseResume } from '@/ai/flows/resume-parsing-flow';
import { useToast } from '@/hooks/use-toast';

export default function InterviewSetup() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload your resume in PDF format for the best AI analysis.",
      });
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const dataUri = reader.result as string;
        try {
          const result = await parseResume({ resumeDataUri: dataUri });
          setResumeData(result);
          toast({
            title: "Resume Parsed Successfully",
            description: `Extracted ${result.skills.length} skills and ${result.experience.length} experiences.`,
          });
          setStep(2);
        } catch (error) {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "The AI had trouble reading this PDF. Please ensure it's not password protected.",
          });
        } finally {
          setIsUploading(false);
        }
      };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not read your file. Please try again.",
      });
      setIsUploading(false);
    }
  };

  const handleStartInterview = () => {
    if (!selectedRole) return;
    setIsGenerating(true);
    
    // Store in session storage for the interview page
    sessionStorage.setItem('currentInterviewRole', selectedRole);
    sessionStorage.setItem('resumeDetails', JSON.stringify(resumeData));

    setTimeout(() => {
      router.push('/interview/session');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 hero-gradient">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-headline font-bold text-primary">CogniPrep AI</span>
          </div>
          <h1 className="text-3xl font-headline font-bold">Setup Your Session</h1>
          <p className="text-muted-foreground">Customize your mock interview experience</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
          <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
        </div>

        <Card className="border-none shadow-2xl">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Upload className="w-6 h-6 text-primary" /> Upload Resume
                </CardTitle>
                <CardDescription>We&apos;ll use your background to tailor specific questions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted rounded-2xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="space-y-4 py-4">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                      <p className="font-medium animate-pulse">AI is analyzing your resume...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold">Click or drag to upload</p>
                        <p className="text-sm text-muted-foreground">PDF Only (Max 5MB)</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs font-medium border border-blue-100">
                  <FileWarning className="w-4 h-4 shrink-0" />
                  PDF is required for the most accurate skill extraction.
                </div>

                <div className="text-center">
                  <Button variant="ghost" className="text-muted-foreground" onClick={() => setStep(2)}>
                    Skip and use basic profile
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" /> Target Role
                </CardTitle>
                <CardDescription>Select the role you&apos;re interviewing for.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Select onValueChange={setSelectedRole} defaultValue={selectedRole}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select a job role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                      <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
                      <SelectItem value="Product Manager">Product Manager</SelectItem>
                      <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                      <SelectItem value="UX Designer">UX Designer</SelectItem>
                      <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {resumeData && (
                  <div className="p-4 bg-green-50 rounded-xl flex items-start gap-3 border border-green-100">
                    <FileCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-green-800 text-sm">Resume Data Loaded</p>
                      <p className="text-xs text-green-700 leading-relaxed">
                        Extracted {resumeData.skills.length} skills. Questions will be personalized based on your background.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setStep(1)}>
                  <ChevronLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button 
                  className="flex-[2] h-12 bg-primary hover:bg-primary/90 text-lg" 
                  disabled={!selectedRole || isGenerating}
                  onClick={handleStartInterview}
                >
                  {isGenerating ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Questions...</>
                  ) : (
                    <>Start Interview <ChevronRight className="ml-2 w-5 h-5" /></>
                  )}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
