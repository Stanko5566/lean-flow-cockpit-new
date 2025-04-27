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
import { Loader2, User, Key, Moon, LogOut, Globe } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useTranslation } from 'react-i18next';
import { useLanguage, Language } from '@/hooks/useLanguage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { profile, loading: profileLoading, updateProfile } = useUserProfile();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  
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
        title: t('settings.password.error.emptyFields'),
        description: t('settings.password.error.emptyFields'),
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: t('settings.password.error.passwordMismatch'),
        description: t('settings.password.error.passwordMismatch'),
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
        title: t('common.success'),
        description: t('settings.password.success')
      });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message || t('settings.password.error.changeFailed'),
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
      
      if (!success) throw new Error(t('profile.updateError'));
      
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message || t('profile.updateError'),
        variant: "destructive"
      });
    } finally {
      setLoadingCompany(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">{t('settings.title')}</h1>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="profile" className="border rounded-lg p-4 shadow-sm">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <User className="h-5 w-5" />
            {t('settings.profile.title')}
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('settings.profile.emailLabel')}</Label>
                <Input id="email" value={user?.email || ''} readOnly disabled />
                <p className="text-sm text-muted-foreground">{t('settings.profile.emailReadOnly')}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">{t('settings.profile.companyLabel')}</Label>
                <Input 
                  id="company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  placeholder={t('settings.profile.companyPlaceholder')}
                  disabled={profileLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">{t('settings.profile.positionLabel')}</Label>
                <Input 
                  id="position" 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value)} 
                  placeholder={t('settings.profile.positionPlaceholder')}
                  disabled={profileLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">{t('settings.profile.phoneLabel')}</Label>
                <Input 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder={t('settings.profile.phonePlaceholder')}
                  disabled={profileLoading}
                />
              </div>
              
              <Button 
                onClick={updateCompanyInfo} 
                disabled={loadingCompany || profileLoading}
                className="w-full"
              >
                {loadingCompany && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('settings.profile.saveButton')}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="password" className="border rounded-lg p-4 shadow-sm mt-4">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <Key className="h-5 w-5" />
            {t('settings.password.title')}
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t('settings.password.currentPassword')}</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('settings.password.newPassword')}</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('settings.password.confirmPassword')}</Label>
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
                {t('settings.password.changeButton')}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="language" className="border rounded-lg p-4 shadow-sm mt-4">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <Globe className="h-5 w-5" />
            {t('settings.language.title')}
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t('settings.language.selectLanguage')}</Label>
                <Select 
                  value={currentLanguage} 
                  onValueChange={(value) => changeLanguage(value as Language)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('settings.language.selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('settings.language.english')}</SelectItem>
                    <SelectItem value="de">{t('settings.language.german')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="appearance" className="border rounded-lg p-4 shadow-sm mt-4">
          <AccordionTrigger className="flex items-center gap-3 text-lg font-medium">
            <Moon className="h-5 w-5" />
            {t('settings.appearance.title')}
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle" className="flex-1">
                {t('settings.appearance.darkMode')}
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
            {t('settings.account.title')}
          </AccordionTrigger>
          <AccordionContent className="pt-4 px-2">
            <div className="space-y-4">
              {role === 'admin' && (
                <div className="mb-4">
                  <Link to="/admin">
                    <Button variant="outline" className="w-full">
                      {t('settings.account.adminDashboard')}
                    </Button>
                  </Link>
                </div>
              )}
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  {t('settings.account.loggedInAs')} {role}
                </p>
                <Button 
                  variant="destructive" 
                  onClick={() => signOut()}
                  className="w-full"
                >
                  {t('settings.account.signOut')}
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
