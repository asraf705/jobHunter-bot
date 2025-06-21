import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Input from '@/components/Input';
import Button from '@/components/Button';
import JobCard, { JobData } from '@/components/JobCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export default function Search() {
  const router = useRouter();
  const { keyword, location } = router.query;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [error, setError] = useState('');
  const { savedJobs, saveJob, isJobSaved } = useSavedJobs();
  const { addSearchQuery } = useSearchHistory();

  // Initialize form with query params
  useEffect(() => {
    if (router.isReady) {
      if (typeof keyword === 'string') setSearchKeyword(keyword);
      if (typeof location === 'string') setSearchLocation(location);
      
      // If we have a keyword, search immediately
      if (typeof keyword === 'string' && keyword.trim()) {
        handleSearch(keyword, typeof location === 'string' ? location : '');
      }
    }
  }, [router.isReady, keyword, location]);

  const handleSearch = async (kw: string, loc: string) => {
    if (!kw.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Add to search history
      addSearchQuery(kw.trim(), loc.trim());
      
      // Call the API
      const response = await fetch('/api/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: kw.trim(),
          location: loc.trim(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      
      // For demo purposes, if the API isn't implemented yet, use mock data
      if (data.length === 0) {
        setJobs(generateMockJobs(kw));
      } else {
        setJobs(data);
      }
    } catch (err) {
      console.error('Error searching jobs:', err);
      setError('Failed to fetch jobs. Please try again.');
      // Use mock data for demo
      setJobs(generateMockJobs(kw));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchKeyword, searchLocation);
  };

  const handleSaveJob = (job: JobData) => {
    saveJob(job);
  };

  return (
    <div className="flex flex-col pb-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-app dark:shadow-app-dark p-4 mb-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Skills or Keywords"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="mb-0 flex-grow"
            required
          />
          <Input
            placeholder="Location (Optional)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="mb-0 flex-grow"
          />
          <Button
            type="submit"
            className="sm:w-auto"
            isLoading={isLoading}
          >
            Search
          </Button>
        </form>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Searching for jobs...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={() => handleSearch(searchKeyword, searchLocation)}>
            Try Again
          </Button>
        </div>
      ) : jobs.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {jobs.length} Results for "{searchKeyword}"
            {searchLocation && ` in ${searchLocation}`}
          </h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={handleSaveJob}
                isSaved={isJobSaved(job.id)}
              />
            ))}
          </div>
        </div>
      ) : searchKeyword ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No jobs found for your search. Try different keywords.
          </p>
        </div>
      ) : null}
    </div>
  );
}

// Mock data generator for demo purposes
function generateMockJobs(keyword: string): JobData[] {
  const companies = ['TechCorp', 'DevSolutions', 'InnovateTech', 'CodeMasters', 'WebFuture'];
  const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin'];
  const budgets = ['$50-70/hr', '$80-100/hr', '$60k-80k/year', '$90k-120k/year', 'Negotiable'];
  const timeAgo = ['2 hours ago', '1 day ago', '3 days ago', 'Just now', '1 week ago'];
  
  return Array.from({ length: 5 }, (_, i) => ({
    id: `job-${Date.now()}-${i}`,
    title: `${keyword} Developer`,
    company: companies[Math.floor(Math.random() * companies.length)],
    url: 'https://example.com/job',
    budget: budgets[Math.floor(Math.random() * budgets.length)],
    postedAt: timeAgo[Math.floor(Math.random() * timeAgo.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
  }));
}