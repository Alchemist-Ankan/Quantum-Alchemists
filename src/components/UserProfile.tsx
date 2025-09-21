import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, signOut, signInWithGoogle } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setIsSigningOut(false);
      setShowProfile(false);
    }
  };

  const handleUpgradeToGoogle = async () => {
    try {
      await signInWithGoogle();
      setShowProfile(false);
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20 dark:border-gray-700 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Profile'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
            {user.isAnonymous ? '👤' : (user.displayName?.[0] || user.email?.[0] || '?')}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          {user.isAnonymous ? 'Guest' : (user.displayName || user.email)}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            showProfile ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Profile Dropdown */}
      {showProfile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowProfile(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 dark:border-gray-700 z-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Profile'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {user.isAnonymous ? '👤' : (user.displayName?.[0] || user.email?.[0] || '?')}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.isAnonymous ? 'Guest User' : (user.displayName || 'User')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.isAnonymous ? 'Temporary session' : (user.email || 'No email')}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="p-4">
              {user.isAnonymous ? (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Guest Session
                      </h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                        Your data is stored locally. Sign in with Google to sync across devices.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 dark:text-green-400">✅</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                        Account Connected
                      </h4>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                        Your data is securely synced across all devices.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Summary */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Data:
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Mood entries:</span>
                    <span>{JSON.parse(localStorage.getItem('moodHistory') || '[]').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Journal entries:</span>
                    <span>{JSON.parse(localStorage.getItem('journalEntries') || '[]').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency contacts:</span>
                    <span>{JSON.parse(localStorage.getItem('personalContacts') || '[]').length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 dark:border-gray-600 p-4 space-y-2">
              {user.isAnonymous ? (
                <button
                  onClick={handleUpgradeToGoogle}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                >
                  🔗 Sign in with Google
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowProfile(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                  >
                    ⚙️ Settings (Coming Soon)
                  </button>
                </div>
              )}
              
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningOut ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                    Signing out...
                  </span>
                ) : (
                  <>🚪 {user.isAnonymous ? 'End Session' : 'Sign Out'}</>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}