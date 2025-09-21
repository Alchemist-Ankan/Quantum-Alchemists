import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthDebug() {
  const { user, isLoading, isAuthenticated, error } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Check environment variables
    const envCheck = {
      VITE_FIREBASE_API_KEY: !!import.meta.env.VITE_FIREBASE_API_KEY,
      VITE_FIREBASE_AUTH_DOMAIN: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      VITE_FIREBASE_PROJECT_ID: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
      VITE_FIREBASE_STORAGE_BUCKET: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      VITE_FIREBASE_MESSAGING_SENDER_ID: !!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      VITE_FIREBASE_APP_ID: !!import.meta.env.VITE_FIREBASE_APP_ID,
    };

    setDebugInfo({
      environmentVariables: envCheck,
      allEnvVarsPresent: Object.values(envCheck).every(Boolean),
      nodeEnv: import.meta.env.MODE,
    });
  }, []);

  if (!import.meta.env.DEV) {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-green-400 p-4 rounded-lg shadow-lg max-w-sm text-xs font-mono z-50">
      <h3 className="text-yellow-400 font-bold mb-2">🔧 Auth Debug Panel</h3>
      
      <div className="space-y-2">
        <div>
          <span className="text-blue-400">Auth Status:</span>
          <span className={user ? 'text-green-400' : 'text-red-400'}>
            {isLoading ? ' Loading...' : user ? ' Authenticated' : ' Not Authenticated'}
          </span>
        </div>

        {user && (
          <div>
            <span className="text-blue-400">User:</span>
            <div className="ml-2 text-gray-300">
              <div>Email: {user.email}</div>
              <div>Name: {user.displayName}</div>
              <div>Photo: {user.photoURL ? '✅' : '❌'}</div>
            </div>
          </div>
        )}

        {error && (
          <div>
            <span className="text-red-400">Error:</span>
            <div className="text-red-300 ml-2 break-words">{error}</div>
          </div>
        )}

        <div>
          <span className="text-blue-400">Environment:</span>
          <div className="ml-2">
            <div className={debugInfo.allEnvVarsPresent ? 'text-green-400' : 'text-red-400'}>
              {debugInfo.allEnvVarsPresent ? '✅ All vars set' : '❌ Missing vars'}
            </div>
            <div className="text-gray-400">Mode: {debugInfo.nodeEnv}</div>
          </div>
        </div>

        {!debugInfo.allEnvVarsPresent && (
          <div className="text-red-300">
            <span className="text-red-400">Missing:</span>
            <div className="ml-2">
              {Object.entries(debugInfo.environmentVariables || {}).map(([key, value]) => 
                !value && <div key={key} className="text-xs">• {key}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}