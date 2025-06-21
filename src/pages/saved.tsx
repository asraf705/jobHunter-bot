import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
import JobCard from '@/components/JobCard';
import Button from '@/components/Button';
import { useSavedJobs } from '@/hooks/useSavedJobs';

export default function SavedJobs() {
  const { savedJobs, saveJob, clearSavedJobs } = useSavedJobs();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const router = useRouter();

  const handleClearConfirm = () => {
    setShowConfirmClear(true);
  };

  const handleClearCancel = () => {
    setShowConfirmClear(false);
  };

  const handleClearConfirmed = () => {
    clearSavedJobs();
    setShowConfirmClear(false);
  };

  const handleSearchClick = () => {
    router.push('/search');
  };

  return (
    <div className="flex flex-col pb-20 mt-5">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Saved Jobs
        </h1>
        {savedJobs.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearConfirm}
            icon={<TrashIcon className="h-4 w-4" />}
          >
            Clear All
          </Button>
        )}
      </motion.div>

      {showConfirmClear && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4 mb-6"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to clear all saved jobs? This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClearCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleClearConfirmed}
            >
              Yes, Clear All
            </Button>
          </div>
        </motion.div>
      )}

      {savedJobs.length > 0 ? (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={saveJob}
              isSaved={true}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
            <TrashIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Saved Jobs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xs">
            You haven't saved any jobs yet. Search for jobs and save them to view them here. 
          </p>
          <Button onClick={handleSearchClick}>
            Search Jobs
          </Button>
        </motion.div>
      )}
    </div>
  );
}