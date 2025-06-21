import { useRouter } from 'next/router';
import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, BookmarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, MagnifyingGlassIcon as MagnifyingGlassIconSolid, BookmarkIcon as BookmarkIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/24/solid';

const BottomNav = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      name: 'Search',
      href: '/search',
      icon: MagnifyingGlassIcon,
      activeIcon: MagnifyingGlassIconSolid,
    },
    {
      name: 'Saved',
      href: '/saved',
      icon: BookmarkIcon,
      activeIcon: BookmarkIconSolid,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      activeIcon: Cog6ToothIconSolid,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(255,255,255,0.05)] z-50 transition-colors duration-200">
      <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          const IconComponent = isActive ? item.activeIcon : item.icon;
          
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <IconComponent className="w-6 h-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;