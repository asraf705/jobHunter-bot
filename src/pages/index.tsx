import { useState } from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SplashScreen from '@/components/SplashScreen';
import InstallPWA from '@/components/InstallPWA';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const { searchHistory, addSearchQuery } = useSearchHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      addSearchQuery(keyword.trim(), location.trim());
      router.push({
        pathname: '/search',
        query: { keyword: keyword.trim(), location: location.trim() },
      });
    }
  };

  const handleHistoryItemClick = (keyword: string, location: string) => {
    router.push({
      pathname: '/search',
      query: { keyword, location },
    });
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div className="flex flex-col items-center justify-start pt-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Find Your Next Job
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Search for job opportunities that match your skills
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-6 mb-8"
          >
            <form onSubmit={handleSearch}>
              <Input
                label="Skills or Keywords"
                placeholder="React, Laravel, JavaScript..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Input
                label="Location (Optional)"
                placeholder="City, Country or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                size="lg"
                className="mt-2"
              >
                Search Jobs
              </Button>
            </form>
          </motion.div>

          {searchHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md mx-auto"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Recent Searches
              </h2>
              <div className="space-y-2">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleHistoryItemClick(item.keyword, item.location)}
                    className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.keyword}
                      </p>
                      {item.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <InstallPWA />
        </div>
      )}
    </>
  );
}
