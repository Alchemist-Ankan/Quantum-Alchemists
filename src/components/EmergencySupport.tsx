import { useState, useEffect } from "react";

interface CrisisResource {
  name: string;
  number: string;
  description: string;
  type: 'call';
  availability: string;
}

export default function EmergencySupport() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSafetyPlan, setShowSafetyPlan] = useState(false);
  const [personalContacts, setPersonalContacts] = useState<string[]>([]);
  const [newContact, setNewContact] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState<Array<{content: string, timestamp: string}>>([]);
  const [showJournalHistory, setShowJournalHistory] = useState(false);

  // Load personal contacts and journal entries from localStorage on component mount
  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('personalContacts');
      if (savedContacts) {
        setPersonalContacts(JSON.parse(savedContacts));
      }
      
      // Load journal entries
      const savedJournalEntries = localStorage.getItem('emergencyJournalEntries');
      if (savedJournalEntries) {
        setJournalEntries(JSON.parse(savedJournalEntries));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  // Save personal contacts to localStorage whenever they change
  const savePersonalContacts = (contacts: string[]) => {
    try {
      setPersonalContacts(contacts);
      localStorage.setItem('personalContacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving personal contacts:', error);
      alert('Failed to save contact. Please try again.');
    }
  };

  const crisisResources: CrisisResource[] = [
    {
      name: "Tele MANAS (National Mental Health Helpline)",
      number: "14416",
      description: "National mental health helpline by Ministry of Health & Family Welfare",
      type: "call",
      availability: "24/7"
    },
    {
      name: "Vandrevala Foundation",
      number: "1860 2662 345",
      description: "Free confidential mental health support and crisis intervention",
      type: "call",
      availability: "24/7"
    },
    {
      name: "Aasra Suicide Prevention",
      number: "022 2754 6669",
      description: "Mumbai-based suicide prevention helpline",
      type: "call",
      availability: "24/7"
    },
    {
      name: "SNEHA Chennai",
      number: "044 2464 0050",
      description: "Suicide prevention and emotional support",
      type: "call",
      availability: "24/7"
    },
    {
      name: "iCall TISS Mumbai",
      number: "022 2552 1111",
      description: "Psychosocial helpline by Tata Institute of Social Sciences",
      type: "call",
      availability: "Mon-Sat 8AM-10PM"
    },
    {
      name: "Connecting NGO Pune",
      number: "1800 843 4353",
      description: "Mental health support and counseling services",
      type: "call",
      availability: "Daily 12PM-8PM"
    },
    {
      name: "Roshni Hyderabad",
      number: "040 6620 2000",
      description: "Counseling and crisis intervention services",
      type: "call",
      availability: "Mon-Sat 11AM-9PM"
    },
    {
      name: "SAHAI Bangalore",
      number: "080 2549 7777",
      description: "24-hour helpline for emotional support",
      type: "call",
      availability: "Mon-Sat 10AM-8PM"
    }
  ];

  const copingStrategies = [
    "Take 5 deep breaths (inhale for 4, hold for 4, exhale for 6)",
    "Name 5 things you can see, 4 things you can touch, 3 things you can hear",
    "Call a trusted friend or family member",
    "Practice pranayama (breathing exercises) or meditation",
    "Listen to calming music, mantras, or devotional songs",
    "Write down your feelings in a journal",
    "Take a warm shower or bath",
    "Practice progressive muscle relaxation or yoga",
    "Connect with your local temple, mosque, church, or gurudwara",
    "Reach out to your community or neighborhood support groups"
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  const handleAddContact = () => {
    if (newContact.trim()) {
      const updatedContacts = [...personalContacts, newContact.trim()];
      savePersonalContacts(updatedContacts);
      setNewContact('');
      setShowAddContact(false);
    }
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = personalContacts.filter((_, i) => i !== index);
    savePersonalContacts(updatedContacts);
  };

  const startMeditation = () => {
    setShowMeditation(true);
    // Auto-close after 5 minutes
    setTimeout(() => setShowMeditation(false), 5 * 60 * 1000);
  };

  const startBreathing = () => {
    setShowBreathing(true);
    // Auto-close after 2 minutes
    setTimeout(() => setShowBreathing(false), 2 * 60 * 1000);
  };

  const openJournal = () => {
    setShowJournal(true);
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim()) {
      const timestamp = new Date().toLocaleString();
      const newEntry = { content: journalEntry, timestamp };
      const entries = JSON.parse(localStorage.getItem('emergencyJournalEntries') || '[]');
      entries.push(newEntry);
      localStorage.setItem('emergencyJournalEntries', JSON.stringify(entries));
      
      // Update state to reflect the new entry
      setJournalEntries(entries);
      setJournalEntry('');
      setShowJournal(false);
      alert('Journal entry saved successfully!');
    }
  };

  const deleteJournalEntry = (index: number) => {
    const updatedEntries = journalEntries.filter((_, i) => i !== index);
    localStorage.setItem('emergencyJournalEntries', JSON.stringify(updatedEntries));
    setJournalEntries(updatedEntries);
  };

  const exportJournalEntries = () => {
    if (journalEntries.length === 0) {
      alert('No journal entries to export.');
      return;
    }

    const exportData = journalEntries.map(entry => 
      `Date: ${entry.timestamp}\n\n${entry.content}\n\n${'='.repeat(50)}\n\n`
    ).join('');

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emergency-journal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const findSupport = () => {
    // Scroll to crisis resources
    const resourcesElement = document.querySelector('[data-crisis-resources]');
    if (resourcesElement) {
      resourcesElement.scrollIntoView({ behavior: 'smooth' });
      if (!isExpanded) {
        setIsExpanded(true);
      }
    }
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          🆘 Emergency Support
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm"
        >
          {isExpanded ? 'Hide' : 'Show Resources'}
        </button>
      </div>

      {/* Crisis Alert */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
          🚨 If you're in crisis or having thoughts of self-harm:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleCall('14416')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center"
          >
            📞 Call 14416 (Tele MANAS)
          </button>
          <button
            onClick={() => handleCall('1860 2662 345')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center"
          >
            💬 Call Vandrevala Foundation
          </button>
        </div>
        <p className="text-sm text-red-700 dark:text-red-300 mt-2">
          आप अकेले नहीं हैं। सहायता 24/7 उपलब्ध है। (You are not alone. Help is available 24/7.)
        </p>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Crisis Resources */}
          <div data-crisis-resources>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Crisis Support Resources
            </h4>
            <div className="grid gap-3">
              {crisisResources.map((resource, index) => (
                <div key={index} className="bg-gray-50/80 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {resource.name}
                    </h5>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      {resource.availability}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCall(resource.number)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-all"
                    >
                      📞 Call {resource.number}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Plan */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Personal Safety Plan
              </h4>
              <button
                onClick={() => setShowSafetyPlan(!showSafetyPlan)}
                className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded transition-all text-sm"
              >
                {showSafetyPlan ? 'Hide' : 'Create Plan'}
              </button>
            </div>

            {showSafetyPlan && (
              <div className="bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-3">
                  Immediate Coping Strategies
                </h5>
                <div className="grid gap-2">
                  {copingStrategies.map((strategy, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-teal-600 dark:text-teal-400 mr-2">•</span>
                      <span className="text-sm text-teal-700 dark:text-teal-300">
                        {strategy}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded border">
                  <h6 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Emergency Contacts (India)
                  </h6>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Police Emergency:</strong> 100</p>
                    <p><strong>Medical Emergency:</strong> 108</p>
                    <p><strong>National Emergency Number:</strong> 112</p>
                    <p><strong>Women Helpline:</strong> 181</p>
                    <p><strong>Child Helpline:</strong> 1098</p>
                    <p className="mt-2 text-xs">Add trusted friends, family members, or mental health professionals you can contact during difficult times.</p>
                  </div>
                  
                  {/* Personal Contacts List */}
                  {personalContacts.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Contacts:</p>
                      {personalContacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg border">
                          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 flex-1 mr-2 break-words">{contact}</span>
                          <button
                            onClick={() => handleRemoveContact(index)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                            aria-label={`Remove contact ${contact}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Contact Form */}
                  {showAddContact ? (
                    <div className="mt-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg space-y-3">
                      <input
                        type="text"
                        value={newContact}
                        onChange={(e) => setNewContact(e.target.value)}
                        placeholder="Enter contact name and number (e.g., John Doe - 9876543210)"
                        className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        aria-label="Contact name and number"
                      />
                      <div className="flex gap-2 flex-col sm:flex-row">
                        <button
                          onClick={handleAddContact}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm sm:text-base transition-all order-1"
                        >
                          Save Contact
                        </button>
                        <button
                          onClick={() => setShowAddContact(false)}
                          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm sm:text-base transition-all order-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddContact(true)}
                      className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm sm:text-base transition-all"
                    >
                      + Add Personal Contact
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">
              🌟 Quick Wellness Actions (तत्काल स्वास्थ्य क्रियाएं)
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <button 
                onClick={startMeditation}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    startMeditation();
                  }
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded transition-all text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Start guided meditation session"
              >
                🧘 Start Meditation (ध्यान)
              </button>
              <button 
                onClick={startBreathing}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    startBreathing();
                  }
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded transition-all text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Start pranayama breathing exercise"
              >
                🌬️ Pranayama (प्राणायाम)
              </button>
              <button 
                onClick={openJournal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openJournal();
                  }
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded transition-all text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                aria-label="Open emergency journal for thoughts and feelings"
              >
                📝 Journal Entry (डायरी)
              </button>
              <button 
                onClick={() => setShowJournalHistory(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded transition-all text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                aria-label="View past journal entries"
              >
                📖 View Journal History
              </button>
              <button 
                onClick={findSupport}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    findSupport();
                  }
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded transition-all text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 col-span-2 lg:col-span-1"
                aria-label="Find additional support resources"
              >
                🤝 Find Support (सहायता)
              </button>
            </div>
          </div>

          {/* India-specific Mental Health Information */}
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">
              Mental Health Rights in India
            </h4>
            <div className="text-sm text-green-700 dark:text-green-300 space-y-2">
              <p><strong>Mental Healthcare Act 2017:</strong> You have the right to mental healthcare and treatment.</p>
              <p><strong>Right to Information:</strong> You can access information about your mental health condition and treatment.</p>
              <p><strong>Right to Community Living:</strong> You have the right to live in the community and not be discriminated against.</p>
              <p><strong>Advanced Directives:</strong> You can make decisions about your future treatment when you are well.</p>
              <div className="mt-3 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                <p className="text-xs"><strong>National Mental Health Policy 2014:</strong> India recognizes mental health as a fundamental right. Free mental health services are available through government hospitals and primary health centers.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Meditation Modal */}
      {showMeditation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">🧘 Guided Meditation</h3>
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Take a moment to breathe deeply and center yourself.</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Focus on your breath... In and out... Let go of your worries...</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowMeditation(false)}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breathing Exercise Modal */}
      {showBreathing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">🌬️ Pranayama (4-4-6 Breathing)</h3>
            <div className="text-center space-y-4">
              <div className="animate-bounce">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4"></div>
              </div>
              <div className="space-y-2 text-sm sm:text-base">
                <p className="text-gray-700 dark:text-gray-300">Inhale for 4 counts</p>
                <p className="text-gray-700 dark:text-gray-300">Hold for 4 counts</p>
                <p className="text-gray-700 dark:text-gray-300">Exhale for 6 counts</p>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Continue this pattern to calm your mind and body.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowBreathing(false)}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  End Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journal Modal */}
      {showJournal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-lg w-full mx-4 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">📝 Emergency Journal Entry</h3>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Write down your thoughts and feelings. This can help process difficult emotions.</p>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Express your thoughts here..."
                className="w-full h-24 sm:h-32 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none text-sm sm:text-base"
                aria-label="Journal entry text area"
              />
              <div className="flex gap-3 justify-end flex-col sm:flex-row">
                <button
                  onClick={() => setShowJournal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveJournalEntry}
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all text-sm sm:text-base order-1 sm:order-2"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journal History Modal */}
      {showJournalHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-2xl w-full mx-4 shadow-2xl border border-white/20 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">📖 Journal History</h3>
              <button
                onClick={() => setShowJournalHistory(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close journal history"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {journalEntries.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No journal entries yet.</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Start writing to see your entries here.</p>
                </div>
              ) : (
                journalEntries.slice().reverse().map((entry, index) => (
                  <div key={index} className="bg-white/60 dark:bg-gray-700/60 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</span>
                      <button
                        onClick={() => deleteJournalEntry(journalEntries.length - 1 - index)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete journal entry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={exportJournalEntries}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                disabled={journalEntries.length === 0}
              >
                📥 Export Journal
              </button>
              <button
                onClick={() => setShowJournalHistory(false)}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}