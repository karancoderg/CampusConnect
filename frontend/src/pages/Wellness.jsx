// ConnectHub - Wellness Page
import React, { useState } from 'react';
import { 
  Heart, 
  Moon, 
  Sun, 
  Activity, 
  Brain, 
  Users, 
  Calendar,
  CheckCircle,
  Plus,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';

const Wellness = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [todayGoals, setTodayGoals] = useState([
    { id: 1, task: "Meditate for 10 minutes", completed: false },
    { id: 2, task: "Take a 20-minute walk", completed: true },
    { id: 3, task: "Practice gratitude journaling", completed: false },
    { id: 4, task: "Limit social media to 1 hour", completed: true }
  ]);
  
  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😤", label: "Stressed", value: "stressed" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
    { emoji: "😢", label: "Sad", value: "sad" },
    { emoji: "🚀", label: "Motivated", value: "motivated" }
  ];
  
  const wellnessStats = {
    streak: 7,
    weeklyGoals: 12,
    totalGoals: 15,
    moodAverage: "Positive",
    sleepAverage: "7.2h"
  };
  
  const resources = [
    {
      id: 1,
      title: "Mindfulness Meditation",
      description: "5-minute guided meditation for stress relief",
      duration: "5 min",
      type: "Meditation",
      color: "#10B981"
    },
    {
      id: 2,
      title: "Study Break Exercises",
      description: "Quick exercises to do between study sessions",
      duration: "10 min",
      type: "Exercise",
      color: "#3B82F6"
    },
    {
      id: 3,
      title: "Sleep Hygiene Tips",
      description: "Improve your sleep quality with these tips",
      duration: "Read",
      type: "Education",
      color: "#8B5CF6"
    },
    {
      id: 4,
      title: "Anxiety Management",
      description: "Breathing exercises for managing anxiety",
      duration: "8 min",
      type: "Breathing",
      color: "#F59E0B"
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Group Meditation Session",
      time: "2:00 PM Today",
      participants: 12,
      type: "Virtual"
    },
    {
      id: 2,
      title: "Mental Health Check-in",
      time: "4:00 PM Tomorrow",
      participants: 8,
      type: "In-person"
    }
  ];
  
  const toggleGoal = (goalId) => {
    setTodayGoals(goals => 
      goals.map(goal => 
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };
  
  const completedGoals = todayGoals.filter(goal => goal.completed).length;
  const progressPercentage = Math.round((completedGoals / todayGoals.length) * 100);
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-hub-success/10 to-hub-accent/10 rounded-xl p-6 border border-hub-success/20">
        <div className="flex items-center gap-3 mb-3">
          <Heart className="w-8 h-8 text-hub-success" />
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary">
              Wellness Hub
            </h1>
            <p className="text-muted-foreground">
              Take care of your mental and physical health
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-hub-success" />
            <span className="text-muted-foreground">{wellnessStats.streak} day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-hub-primary" />
            <span className="text-muted-foreground">
              {wellnessStats.weeklyGoals}/{wellnessStats.totalGoals} weekly goals
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-hub-warning" />
            <span className="text-muted-foreground">Mood: {wellnessStats.moodAverage}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mood Check-in */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-hub-primary" />
              How are you feeling today?
            </h2>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              {moods.map(mood => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood)}
                  className={`
                    p-4 rounded-xl text-center transition-all duration-200 hover-lift
                    ${selectedMood?.value === mood.value
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/20 border border-border/50 hover:bg-secondary/30'
                    }
                  `}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs text-muted-foreground">{mood.label}</div>
                </button>
              ))}
            </div>
            
            {selectedMood && (
              <div className="bg-gradient-to-r from-primary/5 to-hub-secondary/5 rounded-lg p-4 border border-primary/20 animate-fade-in">
                <p className="text-sm text-foreground mb-3">
                  You're feeling <strong>{selectedMood.label}</strong> today. 
                  {selectedMood.value === 'anxious' || selectedMood.value === 'stressed' 
                    ? ' Here are some resources that might help:'
                    : ' Keep up the positive energy!'
                  }
                </p>
                {(selectedMood.value === 'anxious' || selectedMood.value === 'stressed') && (
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity">
                    Get Support Resources
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Daily Goals */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-hub-accent" />
                Today's Wellness Goals
              </h2>
              <div className="text-sm text-muted-foreground">
                {completedGoals}/{todayGoals.length} completed
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-hub-success to-hub-accent rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            
            {/* Goals List */}
            <div className="space-y-3">
              {todayGoals.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left
                    ${goal.completed 
                      ? 'bg-hub-success/10 border border-hub-success/30' 
                      : 'bg-secondary/20 border border-border/50 hover:bg-secondary/30'
                    }
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center transition-colors
                    ${goal.completed 
                      ? 'bg-hub-success text-white' 
                      : 'border-2 border-muted-foreground'
                    }
                  `}>
                    {goal.completed && <CheckCircle className="w-3 h-3" />}
                  </div>
                  <span className={`
                    ${goal.completed 
                      ? 'text-muted-foreground line-through' 
                      : 'text-foreground'
                    }
                  `}>
                    {goal.task}
                  </span>
                </button>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 border-2 border-dashed border-border/50 rounded-lg text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add wellness goal
            </button>
          </div>
          
          {/* Wellness Resources */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-hub-warning" />
              Wellness Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map(resource => (
                <div 
                  key={resource.id}
                  className="bg-gradient-to-br from-secondary/10 to-accent/5 rounded-lg p-4 border border-border/50 hover-lift cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: resource.color + '20' }}
                    >
                      {resource.type === 'Meditation' && <Brain className="w-4 h-4" style={{ color: resource.color }} />}
                      {resource.type === 'Exercise' && <Activity className="w-4 h-4" style={{ color: resource.color }} />}
                      {resource.type === 'Education' && <Moon className="w-4 h-4" style={{ color: resource.color }} />}
                      {resource.type === 'Breathing' && <Heart className="w-4 h-4" style={{ color: resource.color }} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-full">
                      {resource.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {resource.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Weekly Overview</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-hub-warning" />
                  <span className="text-sm text-muted-foreground">Average Mood</span>
                </div>
                <span className="text-sm font-medium text-hub-success">Positive</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-hub-secondary" />
                  <span className="text-sm text-muted-foreground">Sleep Average</span>
                </div>
                <span className="text-sm font-medium text-foreground">7.2h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-hub-accent" />
                  <span className="text-sm text-muted-foreground">Goals Met</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {wellnessStats.weeklyGoals}/{wellnessStats.totalGoals}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-hub-primary" />
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                </div>
                <span className="text-sm font-medium text-hub-primary">{wellnessStats.streak} days</span>
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Wellness Events
            </h3>
            
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id}
                  className="p-3 bg-secondary/20 rounded-lg border border-border/50"
                >
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {event.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {event.time} • {event.type}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 bg-secondary/50 hover:bg-secondary/70 rounded-lg text-sm font-medium transition-colors">
              View All Events
            </button>
          </div>
          
          {/* Emergency Resources */}
          <div className="bg-gradient-to-br from-hub-danger/5 to-hub-warning/5 rounded-xl p-6 border border-hub-danger/20">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-hub-danger" />
              Need Immediate Help?
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-card/50 rounded-lg border border-border/30">
                <p className="font-medium text-foreground mb-1">Crisis Text Line</p>
                <p className="text-muted-foreground">Text HOME to 741741</p>
              </div>
              
              <div className="p-3 bg-card/50 rounded-lg border border-border/30">
                <p className="font-medium text-foreground mb-1">Campus Counseling</p>
                <p className="text-muted-foreground">(555) 123-4567</p>
              </div>
            </div>
            
            <button className="w-full mt-4 px-4 py-2 bg-hub-danger/20 text-hub-danger rounded-lg text-sm font-medium hover:bg-hub-danger/30 transition-colors">
              Emergency Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellness;