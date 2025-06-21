import type { NextApiRequest, NextApiResponse } from 'next';
import { JobData } from '@/components/JobCard';

type SearchRequest = {
  keyword: string;
  location?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { keyword, location } = req.body as SearchRequest;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    // In a real implementation, you would call your backend API here
    // For now, we'll return mock data
    const jobs = generateMockJobs(keyword, location);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res.status(200).json(jobs);
  } catch (error) {
    console.error('Error in search-jobs API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Mock data generator
function generateMockJobs(keyword: string, location?: string): JobData[] {
  const companies = ['TechCorp', 'DevSolutions', 'InnovateTech', 'CodeMasters', 'WebFuture', 'DigitalWave', 'CloudNine'];
  const locations = location ? [location] : ['Remote', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney'];
  const budgets = ['$50-70/hr', '$80-100/hr', '$60k-80k/year', '$90k-120k/year', '$120k-150k/year', 'Negotiable'];
  const timeAgo = ['2 hours ago', '1 day ago', '3 days ago', 'Just now', '1 week ago', '2 days ago', '5 hours ago'];
  
  // Generate between 5-12 jobs
  const count = Math.floor(Math.random() * 8) + 5;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `job-${Date.now()}-${i}`,
    title: `${keyword} ${getRandomJobTitle()}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    url: 'https://example.com/job',
    budget: budgets[Math.floor(Math.random() * budgets.length)],
    postedAt: timeAgo[Math.floor(Math.random() * timeAgo.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
  }));
}

function getRandomJobTitle(): string {
  const positions = [
    'Developer', 'Engineer', 'Specialist', 'Architect', 'Consultant', 
    'Lead', 'Senior Developer', 'Full Stack Developer', 'UI/UX Designer'
  ];
  
  return positions[Math.floor(Math.random() * positions.length)];
}