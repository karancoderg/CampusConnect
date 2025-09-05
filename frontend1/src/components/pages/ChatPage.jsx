import React from 'react';
import { Plus, Users, Calendar, MessageSquare, BookOpen, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import useAppStore from '@/store/useAppStore';

const LeftSidebar = () => {
  const { 
    setCreatePostModalOpen, 
    setCreateEventModalOpen, 
    studyNotes, 
    addStudyNote, 
    removeStudyNote,
    isMobileMenuOpen,
    toggleMobileMenu
  } = useAppStore();
  const navigate = useNavigate();

  const quickActions = [
    { 
      icon: Plus, 
      label: 'Create Post', 
      action: () => setCreatePostModalOpen(true),
      color: 'bg-primary hover:bg-primary/90'
    },
    { 
      icon: Calendar, 
      label: 'Create Event', 
      action: () => setCreateEventModalOpen(true),
      color: 'bg-secondary hover:bg-secondary/90'
    },
    { 
      icon: MessageSquare, 
      label: 'Start Chat', 
      action: () => navigate('/chat'),
      color: 'bg-accent-teal hover:bg-accent-teal/90'
    }
  ];

  const menuItems = [
    { icon: Users, label: 'Communities', count: 12, path: '/explore' },
    { icon: Calendar, label: 'Events', count: 5, path: '/local' },
    { icon: BookOpen, label: 'Study Groups', count: 3, path: '/skills' },
    { icon: Heart, label: 'Wellness', count: 8, path: '/wellness' },
    { icon: MessageSquare, label: 'Anonymous Advice', count: 15, path: '/wellness' }
  ];

  const handleAddStudyNote = () => {
    const title = prompt('Enter study note title:');
    if (title) {
      addStudyNote({
        title,
        status: 'In Progress',
        dueDate: 'No due date'
      });
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-16 left-0 z-50 lg:z-auto
        w-72 sm:w-80 lg:w-64 xl:w-72
        h-[calc(100vh-4rem)] lg:h-screen
        bg-background border-r border-gray-700 
        overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-heading font-bold text-foreground">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="text-foreground hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700 p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-3 sm:mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    action.action();
                    if (isMobileMenuOpen) toggleMobileMenu();
                  }}
                  className={`w-full justify-start ${action.color} text-white text-sm sm:text-base`}
                  size="sm"
                >
                  <action.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
                  {action.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Navigation Menu */}
          <Card className="bg-gray-800 border-gray-700 p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-3 sm:mb-4">
              Menu
            </h3>
            <nav className="space-y-1 sm:space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobileMenuOpen) toggleMobileMenu();
                  }}
                  className="w-full flex items-center justify-between p-2 sm:p-3 text-foreground hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-gray-400" />
                    <span className="font-paragraph text-sm sm:text-base">{item.label}</span>
                  </div>
                  <span className="bg-gray-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {item.count}
                  </span>
                </button>
              ))}
            </nav>
          </Card>

          {/* Study Buddy Notes */}
          <Card className="bg-gray-800 border-gray-700 p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-3 sm:mb-4">
              Study Notes
            </h3>
            <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
              {studyNotes.map((note) => (
                <div key={note.id} className="bg-gray-700 p-2 sm:p-3 rounded-lg group relative">
                  <h4 className="font-paragraph font-medium text-foreground text-sm sm:text-base pr-6">
                    {note.title}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                    {note.status} • {note.dueDate}
                  </p>
                  <button
                    onClick={() => removeStudyNote(note.id)}
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-opacity"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              ))}
              {studyNotes.length === 0 && (
                <div className="text-center py-3 sm:py-4">
                  <p className="text-gray-400 text-sm font-paragraph">No study notes yet</p>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 sm:mt-3 border-gray-600 text-foreground hover:bg-gray-700 text-sm"
              onClick={handleAddStudyNote}
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Note
            </Button>
          </Card>

          {/* AI Feedback Section */}
          <Card className="bg-gray-800 border-gray-700 p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-3 sm:mb-4">
              AI Study Assistant
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 p-2 sm:p-3 rounded-lg border border-accent-purple/30">
                <p className="text-foreground text-xs sm:text-sm font-paragraph">
                  Upload your notes for AI-powered insights and study tips!
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-accent-purple text-accent-purple hover:bg-accent-purple/10 text-sm"
                onClick={() => {
                  navigate('/skills');
                  if (isMobileMenuOpen) toggleMobileMenu();
                }}
              >
                Upload Notes
              </Button>
            </div>
          </Card>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;