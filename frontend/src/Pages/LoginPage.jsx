import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, Phone, Mail } from 'lucide-react';

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'phone', 'google'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData, 'Method:', loginMethod);
    // Handle authentication logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    // Handle Google OAuth
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your trading account</p>
          </div>

          {/* Login Method Selector */}
          <div className="flex mb-6 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </button>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <input
                type={loginMethod === 'email' ? 'email' : 'tel'}
                name={loginMethod}
                value={formData[loginMethod]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                placeholder={
                  loginMethod === 'email' 
                    ? 'trader@example.com' 
                    : '+1 (555) 123-4567'
                }
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 pr-12 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-500 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In to Trading Platform
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            🔒 Your data is encrypted and secure. We use industry-standard security protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;