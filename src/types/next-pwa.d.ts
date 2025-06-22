declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAConfig extends NextConfig {
    pwa?: {
      dest?: string;
      register?: boolean;
      skipWaiting?: boolean;
      disable?: boolean;
    };
  }

  function withPWA(config: PWAConfig): NextConfig;
  export default withPWA;
}