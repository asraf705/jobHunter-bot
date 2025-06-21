import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-app dark:shadow-app-dark z-50 transition-colors duration-200">
      <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/icons/logo.svg" 
            alt="JobHunterBot Logo" 
            width={32} 
            height={32} 
            className="rounded-md"
          />
          <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
            JobHunterBot
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md animate-slide-down">
          <nav className="max-w-screen-md mx-auto py-4 px-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/search" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link 
                  href="/saved" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link 
                  href="/settings" 
                  className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;