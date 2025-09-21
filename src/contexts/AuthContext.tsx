import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithGoogle as firebaseSignInWithGoogle, 
  signOut as firebaseSignOut, 
  onAuthStateChange,
  UserProfile,
  isFirebaseConfigured
} from '../services/firebase';

// User interface - using Firebase UserProfile
interface User extends UserProfile {}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for Firebase auth state changes
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.warn('Firebase not configured, using guest mode');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          const userProfile: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAnonymous: firebaseUser.isAnonymous,
            lastLoginAt: new Date()
          };
          
          setUser(userProfile);
          localStorage.setItem('currentUser', JSON.stringify(userProfile));
          localStorage.removeItem('guestSession');
        } else {
          // User is signed out
          const guestSession = localStorage.getItem('guestSession');
          const savedUser = localStorage.getItem('currentUser');
          
          if (savedUser && !guestSession) {
            // Clear stored user data
            setUser(null);
            localStorage.removeItem('currentUser');
          } else if (guestSession) {
            // Restore guest session
            const guestUser: User = {
              uid: `guest_${Date.now()}`,
              email: null,
              displayName: 'Guest User',
              photoURL: null,
              isAnonymous: true
            };
            setUser(guestUser);
            localStorage.setItem('currentUser', JSON.stringify(guestUser));
          }
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setError('Authentication error occurred');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google (Firebase implementation)
  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (isFirebaseConfigured()) {
        // Use real Firebase authentication
        const userProfile = await firebaseSignInWithGoogle();
        // Firebase auth state listener will handle setting the user
        console.log('Google sign-in successful:', userProfile.displayName);
      } else {
        // Fallback to mock implementation for development
        const mockGoogleUser: User = {
          uid: `google_${Date.now()}`,
          email: 'user@gmail.com',
          displayName: 'John Doe',
          photoURL: 'https://via.placeholder.com/150',
          isAnonymous: false
        };
        
        setUser(mockGoogleUser);
        localStorage.setItem('currentUser', JSON.stringify(mockGoogleUser));
        localStorage.removeItem('guestSession');
        
        console.log('Google sign-in successful (mock mode - Firebase not configured)');
      }
    } catch (error: any) {
      console.error('Google sign-in failed:', error);
      setError(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      setError(null);
      
      if (isFirebaseConfigured() && user && !user.isAnonymous) {
        // Use Firebase sign out for authenticated users
        await firebaseSignOut();
      }
      
      // Clear all user data
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('guestSession');
      
      // Clear user-specific data
      const keysToRemove = [
        'moodHistory',
        'journalEntries',
        'emergencyJournalEntries',
        'personalContacts',
        'userPreferences'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      console.log('Sign out successful');
    } catch (error: any) {
      console.error('Sign out failed:', error);
      setError('Failed to sign out');
      throw error;
    }
  };

  // Continue as guest
  const continueAsGuest = (): void => {
    const guestUser: User = {
      uid: `guest_${Date.now()}`,
      email: null,
      displayName: 'Guest User',
      photoURL: null,
      isAnonymous: true
    };
    
    setUser(guestUser);
    localStorage.setItem('guestSession', 'true');
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    setError(null);
  };

  // Computed values
  const isAuthenticated = user !== null;

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    signInWithGoogle,
    signOut,
    continueAsGuest,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};