"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BrainCircuit, 
  Send, 
  Loader2, 
  AlertCircle, 
  ArrowRight,
  User,
  Bot
} from 'lucide-react';
import { generateInterviewQuestions } from '@/ai/flows/ai-question-generation-flow';
import { aiTextFeedback } from '@/ai/flows/ai-text-feedback';

export default function InterviewSession() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [resumeDetails, setResumeDetails] = useState<any>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<{type: 'ai' | 'user', text: string}[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedRole = sessionStorage.getItem('currentInterviewRole');
    const savedResume = sessionStorage.getItem('resumeDetails');
    
    if (!savedRole) {
      router.push('/interview/setup');
      return;
    }

    setRole(savedRole);
    if (savedResume) {
      setResumeDetails(JSON.parse(savedResume));
    }

    const initInterview = async () => {
      setIsProcessing(true);
      try {
        const resumeParsed = savedResume ? JSON.parse(savedResume) : null;
        const result = await generateInterviewQuestions({
          jobRole: savedRole,
          resumeDetails: {
            skills: resumeParsed?.skills || [],
            experience: resumeParsed?.experience?.map((e: any) => e.title) || [],
            projects: resumeParsed?.projects?.map((p: any) => p.name) || []
          }
        });
        
        const allQuestions = [
          ...result.hrQuestions,
          ...result.technicalQuestions,
          ...result.scenarioQuestions
        ].slice(0, 5); // Just 5 questions for the demo

        setQuestions(allQuestions);
        setHistory([{ type: 'ai', text: `Welcome! Let's start the interview for the ${savedRole} position. Here is your first question: ${allQuestions[0]}` }]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    };

    initInterview();
  }, [router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim() || isProcessing) return;

    const currentAnswer = userAnswer;
    const currentQuestion = questions[currentIndex];
    setUserAnswer("");
    setIsProcessing(true);

    setHistory(prev => [...prev, { type: 'user', text: currentAnswer }]);

    try {
      // Get feedback for the current answer
      const feedback = await aiTextFeedback({
        question: currentQuestion,
        userAnswer: currentAnswer,
        jobRole: role
      });
      
      setFeedbacks(prev => [...prev, { ...feedback, question: currentQuestion, answer: currentAnswer }]);

      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'ai', text: questions[nextIndex] }]);
          setIsProcessing(false);
        }, 1000);
      } else {
        setHistory(prev => [...prev, { type: 'ai', text: "That was the last question! I'm preparing your comprehensive performance report now." }]);
        setTimeout(() => {
          sessionStorage.setItem('lastInterviewFeedback', JSON.stringify(feedbacks));
          router.push('/interview/feedback/last');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="h-20 bg-white border-b px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-headline font-bold">CogniPrep AI Session</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">{role}</Badge>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 rounded-full ${i <= currentIndex ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
          End Session
        </Button>
      </header>

      {/* Chat Area */}
      <main className="flex-grow overflow-hidden flex flex-col max-w-5xl w-full mx-auto p-6 space-y-6">
        <div className="flex-grow overflow-y-auto pr-4 space-y-6 scrollbar-hide" ref={scrollRef}>
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-sm ${msg.type === 'user' ? 'bg-secondary' : 'bg-primary'}`}>
                  {msg.type === 'user' ? <User className="text-white w-5 h-5" /> : <Bot className="text-white w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-lg leading-relaxed ${msg.type === 'user' ? 'bg-secondary text-white rounded-tr-none' : 'bg-white text-foreground rounded-tl-none border'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[80%] flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <div className="p-4 bg-white border rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-muted-foreground italic">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="shrink-0 space-y-4">
          <div className="relative">
            <Textarea 
              placeholder="Type your answer here..."
              className="min-h-[140px] p-6 text-lg rounded-2xl border-2 focus-visible:ring-primary shadow-lg resize-none"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSubmitAnswer();
                }
              }}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">Ctrl + Enter to send</span>
              <Button 
                size="icon" 
                className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim() || isProcessing}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl flex items-center gap-3 border border-amber-100 text-amber-800 text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Tips: Try to use the STAR method (Situation, Task, Action, Result) for behavioral questions.
          </div>
        </div>
      </main>
    </div>
  );
}