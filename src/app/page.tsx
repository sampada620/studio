import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BrainCircuit, 
  MessageSquareText, 
  Target, 
  LineChart, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass-morphism border-b">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-headline font-bold text-primary">CogniPrep AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 hero-gradient">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border-secondary/20 font-medium">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                The Future of Interview Prep
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight">
                Master Your Interviews with <span className="text-primary italic">AI-Powered</span> Precision.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                CogniPrep AI simulates realistic job interviews tailored to your resume and target role. Get instant feedback and data-driven insights to land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 rounded-full shadow-lg">
                    Start Mock Interview <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium rounded-full border-2">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="pt-12 flex items-center justify-center gap-8 grayscale opacity-60">
                <span className="font-headline font-bold text-2xl">TRUSTED BY CANDIDATES AT</span>
                <div className="flex gap-6 items-center font-bold text-xl">
                  <span>META</span>
                  <span>GOOGLE</span>
                  <span>STRIPE</span>
                  <span>AIRBNB</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-x-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold">Comprehensive Preparation</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to turn anxiety into confidence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BrainCircuit className="w-8 h-8 text-primary" />,
                  title: "Resume-Tailored Questions",
                  description: "Our AI parses your experience to generate hyper-personalized questions that real recruiters would ask."
                },
                {
                  icon: <Target className="w-8 h-8 text-secondary" />,
                  title: "Role-Specific Training",
                  description: "Whether it's Full Stack Development or Product Management, get questions specific to your domain."
                },
                {
                  icon: <LineChart className="w-8 h-8 text-primary" />,
                  title: "Actionable Feedback",
                  description: "Receive detailed scores on technical accuracy, communication style, and answer quality."
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-colors">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-headline font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl lg:text-5xl font-headline font-bold">Ready to ace your next big interview?</h2>
              <p className="text-primary-foreground/80 text-xl">
                Join thousands of professionals who improved their performance by 40% with CogniPrep.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg rounded-full">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-headline font-bold text-primary">CogniPrep AI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 CogniPrep AI. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}