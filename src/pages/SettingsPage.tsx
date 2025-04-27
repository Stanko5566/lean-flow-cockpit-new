
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRole } from '@/hooks/useRole';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const { signOut } = useAuth();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Einstellungen</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Darstellungsoptionen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="theme-toggle" className="flex-1">
              Dunkler Modus
            </Label>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Konto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {role === 'admin' && (
            <div className="mb-4">
              <Link to="/admin">
                <Button variant="outline" className="w-full">
                  Admin Dashboard öffnen
                </Button>
              </Link>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Angemeldet als: {role}
            </p>
            <Button 
              variant="destructive" 
              onClick={() => signOut()}
              className="w-full"
            >
              Abmelden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
