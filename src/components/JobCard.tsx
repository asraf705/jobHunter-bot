// No useState needed as we're using framer-motion for animations
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export interface JobData {
  id: string;
  title: string;
  company: string;
  url: string;
  budget?: string;
  postedAt: string;
  location?: string;
}

interface JobCardProps {
  job: JobData;
  onSave: (job: JobData) => void;
  isSaved: boolean;
}

const JobCard = ({ job, onSave, isSaved }: JobCardProps) => {
  // State is managed by framer-motion's whileHover instead of React state

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(job);
  };

  const openJobLink = () => {
    window.open(job.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark overflow-hidden mb-4 transition-all duration-200"
      // Using framer-motion's built-in hover animations
      onClick={openJobLink}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {job.company}
            </p>
          </div>
          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-colors ${isSaved ? 'text-primary-500' : 'text-gray-400 hover:text-primary-500'}`}
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
          >
            {isSaved ? (
              <BookmarkSolid className="w-5 h-5" />
            ) : (
              <BookmarkOutline className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {job.location && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {job.location}
            </span>
          )}
          {job.budget && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {job.budget}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {job.postedAt}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;