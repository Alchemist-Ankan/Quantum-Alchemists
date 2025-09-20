/**
 * Data cleanup utilities for localStorage optimization
 */

interface MoodEntry {
  date: string;
  mood: string;
  timestamp: number;
}

// Maximum number of mood entries to keep (3 months worth)
const MAX_MOOD_ENTRIES = 90;

// Maximum age for mood entries (6 months in milliseconds)
const MAX_MOOD_AGE = 6 * 30 * 24 * 60 * 60 * 1000;

/**
 * Clean old mood data to prevent localStorage from growing too large
 */
export const cleanupMoodData = (): void => {
  try {
    const moodHistory = localStorage.getItem("moodHistory");
    if (!moodHistory) return;

    const entries: MoodEntry[] = JSON.parse(moodHistory);
    const now = Date.now();
    
    // Filter out entries older than MAX_MOOD_AGE and limit total count
    const cleanedEntries = entries
      .filter(entry => (now - entry.timestamp) < MAX_MOOD_AGE)
      .slice(0, MAX_MOOD_ENTRIES);

    // Only update localStorage if we actually removed entries
    if (cleanedEntries.length < entries.length) {
      localStorage.setItem("moodHistory", JSON.stringify(cleanedEntries));
      console.log(`Cleaned up mood data: ${entries.length} -> ${cleanedEntries.length} entries`);
    }
  } catch (error) {
    console.error('Error cleaning up mood data:', error);
  }
};

/**
 * Clean up personal contacts (remove duplicates, trim whitespace)
 */
export const cleanupPersonalContacts = (): void => {
  try {
    const contacts = localStorage.getItem("personalContacts");
    if (!contacts) return;

    const contactList: string[] = JSON.parse(contacts);
    
    // Remove duplicates and trim whitespace
    const cleanedContacts = [...new Set(
      contactList
        .map(contact => contact.trim())
        .filter(contact => contact.length > 0)
    )];

    // Only update if we made changes
    if (cleanedContacts.length !== contactList.length || 
        !contactList.every((contact, index) => contact === cleanedContacts[index])) {
      localStorage.setItem("personalContacts", JSON.stringify(cleanedContacts));
      console.log(`Cleaned up personal contacts: ${contactList.length} -> ${cleanedContacts.length} entries`);
    }
  } catch (error) {
    console.error('Error cleaning up personal contacts:', error);
  }
};

/**
 * Run all cleanup tasks
 */
export const runDataCleanup = (): void => {
  cleanupMoodData();
  cleanupPersonalContacts();
};

/**
 * Check if cleanup is needed (run weekly)
 */
export const shouldRunCleanup = (): boolean => {
  try {
    const lastCleanup = localStorage.getItem("lastDataCleanup");
    if (!lastCleanup) return true;
    
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    return parseInt(lastCleanup) < weekAgo;
  } catch {
    return true;
  }
};

/**
 * Mark that cleanup was run
 */
export const markCleanupComplete = (): void => {
  try {
    localStorage.setItem("lastDataCleanup", Date.now().toString());
  } catch (error) {
    console.error('Error marking cleanup complete:', error);
  }
};