// 🧪 Firebase Database Test Script
// This script tests if Firestore is properly configured and accessible

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export const testFirestoreConnection = async () => {
  try {
    console.log('🔍 Testing Firestore connection...');
    
    // Test document reference
    const testDocRef = doc(db, 'test', 'connection');
    
    // Try to write a test document
    await setDoc(testDocRef, {
      message: 'Firestore connection test',
      timestamp: serverTimestamp(),
      environment: import.meta.env.MODE
    });
    
    console.log('✅ Write test successful');
    
    // Try to read the test document
    const docSnap = await getDoc(testDocRef);
    
    if (docSnap.exists()) {
      console.log('✅ Read test successful');
      console.log('📊 Test data:', docSnap.data());
      return {
        success: true,
        message: 'Firestore database is working correctly',
        data: docSnap.data()
      };
    } else {
      console.log('❌ Document does not exist');
      return {
        success: false,
        message: 'Could not read test document'
      };
    }
    
  } catch (error) {
    console.error('❌ Firestore test failed:', error);
    return {
      success: false,
      message: `Firestore error: ${error}`,
      error
    };
  }
};

// Test user-specific data structure
export const testUserDataStructure = async (userId: string) => {
  try {
    console.log('🧪 Testing user data structure for:', userId);
    
    // Test user profile document
    const userProfileRef = doc(db, 'users', userId);
    await setDoc(userProfileRef, {
      email: 'test@example.com',
      displayName: 'Test User',
      createdAt: serverTimestamp(),
      testMode: true
    });
    
    // Test user mood collection
    const moodRef = doc(db, 'users', userId, 'moods', 'test-mood');
    await setDoc(moodRef, {
      mood: 8,
      energy: 7,
      anxiety: 3,
      notes: 'Database structure test',
      timestamp: serverTimestamp(),
      userId // Redundant but ensures data integrity
    });
    
    console.log('✅ User data structure test successful');
    return {
      success: true,
      message: 'User-specific data structure is working',
      userPath: `users/${userId}/`
    };
    
  } catch (error) {
    console.error('❌ User data structure test failed:', error);
    return {
      success: false,
      message: `User data test error: ${error}`,
      error
    };
  }
};

// Environment-specific database configuration check
export const checkDatabaseConfiguration = () => {
  const config = {
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    apiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
    environment: import.meta.env.MODE,
    databaseInitialized: !!db
  };
  
  console.log('🔧 Database Configuration:', config);
  
  const isConfigured = !!(
    config.projectId && 
    config.authDomain && 
    config.apiKey && 
    config.databaseInitialized
  );
  
  return {
    isConfigured,
    config,
    status: isConfigured ? '✅ Ready for production' : '❌ Configuration incomplete'
  };
};