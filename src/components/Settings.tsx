
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
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
              <div className="text-slate-400">alex@example.com</div>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue placeholder="United States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
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
            {[
              { label: 'Vegetarian', enabled: true },
              { label: 'Vegan', enabled: false },
              { label: 'Gluten Free', enabled: false },
              { label: 'Keto', enabled: false },
              { label: 'Dairy Free', enabled: false }
            ].map((diet) => (
              <div key={diet.label} className="flex items-center justify-between">
                <span className="text-slate-300">{diet.label}</span>
                <Switch checked={diet.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Meal reminders', enabled: true },
              { label: 'Grocery shopping reminders', enabled: true },
              { label: 'Weekly meal plan updates', enabled: false },
              { label: 'Nutrition goal notifications', enabled: true }
            ].map((notification) => (
              <div key={notification.label} className="flex items-center justify-between">
                <span className="text-slate-300">{notification.label}</span>
                <Switch checked={notification.enabled} />
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
                <div className="text-slate-400 text-sm">Free Plan - 1 meal plan per week</div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-900/20 border-red-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
