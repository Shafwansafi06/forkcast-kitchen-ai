"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProfile, hasProAccess } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    kofiwidget2?: any;
  }
}

const Settings = () => {
  const { profile, updateProfile } = useProfile();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDietaryChange = async (diet: string, enabled: boolean) => {
    if (!profile) return;
    setIsUpdating(true);
    const currentPrefs = profile.dietary_preferences || [];
    const newPrefs = enabled
      ? [...currentPrefs, diet]
      : currentPrefs.filter((pref) => pref !== diet);
    const { error } = await updateProfile({ dietary_preferences: newPrefs });
    if (error) {
      toast.error('Failed to update dietary preferences');
    } else {
      toast.success('Dietary preferences updated');
    }
    setIsUpdating(false);
  };

  const handleLocationChange = async (location: string) => {
    setIsUpdating(true);
    const { error } = await updateProfile({ location });
    if (error) {
      toast.error('Failed to update location');
    } else {
      toast.success('Location updated');
    }
    setIsUpdating(false);
  };

  const handleBudgetChange = async (budget: string) => {
    setIsUpdating(true);
    const { error } = await updateProfile({ budget_preference: budget });
    if (error) {
      toast.error('Failed to update budget preference');
    } else {
      toast.success('Budget preference updated');
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    if (!hasProAccess(profile)) {
      // Inject Ko-fi widget script
      if (!document.getElementById('kofi-script')) {
        const script = document.createElement('script');
        script.id = 'kofi-script';
        script.type = 'text/javascript';
        script.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
        script.onload = () => {
          if (window.kofiwidget2) {
            window.kofiwidget2.init('Subscribe to Pro using Ko-fi', '#72a4f2', 'G2G81FXIN4');
            window.kofiwidget2.draw();
          }
        };
        document.body.appendChild(script);
      } else if (window.kofiwidget2) {
        window.kofiwidget2.init('Subscribe to Pro using Ko-fi', '#72a4f2', 'G2G81FXIN4');
        window.kofiwidget2.draw();
      }
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="p-6">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  const dietaryOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten Free', value: 'gluten_free' },
    { label: 'Keto', value: 'keto' },
    { label: 'Dairy Free', value: 'dairy_free' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      {/* Account Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <div className="text-slate-400">{profile.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">First Name</label>
                <Input
                  value={profile.first_name || ''}
                  className="bg-slate-700 border-slate-600 text-slate-300"
                  disabled
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Last Name</label>
                <Input
                  value={profile.last_name || ''}
                  className="bg-slate-700 border-slate-600 text-slate-300"
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
              <Select 
                value={profile.location || 'US'} 
                onValueChange={handleLocationChange}
                disabled={isUpdating}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Budget Preference</label>
              <Select 
                value={profile.budget_preference || 'medium'} 
                onValueChange={handleBudgetChange}
                disabled={isUpdating}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Budget</SelectItem>
                  <SelectItem value="medium">Medium Budget</SelectItem>
                  <SelectItem value="high">High Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Dietary Preferences */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Dietary Preferences</h2>
          <div className="space-y-4">
            {dietaryOptions.map((diet) => (
              <div key={diet.value} className="flex items-center justify-between">
                <span className="text-slate-300">{diet.label}</span>
                <Switch 
                  checked={profile.dietary_preferences?.includes(diet.value) || false}
                  onCheckedChange={(checked) => handleDietaryChange(diet.value, checked)}
                  disabled={isUpdating}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Subscription */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Subscription</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-300 font-medium">Current Plan</div>
                <div className="text-slate-400 text-sm">
                  {profile.subscription_tier === 'pro' ? 'Pro Plan - Unlimited meal plans' : 'Free Plan - 1 meal plan per week'}
                </div>
              </div>
              {hasProAccess(profile) ? null : (
                <div className="text-center">
                  <p className="text-slate-300 mb-3">Upgrade to Pro for unlimited features!</p>
                  <div id="kofi-widget-container" className="flex justify-center"></div>
                </div>
              )}
            </div>
            {profile.subscription_tier === 'pro' && (
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-medium">✨ Pro Member</span>
                </div>
                <p className="text-slate-300 text-sm mt-1">
                  Thank you for supporting ForkCast! You have access to all premium features.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
