import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
  }
}

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // App is already installed, don't show the prompt
    }

    // Check if user previously dismissed the prompt
    const hasUserDismissedPrompt = localStorage.getItem('pwaPromptDismissed');
    if (hasUserDismissedPrompt) {
      setIsDismissed(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setInstallPrompt(e);
      // Show the install prompt after a delay
      setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Show the install prompt
    await installPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;

    // Reset the install prompt variable
    setInstallPrompt(null);
    setIsVisible(false);

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
      // Store the dismissal in localStorage
      localStorage.setItem('pwaPromptDismissed', 'true');
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store the dismissal in localStorage
    localStorage.setItem('pwaPromptDismissed', 'true');
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed || !installPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-40 max-w-md mx-auto"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Install JobHunterBot
            </h3>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Dismiss"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Install JobHunterBot on your device for a better experience and quick access to job searches.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={handleInstallClick}
              fullWidth
            >
              Install App
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
            >
              Not Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;