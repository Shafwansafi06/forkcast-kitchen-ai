import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        toast.success('Signed in successfully!');
        navigate('/dashboard');
      } else {
        toast.error(error?.message || 'Authentication failed');
        setLoading(false);
      }
    };
    handleAuth();
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#7c3aed]">
      <div className="text-center">
        <div className="loader mb-4" />
        <p className="text-lg text-white">Signing you in with Google...</p>
      </div>
      <style>{`.loader { border: 4px solid #f3f3f3; border-top: 4px solid #7c3aed; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AuthCallback; 