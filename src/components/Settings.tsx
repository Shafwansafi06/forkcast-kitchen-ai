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

const cuisineOptions = [
  "American",
  "Indian",
  "Italian",
  "Chinese",
  "Mexican",
  "Thai",
  "Japanese",
  "French",
  "Mediterranean",
  "Other"
];

const dietaryOptions = [
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Gluten Free', value: 'gluten_free' },
  { label: 'Keto', value: 'keto' },
  { label: 'Dairy Free', value: 'dairy_free' }
];

const Settings = () => {
  const { profile, updateProfile } = useProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [age, setAge] = useState(profile?.age?.toString() || "");
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>(profile?.cuisine_preferences || []);
  const [foodLikes, setFoodLikes] = useState(profile?.food_likes || "");

  useEffect(() => {
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
    setAge(profile?.age?.toString() || "");
    setCuisinePreferences(profile?.cuisine_preferences || []);
    setFoodLikes(profile?.food_likes || "");
  }, [profile]);

  const handleSaveProfile = async () => {
    setIsUpdating(true);
    const updates: any = {
      first_name: firstName,
      last_name: lastName,
      age: age ? parseInt(age) : null,
      cuisine_preferences: cuisinePreferences,
      food_likes: foodLikes
    };
    const { error } = await updateProfile(updates);
    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated');
    }
    setIsUpdating(false);
  };

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

  // Cuisine multi-select logic
  const toggleCuisine = (cuisine: string) => {
    setCuisinePreferences((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  useEffect(() => {
    // Only inject Ko-fi widget script if not Pro and only once
    if (!hasProAccess(profile)) {
      if (!document.getElementById('kofi-script')) {
        const script = document.createElement('script');
        script.id = 'kofi-script';
        script.type = 'text/javascript';
        script.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
        script.onload = () => {
          if (window.kofiwidget2) {
            window.kofiwidget2.init('Subscribe to Pro using Ko-fi', '#72a4f2', 'G2G81FXIN4');
            window.kofiwidget2.draw('kofi-widget-container');
          }
        };
        document.body.appendChild(script);
      } else if (window.kofiwidget2) {
        window.kofiwidget2.init('Subscribe to Pro using Ko-fi', '#72a4f2', 'G2G81FXIN4');
        window.kofiwidget2.draw('kofi-widget-container');
      }
    }
    // eslint-disable-next-line
  }, [profile]);

  if (!profile) {
    return (
      <div className="p-6">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      {/* Account Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">First Name</label>
              <Input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-300"
                disabled={isUpdating}
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Last Name</label>
              <Input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-300"
                disabled={isUpdating}
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <Input
                value={profile.email || ''}
                className="bg-slate-700 border-slate-600 text-slate-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Age</label>
              <Input
                type="number"
                min={0}
                value={age}
                onChange={e => setAge(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-300"
                disabled={isUpdating}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
              onClick={handleSaveProfile}
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </CardContent>
      </Card>
      {/* Dietary Preferences */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
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
      {/* Cuisine Preferences */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Cuisine Preferences</h2>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-150 ${cuisinePreferences.includes(cuisine) ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-blue-700 hover:text-white'}`}
                onClick={() => toggleCuisine(cuisine)}
                disabled={isUpdating}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Food Likes */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">What do you like to eat?</h2>
          <Input
            value={foodLikes}
            onChange={e => setFoodLikes(e.target.value)}
            placeholder="e.g. spicy food, pasta, salads, etc."
            className="bg-slate-700 border-slate-600 text-slate-300"
            disabled={isUpdating}
          />
        </CardContent>
      </Card>
      {/* Budget & Location */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Other Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
      {/* Subscription & Ko-fi */}
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
            {!hasProAccess(profile) && (
              <div className="mt-6 flex flex-col items-center">
                <p className="text-slate-300 mb-3">Upgrade to Pro for unlimited features!</p>
                <div id="kofi-widget-container" className="flex justify-center"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
