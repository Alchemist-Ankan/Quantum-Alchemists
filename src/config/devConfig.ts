// 🔧 Development Configuration
// This file controls development-only features

export const DEV_CONFIG = {
  // Enable debug panels for hackathon demonstration
  SHOW_DEBUG_PANELS: false, // Set to true only for testing/demo
  
  // Enable detailed console logging
  VERBOSE_LOGGING: import.meta.env.DEV,
  
  // Enable security audit features
  SECURITY_AUDIT: import.meta.env.DEV,
  
  // Enable authentication debugging
  AUTH_DEBUG: import.meta.env.DEV,
  
  // Show performance metrics
  PERFORMANCE_MONITORING: import.meta.env.DEV,
} as const;

// 📝 Usage Instructions:
// 
// For Normal Users:
//   - All debug features are automatically disabled in production
//   - Clean user experience without development clutter
//
// For Hackathon Testing:
//   - Temporarily set SHOW_DEBUG_PANELS to true
//   - Test with debug panels visible
//   - Remember to set back to false for production
//
// For Development:
//   - All debug features are available in dev mode
//   - Console logging and monitoring enabled automatically