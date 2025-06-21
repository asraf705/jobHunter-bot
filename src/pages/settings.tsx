import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, TrashIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useSavedJobs } from '@/hooks/useSavedJobs';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { clearSearchHistory } = useSearchHistory();
  const { clearSavedJobs } = useSavedJobs();
  const [showTerms, setShowTerms] = useState(false);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);
  const [showClearSavedConfirm, setShowClearSavedConfirm] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleClearHistory = () => {
    setShowClearHistoryConfirm(true);
  };

  const confirmClearHistory = () => {
    clearSearchHistory();
    setShowClearHistoryConfirm(false);
  };

  const handleClearSaved = () => {
    setShowClearSavedConfirm(true);
  };

  const confirmClearSaved = () => {
    clearSavedJobs();
    setShowClearSavedConfirm(false);
  };

  return (
    <div className="flex flex-col pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Settings
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                App Theme
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Toggle between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Clear Search History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Search History
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Clear your recent search history
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHistory}
              icon={<TrashIcon className="h-4 w-4" />}
            >
              Clear
            </Button>
          </div>

          {showClearHistoryConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Are you sure you want to clear your search history?
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearHistoryConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={confirmClearHistory}
                >
                  Confirm
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Clear Saved Jobs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Saved Jobs
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Clear all your saved jobs
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearSaved}
              icon={<TrashIcon className="h-4 w-4" />}
            >
              Clear
            </Button>
          </div>

          {showClearSavedConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Are you sure you want to clear all saved jobs? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearSavedConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={confirmClearSaved}
                >
                  Confirm
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Terms and Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Terms & Privacy
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                View our terms of service and privacy policy
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTerms(!showTerms)}
              icon={<InformationCircleIcon className="h-4 w-4" />}
            >
              View
            </Button>
          </div>

          {showTerms && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                Terms of Service
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                JobHunterBot is a tool for searching job opportunities. We do not guarantee the accuracy of job listings or the success of job applications. Use at your own discretion.
              </p>
              
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                We store your search history and saved jobs locally on your device. We do not collect personal information or share your data with third parties.
              </p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTerms(false)}
                className="mt-2"
              >
                Close
              </Button>
            </motion.div>
          )}
        </div>

        {/* App Version */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                App Version
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                JobHunterBot v0.1.0
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}