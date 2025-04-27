import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  email: z.string().email("Gültige E-Mail-Adresse erforderlich"),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen haben"),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const { t } = useTranslation();

  // If user is already logged in, redirect to dashboard
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      if (isLogin) {
        await signIn(values.email, values.password);
        navigate('/', { replace: true });
      } else {
        await signUp(values.email, values.password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <LineChart className="h-10 w-10 text-lean-blue" />
          <h1 className="text-2xl font-bold">LeanFlow</h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? t('login.signInToContinue') : t('login.createAccount')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('login.emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLogin ? t('login.signIn') : t('login.register')}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary"
          >
            {isLogin ? t('login.createNewAccount') : t('login.alreadyHaveAccount')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
