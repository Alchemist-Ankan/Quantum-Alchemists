import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithGoogle as firebaseSignInWithGoogle, signOut as firebaseSignOut, isFirebaseConfigured } from '../services/firebase';

// User interface
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
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

  // Check for existing user session on app start
  useEffect(() => {
    const checkAuthState = () => {
      try {
        // Check localStorage for guest session
        const guestSession = localStorage.getItem('guestSession');
        const savedUser = localStorage.getItem('currentUser');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else if (guestSession) {
          // Create guest user
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
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Sign in with Google (Firebase implementation when configured)
  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isFirebaseConfigured()) {
        // Use real Firebase authentication
        const user = await firebaseSignInWithGoogle();
        const authUser: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isAnonymous: false
        };
        setUser(authUser);
        localStorage.setItem('currentUser', JSON.stringify(authUser));
        localStorage.removeItem('guestSession');
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
    } catch (error) {
      console.error('Google sign-in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      if (isFirebaseConfigured() && user && !user.isAnonymous) {
        // Use Firebase sign out for authenticated users
        await firebaseSignOut();
      }
      
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('guestSession');
      
      // Optionally clear all user-specific data
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
    } catch (error) {
      console.error('Sign out failed:', error);
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
  };

  // Computed values
  const isAuthenticated = user !== null;

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    signInWithGoogle,
    signOut,
    continueAsGuest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};