import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
        }
        if (!data) {
          // Profile does not exist, create it
          const now = new Date();
          const trialStart = now.toISOString();
          const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({ 
              id: user.id, 
              email: user.email,
              trial_start: trialStart,
              trial_end: trialEnd,
              subscription_tier: 'trial'
            })
            .select()
            .single();
          if (insertError) {
            console.error('Error creating profile:', insertError);
            setProfile(null);
          } else {
            setProfile(newProfile);
          }
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching/creating profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
  };
};

export function hasProAccess(profile: any): boolean {
  if (!profile) return false;
  if (profile.subscription_tier === "pro") return true;
  if (profile.subscription_tier === "trial" && profile.trial_end) {
    return new Date(profile.trial_end) > new Date();
  }
  return false;
}
