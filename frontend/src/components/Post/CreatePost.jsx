// ConnectHub - Create Post Component
import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { moods, communities, postTypes } from '../../data/dummyData.js';
import { 
  Image as ImageIcon, 
  Code, 
  Mic, 
  Calendar,
  Smile,
  Hash,
  Send,
  X,
  Play,
  Pause,
  Volume2
} from 'lucide-react';

const CreatePost = () => {
  const { state, actions } = useApp();
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedType, setSelectedType] = useState(postTypes[0]);
  const [unlockDate, setUnlockDate] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showCommunityPicker, setShowCommunityPicker] = useState(false);
  
  const fileInputRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(file);
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
      setRecordingTime(0);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };
  
  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim() && !imagePreview && !codeSnippet) return;
    
    const newPost = {
      userId: selectedType.name === 'Anonymous' ? 0 : state.currentUser.id,
      username: selectedType.name === 'Anonymous' ? 'anonymous' : state.currentUser.username,
      displayName: selectedType.name === 'Anonymous' ? 'Anonymous' : state.currentUser.displayName,
      avatar: selectedType.name === 'Anonymous' ? '/api/placeholder/40/40' : state.currentUser.avatar,
      community: selectedCommunity?.name || 'General',
      mood: selectedMood?.name || 'neutral',
      type: selectedType.name.toLowerCase().replace(' ', ''),
      content: content.trim(),
      isAnonymous: selectedType.name === 'Anonymous',
      ...(imagePreview && { image: imagePreview }),
      ...(codeSnippet && { codeSnippet }),
      ...(selectedType.name === 'Time Capsule' && unlockDate && {
        unlockDate: new Date(unlockDate),
        isLocked: true
      }),
      ...(selectedType.name === 'Voice Note' && {
        voiceNote: true,
        duration: recordingTime
      })
    };
    
    actions.addPost(newPost);
    
    // Reset form
    setContent('');
    setSelectedMood(null);
    setSelectedCommunity(null);
    setSelectedType(postTypes[0]);
    setUnlockDate('');
    setImage(null);
    setImagePreview(null);
    setCodeSnippet('');
    setShowCodeEditor(false);
    setRecordingTime(0);
    
    actions.addNotification({
      id: Date.now(),
      type: 'post',
      message: 'Post created successfully! 🎉',
      timestamp: new Date()
    });
  };
  
  const isFormValid = () => {
    return (content.trim() || imagePreview || codeSnippet) && 
           (selectedType.name !== 'Time Capsule' || unlockDate);
  };
  
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={state.currentUser.avatar}
            alt={state.currentUser.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              Create a post
            </h3>
            <p className="text-sm text-muted-foreground">
              Share your thoughts with the community
            </p>
          </div>
        </div>
        
        {/* Post Type Selector */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {postTypes.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedType.id === type.id 
                    ? 'bg-primary text-primary-foreground shadow-glow' 
                    : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/70'
                  }
                `}
              >
                {type.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {selectedType.description}
          </p>
        </div>
        
        {/* Content Input */}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              selectedType.name === 'Anonymous' 
                ? "Share your thoughts anonymously..."
                : selectedType.name === 'Time Capsule'
                ? "What do you want to tell your future self?"
                : "What's on your mind?"
            }
            className="w-full h-32 p-4 bg-secondary/30 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        {/* Time Capsule Date */}
        {selectedType.name === 'Time Capsule' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Unlock Date
            </label>
            <input
              type="date"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 bg-secondary/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
            />
          </div>
        )}
        
        {/* Voice Recording */}
        {selectedType.name === 'Voice Note' && (
          <div className="mb-4 bg-gradient-to-r from-hub-primary/10 to-hub-secondary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleRecording}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all duration-200
                  ${isRecording 
                    ? 'bg-hub-danger text-white animate-pulse-glow' 
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                  }
                `}
              >
                {isRecording ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  {isRecording ? 'Recording...' : 'Ready to record'}
                </p>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-hub-primary" />
                  <span className="text-sm text-muted-foreground">
                    {formatRecordingTime(recordingTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 relative">
            <img 
              src={imagePreview} 
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Code Editor */}
        {showCodeEditor && (
          <div className="mb-4">
            <div className="bg-secondary/30 rounded-lg border border-border/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border/50">
                <Code className="w-4 h-4 text-hub-primary" />
                <span className="text-sm font-medium text-foreground">Code Snippet</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowCodeEditor(false);
                    setCodeSnippet('');
                  }}
                  className="ml-auto p-1 hover:bg-secondary/50 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="// Enter your code here..."
                className="w-full h-32 p-4 bg-transparent border-none resize-none focus:outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        )}
        
        {/* Tools Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Image Upload */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              title="Add Image"
            >
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </button>
            
            {/* Code Snippet */}
            <button
              type="button"
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              className={`p-2 rounded-lg transition-colors ${
                showCodeEditor 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-secondary/50 text-muted-foreground'
              }`}
              title="Add Code Snippet"
            >
              <Code className="w-5 h-5" />
            </button>
            
            {/* Mood Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMoodPicker(!showMoodPicker)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedMood 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-secondary/50 text-muted-foreground'
                }`}
                title="Select Mood"
              >
                {selectedMood ? (
                  <span className="text-lg">{selectedMood.emoji}</span>
                ) : (
                  <Smile className="w-5 h-5" />
                )}
              </button>
              
              {showMoodPicker && (
                <div className="absolute bottom-12 left-0 bg-card border border-border rounded-xl shadow-elevated p-4 z-10 animate-scale-in">
                  <div className="grid grid-cols-4 gap-2 w-48">
                    {moods.map(mood => (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => {
                          setSelectedMood(mood);
                          setShowMoodPicker(false);
                        }}
                        className="p-2 hover:bg-secondary/50 rounded-lg transition-colors text-center"
                        title={mood.name}
                      >
                        <span className="text-lg block">{mood.emoji}</span>
                        <span className="text-xs text-muted-foreground capitalize">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Community Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCommunityPicker(!showCommunityPicker)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedCommunity 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-secondary/50 text-muted-foreground'
                }`}
                title="Select Community"
              >
                <Hash className="w-5 h-5" />
              </button>
              
              {showCommunityPicker && (
                <div className="absolute bottom-12 left-0 bg-card border border-border rounded-xl shadow-elevated p-4 z-10 animate-scale-in w-64">
                  <div className="space-y-2">
                    {communities.map(community => (
                      <button
                        key={community.id}
                        type="button"
                        onClick={() => {
                          setSelectedCommunity(community);
                          setShowCommunityPicker(false);
                        }}
                        className="w-full flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-lg transition-colors text-left"
                      >
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: community.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-foreground truncate">
                            #{community.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {community.memberCount.toLocaleString()} members
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Selected Tags */}
          <div className="flex items-center gap-2">
            {selectedCommunity && (
              <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full text-secondary-foreground">
                #{selectedCommunity.name}
              </span>
            )}
            {selectedMood && (
              <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full text-secondary-foreground flex items-center gap-1">
                <span>{selectedMood.emoji}</span>
                <span className="capitalize">{selectedMood.name}</span>
              </span>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`
            w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${isFormValid()
              ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-glow'
              : 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          <Send className="w-4 h-4" />
          {selectedType.name === 'Time Capsule' 
            ? 'Create Time Capsule' 
            : selectedType.name === 'Anonymous' 
            ? 'Post Anonymously'
            : 'Share Post'
          }
        </button>
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </form>
    </div>
  );
};

export default CreatePost;