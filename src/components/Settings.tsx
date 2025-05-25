
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { toast } from "sonner";

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
              {profile.subscription_tier !== 'pro' && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
