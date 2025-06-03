import React, { useState } from 'react';
import { Activity, Mail, Phone, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [resetMethod, setResetMethod] = useState('email'); // 'email' or 'phone'
  const [step, setStep] = useState('request'); // 'request', 'sent', 'verify', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 'request') {
      console.log('Password reset requested:', formData, 'Method:', resetMethod);
      setStep('sent');
      // Handle sending reset code/link
    } else if (step === 'verify') {
      console.log('Verification code submitted:', formData.verificationCode);
      setStep('reset');
      // Handle code verification
    } else if (step === 'reset') {
      console.log('New password submitted:', formData);
      // Handle password reset
    }
  };

  const handleResendCode = () => {
    console.log('Resending verification code');
    // Handle resending code
  };

  const renderRequestStep = () => (
    <div className="space-y-6">
      {/* Reset Method Selector */}
      <div className="flex mb-6 bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setResetMethod('email')}
          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
            resetMethod === 'email'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </button>
        <button
          onClick={() => setResetMethod('phone')}
          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
            resetMethod === 'phone'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4 mr-2" />
          SMS
        </button>
      </div>

      {/* Contact Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {resetMethod === 'email' ? 'Email Address' : 'Phone Number'}
        </label>
        <input
          type={resetMethod === 'email' ? 'email' : 'tel'}
          name={resetMethod}
          value={formData[resetMethod]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
          placeholder={
            resetMethod === 'email' 
              ? 'Enter your email address' 
              : 'Enter your phone number'
          }
          required
        />
        <p className="text-xs text-gray-400 mt-2">
          {resetMethod === 'email' 
            ? 'We\'ll send a password reset link to your email'
            : 'We\'ll send a verification code via SMS'
          }
        </p>
      </div>

      {/* Send Reset Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
      >
        {resetMethod === 'email' ? 'Send Reset Link' : 'Send Verification Code'}
      </button>
    </div>
  );

  const renderSentStep = () => (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
          {resetMethod === 'email' ? (
            <Mail className="w-10 h-10 text-emerald-400" />
          ) : (
            <Phone className="w-10 h-10 text-emerald-400" />
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {resetMethod === 'email' ? 'Check Your Email' : 'Check Your Phone'}
        </h3>
        <p className="text-gray-400 mb-4">
          {resetMethod === 'email' 
            ? `We've sent a password reset link to ${formData.email || 'your email address'}`
            : `We've sent a verification code to ${formData.phone || 'your phone number'}`
          }
        </p>
      </div>

      {resetMethod === 'phone' && (
        <button
          onClick={() => setStep('verify')}
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-[1.02]"
        >
          Enter Verification Code
        </button>
      )}

      {/* Resend Options */}
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Didn't receive it?</p>
        <button
          onClick={handleResendCode}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
        >
          Resend {resetMethod === 'email' ? 'email' : 'code'}
        </button>
      </div>
    </div>
  );

  const renderVerifyStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Enter Verification Code</h3>
        <p className="text-gray-400">
          Enter the 6-digit code sent to {formData.phone}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Verification Code
        </label>
        <input
          type="text"
          name="verificationCode"
          value={formData.verificationCode}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 text-center text-lg tracking-widest transition-all duration-200"
          placeholder="000000"
          maxLength={6}
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
      >
        Verify Code
      </button>

      <div className="text-center">
        <button
          onClick={handleResendCode}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
        >
          Resend verification code
        </button>
      </div>
    </div>
  );

  const renderResetStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Create New Password</h3>
        <p className="text-gray-400">
          Choose a strong password for your trading account
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
          placeholder="Enter new password"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
          placeholder="Confirm new password"
          required
        />
        {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
          <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!formData.newPassword || formData.newPassword !== formData.confirmPassword}
        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Reset Password
      </button>
    </div>
  );

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
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 'request' ? 'Reset Password' : 
               step === 'sent' ? 'Reset Link Sent' :
               step === 'verify' ? 'Verify Identity' : 'New Password'}
            </h2>
            <p className="text-gray-400">
              {step === 'request' ? 'We\'ll help you reset your password' :
               step === 'sent' ? 'Check your email or phone for instructions' :
               step === 'verify' ? 'Enter the code we sent you' :
               'You\'re almost done'}
            </p>
          </div>

          {/* Back Button (except for first step) */}
          {step !== 'request' && (
            <button
              onClick={() => {
                if (step === 'sent') setStep('request');
                else if (step === 'verify') setStep('sent');
                else if (step === 'reset') setStep('verify');
              }}
              className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}

          {/* Form Content */}
          {step === 'request' && renderRequestStep()}
          {step === 'sent' && renderSentStep()}
          {step === 'verify' && renderVerifyStep()}
          {step === 'reset' && renderResetStep()}

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{' '}
            <button
              type="button"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Back to Sign In
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            🔒 For security reasons, reset links expire in 15 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;