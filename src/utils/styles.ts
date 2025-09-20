// Standardized styling patterns for consistent design across the application

export const cardStyles = {
  // Standard card container
  card: "p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700",
  
  // Modal container
  modal: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 dark:border-gray-700",
  
  // Modal backdrop
  modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center",
  
  // Section container
  section: "bg-gradient-to-br rounded-lg p-4 border backdrop-blur-sm",
};

export const buttonStyles = {
  // Primary button
  primary: "px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-md",
  
  // Secondary button
  secondary: "px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all",
  
  // Success button
  success: "px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all",
  
  // Warning button
  warning: "px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all",
  
  // Danger button
  danger: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all",
  
  // Emergency button
  emergency: "px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium transition-all hover:from-red-600 hover:to-pink-600 hover:shadow-lg",
};

export const inputStyles = {
  // Standard input field
  input: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
  
  // Textarea
  textarea: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none",
};

export const textStyles = {
  // Headings
  h1: "text-3xl font-bold text-gray-900 dark:text-gray-100",
  h2: "text-2xl font-bold text-gray-900 dark:text-white",
  h3: "text-xl font-bold text-gray-900 dark:text-white",
  h4: "text-lg font-semibold text-gray-800 dark:text-gray-200",
  
  // Body text
  body: "text-gray-700 dark:text-gray-300",
  small: "text-sm text-gray-600 dark:text-gray-400",
  
  // Muted text
  muted: "text-gray-500 dark:text-gray-400",
};

export const spacingStyles = {
  // Standard gaps
  gap: {
    xs: "gap-1",
    sm: "gap-2", 
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },
  
  // Standard padding
  padding: {
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  },
  
  // Standard margins  
  margin: {
    xs: "m-2",
    sm: "m-3", 
    md: "m-4",
    lg: "m-6",
    xl: "m-8",
  },
};

export const gradientStyles = {
  // Background gradients
  primary: "from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
  secondary: "from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20",
  success: "from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20",
  warning: "from-yellow-50/80 to-orange-50/80 dark:from-yellow-900/20 dark:to-orange-900/20",
  danger: "from-red-50/80 to-pink-50/80 dark:from-red-900/20 dark:to-pink-900/20",
};

// Utility function to combine class names
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};