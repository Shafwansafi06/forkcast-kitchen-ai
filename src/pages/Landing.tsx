
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (showAuth) {
    return (
      <AuthForm
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-x-hidden">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/dd7827cf-89f3-4055-834d-3bcaf26d741f.png" 
              alt="ForkCast Logo" 
              className="w-10 h-10 animate-pulse"
            />
            <span className="text-white font-bold text-xl">ForkCast</span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setAuthMode('signin');
                setShowAuth(true);
              }}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:scale-105 transition-all duration-200"
            >
              Log In Instead
            </Button>
            <Button
              onClick={() => {
                setAuthMode('signup');
                setShowAuth(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Logo with bounce animation */}
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/dd7827cf-89f3-4055-834d-3bcaf26d741f.png" 
              alt="ForkCast Logo" 
              className="w-32 h-32 mx-auto mb-8 animate-bounce"
            />
          </div>
          
          {/* Animated headline */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              ForkCast
            </h1>
          </div>
          
          {/* Animated subtitle */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
              AI-powered meal planning that forecasts your perfect week of delicious, 
              budget-friendly meals tailored to your taste and lifestyle.
            </p>
          </div>
          
          {/* Social proof */}
          <div className="animate-fade-in mb-8" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm mb-4">
              <span>⭐⭐⭐⭐⭐</span>
              <span>Trusted by 10,000+ meal planners</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-slate-500 text-xs">
              <span>As featured in:</span>
              <span className="font-semibold">TechCrunch</span>
              <span className="font-semibold">Food & Wine</span>
              <span className="font-semibold">Bon Appétit</span>
            </div>
          </div>
          
          {/* Animated CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <Button
              size="lg"
              onClick={() => {
                setAuthMode('signup');
                setShowAuth(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setAuthMode('signin');
                setShowAuth(true);
              }}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-4 hover:scale-105 transition-all duration-200"
            >
              Log In Instead
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown className="text-slate-400 w-6 h-6 mx-auto" />
          </div>

          {/* Video/Demo placeholder */}
          <div className="mt-16 mb-16 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
            <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 max-w-3xl mx-auto">
              <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                  <p className="text-slate-300 text-lg font-medium">Watch How ForkCast Works</p>
                  <p className="text-slate-400 text-sm">2-minute demo video</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">AI-Powered Planning</h3>
              <p className="text-blue-300 text-sm font-medium mb-2">Save 5+ hours per week</p>
              <p className="text-slate-400">
                Smart meal suggestions based on your preferences, dietary needs, and budget.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-bounce">
                <span className="text-white text-xl">📋</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Smart Grocery Lists</h3>
              <p className="text-green-300 text-sm font-medium mb-2">Never forget an ingredient</p>
              <p className="text-slate-400">
                Automatically generated shopping lists organized by store sections.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 group animate-fade-in" style={{ animationDelay: '1.6s', animationFillMode: 'both' }}>
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                <span className="text-white text-xl">💰</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Budget Tracking</h3>
              <p className="text-yellow-300 text-sm font-medium mb-2">Save up to 30% on groceries</p>
              <p className="text-slate-400">
                Stay within budget with cost-conscious meal recommendations.
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-20 mb-16 animate-fade-in" style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Sarah M.</p>
                    <p className="text-slate-400 text-sm">Busy Mom of 3</p>
                  </div>
                </div>
                <p className="text-slate-300">"ForkCast has revolutionized our family meal planning. I save hours every week and we're eating healthier than ever!"</p>
              </div>
              
              <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Mike R.</p>
                    <p className="text-slate-400 text-sm">College Student</p>
                  </div>
                </div>
                <p className="text-slate-300">"Perfect for my budget and dietary restrictions. The AI suggestions are spot-on every time!"</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-slate-500 border-t border-slate-800">
        <p>&copy; 2025 ForkCast. Your AI kitchen companion.</p>
      </footer>
    </div>
  );
};

export default Landing;
