import { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="flex-grow pt-16 pb-16 px-4 max-w-screen-md mx-auto w-full">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;