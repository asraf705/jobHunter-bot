import { useState, useEffect } from 'react';
import { JobData } from '@/components/JobCard';

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<JobData[]>([]);

  // Load saved jobs from localStorage on initial render
  useEffect(() => {
    const loadSavedJobs = () => {
      try {
        const savedJobsJson = localStorage.getItem('savedJobs');
        if (savedJobsJson) {
          const parsedJobs = JSON.parse(savedJobsJson);
          setSavedJobs(parsedJobs);
        }
      } catch (error) {
        console.error('Error loading saved jobs:', error);
      }
    };

    loadSavedJobs();
  }, []);

  // Save jobs to localStorage whenever savedJobs changes
  useEffect(() => {
    try {
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    } catch (error) {
      console.error('Error saving jobs to localStorage:', error);
    }
  }, [savedJobs]);

  const saveJob = (job: JobData) => {
    setSavedJobs((prevSavedJobs) => {
      // Check if job is already saved
      const isJobSaved = prevSavedJobs.some((savedJob) => savedJob.id === job.id);
      
      if (isJobSaved) {
        // Remove job if already saved
        return prevSavedJobs.filter((savedJob) => savedJob.id !== job.id);
      } else {
        // Add job if not saved
        return [...prevSavedJobs, job];
      }
    });
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  const clearSavedJobs = () => {
    setSavedJobs([]);
    localStorage.removeItem('savedJobs');
  };

  return {
    savedJobs,
    saveJob,
    isJobSaved,
    clearSavedJobs,
  };
};