import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const success = await signUp(formData.fullName, formData.email, formData.password);
      if (success) {
        // Redirect to home page after successful signup
        navigate('/', { replace: true });
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 order-2 md:order-1">
              <div className="text-center md:text-left mb-8">
                <h1 className="text-4xl font-bold text-foreground">Sign Up</h1>
                <p className="text-muted-foreground mt-2">Create an account to join our community.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </Button>

                  <Button variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-primary hover:text-primary/80">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Right side - Branding */}
            <div className="w-full md:w-1/2 bg-primary p-8 sm:p-12 flex flex-col justify-center items-center text-white order-1 md:order-2">
              <div className="text-center">
                <Link to="/" className="flex items-center justify-center mb-6 text-3xl font-bold">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/18363/18363848.png"
                    alt="AgriSense Logo"
                    className="w-10 h-10 mr-2"
                  />
                  AgriSense
                </Link>


                <img
                  alt="A farmer tending to crops in a field, symbolizing agriculture and technology"
                  className="max-w-xs w-full mx-auto rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD18yWELDFacWSZlTpx7r3QC4boITYlACWJGdC6upZ3RBMW-rMrFtqQhb7S4mPuzE4SsQGajtViRhSDsRVyUKTd9OxluR_Plg0nEm48Pfr0WP-6ixJoNWmxos5e-Fcj_iAoBIjwXHdapIJ2n35XKZjPi-MXVetpNf-ntjUGlrZ8SZPn_-RcK4a_nCbmABbgIkc8ZyMiNlY0_NbrTyPlTDhE1qSytzy1avn5JzsGHkoyJb8qhr7Sxnzz9InfRLtdqGzGczQO-VvFikI"
                />

                <h2 className="text-2xl font-semibold mt-6">Smart Farming for a Greener Future</h2>
                <p className="mt-2 opacity-90">
                  Join us to revolutionize agriculture with data-driven insights and sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
