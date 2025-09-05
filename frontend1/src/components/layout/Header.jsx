import React from 'react';
import { Menu, Search, Bell, MessageCircle, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import useAppStore from '@/store/useAppStore';

const Header = () => {
  const { toggleMobileMenu, isMobileMenuOpen } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: '/', label: 'Feed', icon: '🏠', path: '/' },
    { id: '/explore', label: 'Explore', icon: '🔍', path: '/explore' },
    { id: '/skills', label: 'Skills', icon: '🎯', path: '/skills' },
    { id: '/local', label: 'Local', icon: '📍', path: '/local' },
    { id: '/wellness', label: 'Wellness', icon: '🌱', path: '/wellness' },
    { id: '/voice', label: 'Voice', icon: '🎤', path: '/voice' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-background border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-foreground hover:bg-gray-700 p-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex items-center">
            <h1 
              className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-primary cursor-pointer" 
              onClick={() => handleNavigation('/')}
            >
              ConnectHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={`text-sm font-paragraph px-3 py-2 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search - Hidden on mobile, compact on tablet */}
            <div className="hidden sm:flex items-center bg-gray-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 w-32 sm:w-48 lg:w-64">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-1 sm:mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-foreground placeholder-gray-400 text-xs sm:text-sm focus:outline-none flex-1 min-w-0"
              />
            </div>

            {/* Mobile search button */}
            <Button variant="ghost" size="sm" className="sm:hidden text-foreground hover:bg-gray-700 p-2">
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-gray-700 relative p-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-accent-pink text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center text-[10px] sm:text-xs">
                3
              </span>
            </Button>
            
            {/* Messages */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground hover:bg-gray-700 relative p-2"
              onClick={() => handleNavigation('/chat')}
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center text-[10px] sm:text-xs">
                2
              </span>
            </Button>
            
            {/* Profile */}
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-gray-700 p-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Horizontal scroll */}
        <nav className="lg:hidden pb-3 sm:pb-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={`text-xs sm:text-sm font-paragraph whitespace-nowrap flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-gray-700'
                }`}
              >
                <span className="mr-1 sm:mr-2 text-sm">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;