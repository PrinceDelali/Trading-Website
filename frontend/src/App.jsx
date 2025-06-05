import React, { useState, useEffect } from 'react';

// Firebase imports
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase/temp.js';

// Import all page components
import Dashboard from './Components/Dashboard.jsx';
import UploadAnalysis from './Components/UplaodAnalysis.jsx';
import TradingHistory from './Components/TradingHistory.jsx';
import Settings from './Components/Settings.jsx';

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
      if (user) {
        console.log('User signed in:', user.email);
        setCurrentPage('dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Firebase Authentication Functions
  const signUpWithEmail = async (email, password, firstName, lastName, phone) => {
    setLoading(true);
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(result.user, {
        displayName: `${firstName} ${lastName}`
      });

      setSuccess('Account created successfully! Welcome to ForexAI Pro!');
      console.log('User created:', result.user);
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Welcome back! Signing you in...');
      console.log('User signed in:', result.user);
      
    } catch (err) {
      console.error('Signin error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setSuccess('Google sign in successful!');
      console.log('Google user signed in:', result.user);
      
    } catch (err) {
      console.error('Google signin error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Check your inbox.');
      
    } catch (err) {
      console.error('Password reset error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentPage('welcome');
      setSuccess('Signed out successfully');
    } catch (err) {
      console.error('Signout error:', err);
      setError('Failed to sign out');
    }
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completion';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled';
      default:
        return 'An error occurred. Please try again';
    }
  };

  // Alert Component for messages
  const AlertMessage = ({ type, message, onClose }) => (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
      type === 'error' 
        ? 'bg-red-500/90 text-white border border-red-400' 
        : 'bg-emerald-500/90 text-white border border-emerald-400'
    }`}>
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-xl hover:opacity-70">×</button>
      </div>
    </div>
  );

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  );

  // Welcome Page Component
  const WelcomePage = () => (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-transparent to-emerald-900/40"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">📈</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Welcome to</span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              ForexAI Pro
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered forex trading analysis platform
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Upload your trading charts and get instant AI insights, market analysis, 
            and personalized trading recommendations powered by cutting-edge technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setCurrentPage('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Started Free
            </button>
            
            <button
              onClick={() => setCurrentPage('login')}
              className="w-full sm:w-auto px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>

          {/* Demo Navigation - Remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/20">
              <h3 className="text-white font-semibold mb-4">🔧 Demo Navigation (Development Only)</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage('upload')}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  Upload Analysis
                </button>
                <button
                  onClick={() => setCurrentPage('history')}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  Trading History
                </button>
                <button
                  onClick={() => setCurrentPage('settings')}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                >
                  Settings
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Note: These buttons bypass authentication for development testing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Login Page Component
  const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      signInWithEmail(formData.email, formData.password);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => setCurrentPage('welcome')}
              className="mb-4 text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              ← Back to Home
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your trading account</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="trader@example.com"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your password"
                disabled={loading}
                required
              />
            </div>
            
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <LoadingSpinner /> : 'Sign In'}
            </button>
            
            <button 
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors disabled:opacity-50"
            >
              {loading ? <LoadingSpinner /> : '🔍 Continue with Google'}
            </button>
            
            <div className="text-center space-y-2">
              <button
                onClick={() => setCurrentPage('forgot')}
                className="text-emerald-400 hover:text-emerald-300 text-sm block w-full"
                disabled={loading}
              >
                Forgot Password?
              </button>
              <div className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="text-emerald-400 hover:text-emerald-300"
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Signup Page Component
  const SignupPage = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      signUpWithEmail(formData.email, formData.password, formData.firstName, formData.lastName, formData.phone);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => setCurrentPage('welcome')}
              className="mb-4 text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              ← Back to Home
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">Join ForexAI Pro</h2>
            <p className="text-gray-400">Start your trading journey</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="John"
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Doe"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="john@example.com"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone (Optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="+1 (555) 123-4567"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Create password (min 6 characters)"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Confirm password"
                disabled={loading}
                required
              />
            </div>
            
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <LoadingSpinner /> : 'Create Account'}
            </button>
            
            <button 
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors disabled:opacity-50"
            >
              {loading ? <LoadingSpinner /> : '🔍 Continue with Google'}
            </button>
            
            <div className="text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-emerald-400 hover:text-emerald-300"
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Forgot Password Page Component
  const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email) {
        setError('Please enter your email address');
        return;
      }
      resetPassword(email);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => setCurrentPage('login')}
              className="mb-4 text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              ← Back to Login
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-gray-400">Enter your email to reset password</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>
            
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <LoadingSpinner /> : 'Send Reset Link'}
            </button>
            
            <div className="text-center text-gray-400 text-sm">
              Remember your password?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-emerald-400 hover:text-emerald-300"
                disabled={loading}
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-white">Loading ForexAI Pro...</p>
        </div>
      </div>
    );
  }

  // Render current page
  const renderCurrentPage = () => {
    // For authenticated users, create a mock user object if needed for demo
    const demoUser = user || { 
      displayName: 'Demo Trader', 
      email: 'demo@forexaipro.com',
      uid: 'demo-user-123'
    };

    switch (currentPage) {
      case 'welcome':
        return <WelcomePage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'forgot':
        return <ForgotPasswordPage />;
      case 'dashboard':
        return <Dashboard user={demoUser} onSignOut={handleSignOut} onNavigate={setCurrentPage} />;
      case 'upload':
        return <UploadAnalysis user={demoUser} onNavigate={setCurrentPage} onSignOut={handleSignOut} />;
      case 'history':
        return <TradingHistory user={demoUser} onNavigate={setCurrentPage} onSignOut={handleSignOut} />;
      case 'settings':
        return <Settings user={demoUser} onNavigate={setCurrentPage} onSignOut={handleSignOut} />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="App">
      {/* Alert Messages */}
      {error && (
        <AlertMessage 
          type="error" 
          message={error} 
          onClose={() => setError('')} 
        />
      )}
      {success && (
        <AlertMessage 
          type="success" 
          message={success} 
          onClose={() => setSuccess('')} 
        />
      )}

      {renderCurrentPage()}
    </div>
  );
}