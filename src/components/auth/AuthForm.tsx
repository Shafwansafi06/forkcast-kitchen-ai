import { useState, useRef, useLayoutEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
}

const AuthForm = ({ mode, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) throw error;
        toast.success('Account created successfully! Please check your email to verify your account.');
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Welcome back!');
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        },
      });
      if (error) throw error;
      // The user will be redirected, so no need to do anything else here
    } catch (error: any) {
      toast.error(error.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    let targetEmail = email;
    if (!targetEmail) {
      targetEmail = window.prompt('Enter your email to reset your password:') || '';
    }
    if (!targetEmail) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo: window.location.origin + '/auth/callback',
      });
      if (error) throw error;
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#7c3aed] flex items-center justify-center">
      <Card className="w-full max-w-xl p-10 rounded-3xl shadow-2xl border border-slate-200/30 bg-white/90">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="ForkCast Logo" className="h-14 w-auto mb-2" />
          <CardTitle className="text-4xl font-bold text-slate-900">{mode === 'signin' ? 'Welcome Back' : 'Join ForkCast'}</CardTitle>
          <p className="text-base text-slate-600 mt-1">{mode === 'signin' ? 'Sign in to your account' : 'Create your free account'}</p>
        </div>
        <CardContent className="space-y-8">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg text-lg shadow flex items-center justify-center gap-2"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </Button>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                ref={emailRef}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
              {mode === 'signin' && (
                <button
                  type="button"
                  className="text-blue-600 hover:underline text-sm mt-1"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Forgot your password?
                </button>
              )}
            </div>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg shadow" type="submit" disabled={loading}>
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          <p className="text-base text-center text-slate-600 mt-4">
            {mode === 'signin'
              ? <>
                  New to ForkCast? <button type="button" className="text-blue-600 hover:underline" onClick={onToggleMode}>Create your free account →</button>
                </>
              : <>
                  Already have an account? <button type="button" className="text-blue-600 hover:underline" onClick={onToggleMode}>← Back to sign in</button>
                </>
            }
          </p>
          <div className="text-center mt-2">
            <button
              type="button"
              className="text-purple-700 hover:underline text-base font-semibold"
              onClick={() => window.open('https://descriptusercontent.com/published/2857cd60-97db-477c-b324-f5657b18b9f6/original.mp4', '_blank')}
            >
              🎬 Watch Demo
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
