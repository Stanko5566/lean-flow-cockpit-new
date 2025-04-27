import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, UserPlus, ShieldCheck, User } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UserData {
  id: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const fetchUsers = async () => {
    try {
      const { data, error: usersError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          users:user_id (
            email
          )
        `);

      if (usersError) throw usersError;

      if (data) {
        // Process the data to extract user information
        const formattedUsers: UserData[] = data.map(item => {
          // Extract email from the nested users object
          let userEmail = 'Unknown';
          
          // Check if users exists and is an object with an email property
          if (item.users && typeof item.users === 'object') {
            // Now TypeScript knows users is an object, we can safely check for email
            const usersObj = item.users as Record<string, any>;
            if ('email' in usersObj && typeof usersObj.email === 'string') {
              userEmail = usersObj.email;
            }
          }
          
          return {
            id: item.user_id as string,
            email: userEmail,
            role: item.role as string
          };
        });
        
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: t('common.error'),
        description: t('admin.errorLoadingUsers'),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: t('common.success'),
        description: t('admin.roleUpdatedSuccess')
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: t('common.error'),
        description: t('admin.errorUpdatingRole'),
        variant: "destructive"
      });
    }
  };

  const addNewUser = async () => {
    if (!email || !password) {
      toast({
        title: t('common.error'),
        description: t('admin.emailPasswordRequired'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create the user in Supabase Auth
      const { data: userData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (authError) throw authError;

      if (!userData.user) {
        throw new Error(t('admin.userCreationFailed'));
      }

      // Check if the user already has a role assigned
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userData.user.id);
      
      if (checkError) {
        throw checkError;
      }

      // If the user already has a role, update it instead of inserting
      if (existingRole && existingRole.length > 0) {
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: role })
          .eq('user_id', userData.user.id);
          
        if (updateError) throw updateError;
      } else {
        // 2. Add the user role to the user_roles table if they don't have one
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userData.user.id,
            role: role,
          });
          
        if (insertError) {
          // If it's a unique constraint error, try to update instead
          if (insertError.message.includes('user_roles_user_id_role_key')) {
            const { error: updateError } = await supabase
              .from('user_roles')
              .update({ role: role })
              .eq('user_id', userData.user.id);
              
            if (updateError) throw updateError;
          } else {
            throw insertError;
          }
        }
      }

      toast({
        title: t('common.success'),
        description: t('admin.userCreatedSuccess', { email }),
      });

      // Reset form and close dialog
      setEmail('');
      setPassword('');
      setRole('user');
      setAddUserOpen(false);
      
      // Refresh the user list
      fetchUsers();
    } catch (error: any) {
      console.error('Error adding user:', error);
      toast({
        title: t('common.error'),
        description: error.message || t('admin.errorAddingUser'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t('admin.title')}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('admin.userManagement')}</CardTitle>
              <CardDescription>{t('admin.userManagementDescription')}</CardDescription>
            </div>
            <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" /> {t('admin.addUser')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.addNewUser')}</DialogTitle>
                  <DialogDescription>
                    {t('admin.fillUserDetails')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('login.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">{t('admin.role')}</Label>
                    <Select value={role} onValueChange={(value: 'admin' | 'user') => setRole(value)}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder={t('admin.selectRole')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">{t('admin.userRole')}</SelectItem>
                        <SelectItem value="admin">{t('admin.adminRole')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={addNewUser} disabled={isSubmitting}>
                    {isSubmitting ? t('common.saving') : t('common.save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">{t('common.loading')}</div>
          ) : (
            <div className="space-y-4">
              {users.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  {t('admin.noUsers')}
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-md border"
                  >
                    <div className="flex items-center gap-3">
                      {user.role === 'admin' ? (
                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                      ) : (
                        <User className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium">{user.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.role === 'admin' ? t('admin.adminRole') : t('admin.userRole')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {user.role === 'admin' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserRole(user.id, 'user')}
                        >
                          {t('admin.makeUser')}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserRole(user.id, 'admin')}
                        >
                          {t('admin.makeAdmin')}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Additional admin features can be added here */}
    </div>
  );
};

export default AdminDashboard;
