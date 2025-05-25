
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (showAuth) {
    return (
      <AuthForm
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/dd7827cf-89f3-4055-834d-3bcaf26d741f.png" 
            alt="ForkCast Logo" 
            className="w-10 h-10"
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
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Log In
          </Button>
          <Button
            onClick={() => {
              setAuthMode('signup');
              setShowAuth(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/dd7827cf-89f3-4055-834d-3bcaf26d741f.png" 
            alt="ForkCast Logo" 
            className="w-32 h-32 mx-auto mb-8"
          />
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            ForkCast
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            AI-powered meal planning that forecasts your perfect week of delicious, 
            budget-friendly meals tailored to your taste and lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={() => {
                setAuthMode('signup');
                setShowAuth(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4"
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
              className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-4"
            >
              I Have an Account
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">AI-Powered Planning</h3>
              <p className="text-slate-400">
                Smart meal suggestions based on your preferences, dietary needs, and budget.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">📋</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Smart Grocery Lists</h3>
              <p className="text-slate-400">
                Automatically generated shopping lists organized by store sections.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">💰</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Budget Tracking</h3>
              <p className="text-slate-400">
                Stay within budget with cost-conscious meal recommendations.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-slate-500">
        <p>&copy; 2025 ForkCast. Your AI kitchen companion.</p>
      </footer>
    </div>
  );
};

export default Landing;
