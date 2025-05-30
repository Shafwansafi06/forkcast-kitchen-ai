import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { ChefHat, Sparkles, Clock, DollarSign, Users, Check } from 'lucide-react';
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Landing = () => {
  const { signIn, signUp } = useAuth();
  const [step, setStep] = useState('welcome'); // welcome, preferences, subscription, auth
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    keto: false,
    dairyFree: false,
    nutFree: false
  });
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePreferenceChange = (pref, checked) => {
    setPreferences(prev => ({ ...prev, [pref]: checked }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (authMode === 'signup') {
        await signUp(email, password);
        // Store preferences in localStorage to be saved to profile later
        localStorage.setItem('pending_preferences', JSON.stringify(preferences));
        window.location.href = '/dashboard';
      } else {
        await signIn(email, password);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
    setLoading(false);
  };

  const startFreeTrial = () => {
    setStep('auth');
    setAuthMode('signup');
  };

  const WelcomeStep = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-white font-bold text-xl">ForkCast</span>
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 text-black hover:bg-white/10"
            onClick={() => {
              setStep('auth');
              setAuthMode('signin');
            }}
          >
            Log In Instead
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">AI-Powered Meal Planning</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Plan Perfect Meals with
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> AI Magic</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get personalized meal plans, smart grocery lists, and discover amazing recipes tailored to your taste, budget, and dietary needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              onClick={() => setStep('preferences')}
            >
              Get Started Free
              <ChefHat className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white focus:bg-blue-700 focus:text-white px-8 py-4 text-lg transition-colors duration-200"
            >
              Watch Demo
            </Button>
          </div>
          
          <p className="text-slate-400 text-sm mt-4">
            ✨ 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose ForkCast?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Clock className="w-8 h-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Save 5+ Hours Weekly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Stop wondering "what's for dinner?" AI creates perfect meal plans in seconds based on your preferences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Cut Food Costs 30%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Smart grocery lists eliminate food waste and help you stick to your budget with price comparisons.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Users className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Loved by 50K+ Families</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Join thousands of happy families who've transformed their meal planning with ForkCast.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );

  const PreferencesStep = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-slate-800/70 border-slate-600">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Tell us about your food preferences</CardTitle>
          <p className="text-slate-200">We'll personalize your meal plans based on your dietary needs</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(preferences).map(([key, checked]) => (
              <div key={key} className={`flex items-center space-x-3 p-4 rounded-lg border ${checked ? 'bg-blue-700/50 border-blue-600' : 'bg-slate-700/50 border-slate-600'} hover:bg-slate-600/70 transition-colors duration-200 cursor-pointer`}
                onClick={() => handlePreferenceChange(key, !checked)}
              >
                <Checkbox 
                  checked={checked}
                  onCheckedChange={(checked) => handlePreferenceChange(key, checked)}
                  className={`w-5 h-5 ${checked ? 'border-blue-300 text-blue-300' : 'border-slate-400'}`}
                />
                <span className="text-white font-semibold">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 border-slate-400 text-slate-100 hover:bg-slate-600 hover:text-white"
              onClick={() => setStep('welcome')}
            >
              Back
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              onClick={() => setStep('subscription')}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SubscriptionStep = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-slate-200 text-lg">Start with a 14-day free trial, then continue for just $9.99/month</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Trial */}
          <Card className="bg-slate-800/80 border-slate-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                Start Here
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-white">Free Trial</CardTitle>
              <div className="text-4xl font-bold text-white mt-4">$0</div>
              <p className="text-slate-200">14 days free</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-100">Unlimited AI meal plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-100">Smart grocery lists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-100">Recipe recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-100">Kroger integration</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3"
                onClick={startFreeTrial}
              >
                Start 14-Day Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 border-blue-700 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Pro Plan</CardTitle>
              <div className="text-4xl font-bold text-white mt-4">$9.99</div>
              <p className="text-white">per month after trial</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-300" />
                  <span className="text-white">Everything in Free Trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-300" />
                  <span className="text-white">Advanced nutrition tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-300" />
                  <span className="text-white">Family meal planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-300" />
                  <span className="text-white">Priority support</span>
                </div>
              </div>
              <Button 
                variant="outline"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 border-0 shadow-md"
                onClick={startFreeTrial}
              >
                Try Free, Then $9.99/month
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            variant="link" 
            className="text-slate-300 hover:text-slate-100"
            onClick={() => setStep('preferences')}
          >
            Back to Preferences
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ display: step === 'welcome' ? 'block' : 'none' }}>
        <WelcomeStep />
      </div>
      <div style={{ display: step === 'preferences' ? 'block' : 'none' }}>
        <PreferencesStep />
      </div>
      <div style={{ display: step === 'subscription' ? 'block' : 'none' }}>
        <SubscriptionStep />
      </div>
      <div style={{ display: step === 'auth' ? 'block' : 'none' }}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
          <AuthForm mode={authMode} onToggleMode={() => setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin')} />
        </div>
      </div>
    </>
  );
};

export default Landing;
