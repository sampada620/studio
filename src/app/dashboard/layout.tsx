"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BrainCircuit, 
  History, 
  Settings, 
  LogOut, 
  User, 
  TrendingUp,
  Menu
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function DashboardLayout({
  children,
}: {
  children: React.Node;
}) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("User");
  const [userInitials, setUserInitials] = useState("U");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedName = sessionStorage.getItem('userName');
    const storedInitials = sessionStorage.getItem('userInitials');
    if (storedName) {
      setUserName(storedName);
    }
    if (storedInitials) {
      setUserInitials(storedInitials);
    }
  }, []);

  const NavItems = () => (
    <>
      <Button variant="ghost" className={`w-full justify-start ${pathname === '/dashboard' ? 'text-primary bg-primary/5' : ''}`} asChild>
        <Link href="/dashboard"><TrendingUp className="mr-2 w-4 h-4" /> Overview</Link>
      </Button>
      <Button variant="ghost" className={`w-full justify-start ${pathname === '/dashboard/history' ? 'text-primary bg-primary/5' : ''}`} asChild>
        <Link href="/dashboard/history"><History className="mr-2 w-4 h-4" /> My Sessions</Link>
      </Button>
      <Button variant="ghost" className={`w-full justify-start ${pathname === '/dashboard/profile' ? 'text-primary bg-primary/5' : ''}`} asChild>
        <Link href="/dashboard/profile"><User className="mr-2 w-4 h-4" /> Profile</Link>
      </Button>
      <Button variant="ghost" className={`w-full justify-start ${pathname === '/dashboard/settings' ? 'text-primary bg-primary/5' : ''}`} asChild>
        <Link href="/dashboard/settings"><Settings className="mr-2 w-4 h-4" /> Settings</Link>
      </Button>
    </>
  );

  // Prevent hydration mismatch: render static shell or nothing until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-background text-foreground">
        <aside className="w-64 bg-white border-r hidden md:flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BrainCircuit className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-headline font-bold text-primary">CogniPrep AI</span>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center p-8">
            <div className="w-full h-4 bg-muted animate-pulse rounded" />
          </div>
        </aside>
        <div className="flex-grow flex flex-col">
          <header className="h-16 bg-white border-b px-4 md:px-8 flex items-center justify-between" />
          <main className="flex-grow p-8">
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="h-8 w-64 bg-muted animate-pulse rounded" />
              <div className="h-32 w-full bg-muted animate-pulse rounded" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Desktop */}
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
          <NavItems />
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5" onClick={() => {
            sessionStorage.clear();
            window.location.href = '/auth/login';
          }}>
            <LogOut className="mr-2 w-4 h-4" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <header className="h-16 bg-white border-b px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile Nav - Defer rendering until mounted to avoid Radix ID mismatch */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <BrainCircuit className="text-white w-5 h-5" />
                      </div>
                      <span className="text-xl font-headline font-bold text-primary">CogniPrep AI</span>
                    </div>
                    <nav className="space-y-2">
                      <NavItems />
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <h1 className="text-xl font-headline font-bold capitalize">
              {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()?.replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-medium bg-muted/50 hidden sm:flex border-primary/20 text-primary">PRO Plan</Badge>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{userName}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Candidate</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {userInitials}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
