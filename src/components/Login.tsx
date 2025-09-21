import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { signInWithGoogle, continueAsGuest, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 p-8 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mind Bridge
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Your AI-powered mental wellness companion
          </p>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Welcome Back!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Sign in to sync your mood data across devices and get personalized insights for your mental wellness journey.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Login Options */}
        <div className="space-y-4">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl py-3 px-4 flex items-center justify-center space-x-3 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Continue with Google
                </span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                or
              </span>
            </div>
          </div>

          {/* Continue as Guest */}
          <button
            onClick={handleContinueAsGuest}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            Continue as Guest
          </button>
        </div>

        {/* Features Preview */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            What you'll get:
          </h3>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Sync mood data across all devices
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Personalized wellness insights
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Secure cloud backup of journal entries
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Customized emergency support contacts
            </li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Your mental health data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
}