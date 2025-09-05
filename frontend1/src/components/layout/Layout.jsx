import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import useAppStore from '@/store/useAppStore';

const Layout = () => {
  const { isMobileMenuOpen } = useAppStore();
  const location = useLocation();

  // Full-width pages that don't need sidebars
  const fullWidthPages = ['/chat'];
  const isFullWidth = fullWidthPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {isFullWidth ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <div className="flex relative">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Content */}
          <main className={`
            flex-1 min-w-0
            transition-all duration-300 ease-in-out
          `}>
            <Outlet />
          </main>

          {/* Right Sidebar - Hidden on mobile and tablet */}
          <div className="hidden xl:block">
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;