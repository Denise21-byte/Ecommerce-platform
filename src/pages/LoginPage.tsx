import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Zap } from 'lucide-react';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '../utils/validationSchemas';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/authService';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'sonner';

const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { login, userRole } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: 'onChange' });
  const registerForm = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), mode: 'onChange' });

  const onLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(userRole === 'ADMIN' ? '/admin' : '/');
    } catch {
      toast.error('Invalid email or password');
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      toast.success('Account created! Please log in.');
      setMode('login');
    } catch {
      toast.error('Registration failed. Email may already be in use.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold gradient-text mb-2">
            <Zap size={24} className="text-purple-400" />
            LuxeStore
          </Link>
          <p className="text-white/50 text-sm">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="flex glass rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-purple-600 text-white' : 'text-white/50 hover:text-white'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-purple-600 text-white' : 'text-white/50 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="flex flex-col gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={loginForm.formState.errors.email?.message}
                {...loginForm.register('email')}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={loginForm.formState.errors.password?.message}
                {...loginForm.register('password')}
              />
              <Button type="submit" isLoading={loginForm.formState.isSubmitting} className="w-full mt-2 py-3">
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="flex flex-col gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                error={registerForm.formState.errors.name?.message}
                {...registerForm.register('name')}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={registerForm.formState.errors.email?.message}
                {...registerForm.register('email')}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={registerForm.formState.errors.password?.message}
                {...registerForm.register('password')}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                error={registerForm.formState.errors.confirmPassword?.message}
                {...registerForm.register('confirmPassword')}
              />
              <Button type="submit" isLoading={registerForm.formState.isSubmitting} className="w-full mt-2 py-3">
                Create Account
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;