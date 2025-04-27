import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRole } from '@/hooks/useRole';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Key, Moon, LogOut } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { profile, loading: profileLoading, updateProfile } = useUserProfile();
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Company profile state
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [loadingCompany, setLoadingCompany] = useState(false);
  
  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setCompany(profile.company || '');
      setPosition(profile.position || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);
  
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Fehler",
        description: "Die neuen Passwörter stimmen nicht überein",
        variant: "destructive"
      });
      return;
    }
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Erfolg",
        description: "Passwort wurde erfolgreich geändert"
      });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Passwortänderung fehlgeschlagen",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const updateCompanyInfo = async () => {
    setLoadingCompany(true);
    
    try {
      const success = await updateProfile({
        company,
        position,
        phone
      });
      
      if (!success) throw new Error("Profilaktualisierung fehlgeschlagen");
      
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Aktualisierung fehlgeschlagen",
        variant: "destructive"
      });
    } finally {
      setLoadingCompany(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Einstellungen</h1>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="profile" className="border rounded-lg p-4 shadow-sm">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <User className="h-5 w-5" />
            Profilinformationen
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input id="email" value={user?.email || ''} readOnly disabled />
                <p className="text-sm text-muted-foreground">Ihre E-Mail-Adresse kann nicht geändert werden</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Unternehmen</Label>
                <Input 
                  id="company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  placeholder="Ihr Unternehmen"
                  disabled={profileLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value)} 
                  placeholder="Ihre Position"
                  disabled={profileLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="Ihre Telefonnummer"
                  disabled={profileLoading}
                />
              </div>
              
              <Button 
                onClick={updateCompanyInfo} 
                disabled={loadingCompany || profileLoading}
                className="w-full"
              >
                {loadingCompany && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Profilinformationen speichern
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="password" className="border rounded-lg p-4 shadow-sm mt-4">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <Key className="h-5 w-5" />
            Passwort ändern
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Aktuelles Passwort</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Neues Passwort</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handlePasswordChange} 
                disabled={isUpdating}
                className="w-full"
              >
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Passwort ändern
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="appearance" className="border rounded-lg p-4 shadow-sm mt-4">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <Moon className="h-5 w-5" />
            Darstellungsoptionen
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle" className="flex-1">
                Dunkler Modus
              </Label>
              <Switch
                id="theme-toggle"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="account" className="border rounded-lg p-4 shadow-sm mt-4">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <LogOut className="h-5 w-5" />
            Konto
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SettingsPage;
