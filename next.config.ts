import type { NextConfig } from "next";
import withPWA from 'next-pwa';

// Define the configuration with both NextConfig and PWA options
const config: NextConfig = {
  // Next.js config
  reactStrictMode: true,
  
  // PWA config
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
};

const nextConfig = withPWA(config);

export default nextConfig;
