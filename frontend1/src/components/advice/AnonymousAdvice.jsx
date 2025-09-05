import React, { useState } from 'react';
import { Plus, ArrowUp, MessageCircle, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import useAppStore from '@/store/useAppStore';

const AnonymousAdvice = () => {
  const { advice, addAdvice, upvoteAdvice } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newAdvice, setNewAdvice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Academic', 'Mental Health', 'Social', 'Career', 'Relationships', 'Finance'];

  const handleSubmit = () => {
    if (!newAdvice.trim() || !selectedCategory) return;

    addAdvice({
      content: newAdvice.trim(),
      category: selectedCategory
    });

    setNewAdvice('');
    setSelectedCategory('');
    setIsCreating(false);
  };

  const filteredAdvice = advice.filter(item => {
    const matchesFilter = filter === 'all' || 
      (filter === 'answered' && item.isAnswered) ||
      (filter === 'unanswered' && !item.isAnswered);
    
    const matchesSearch = searchTerm === '' || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-secondary/20 text-secondary',
      'Mental Health': 'bg-accent-pink/20 text-accent-pink',
      'Social': 'bg-accent-teal/20 text-accent-teal',
      'Career': 'bg-accent-purple/20 text-accent-purple',
      'Relationships': 'bg-destructive/20 text-destructive',
      'Finance': 'bg-primary/20 text-primary'
    };
    return colors[category] || 'bg-gray-600/20 text-gray-300';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          🎭 Anonymous Advice
        </h1>
        <p className="text-gray-300 font-paragraph text-lg max-w-2xl mx-auto">
          Share your concerns anonymously and get support from the community. 
          Your identity is completely protected.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search advice..."
              className="pl-10 bg-gray-700 border-gray-600 text-foreground placeholder-gray-400"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-foreground">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all" className="text-foreground">All</SelectItem>
              <SelectItem value="answered" className="text-foreground">Answered</SelectItem>
              <SelectItem value="unanswered" className="text-foreground">Unanswered</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-accent-pink hover:bg-accent-pink/90 text-white w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ask for Advice
        </Button>
      </div>

      {/* Create Advice Form */}
      {isCreating && (
        <Card className="bg-gray-800 border-gray-700 p-6">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
            Share Your Concern Anonymously
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-foreground">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-foreground">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                Your Question or Concern
              </label>
              <Textarea
                value={newAdvice}
                onChange={(e) => setNewAdvice(e.target.value)}
                placeholder="Share what's on your mind... Remember, this is completely anonymous."
                className="bg-gray-700 border-gray-600 text-foreground placeholder-gray-400 min-h-[120px] resize-none"
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewAdvice('');
                  setSelectedCategory('');
                }}
                className="border-gray-600 text-foreground hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!newAdvice.trim() || !selectedCategory}
                className="bg-accent-pink hover:bg-accent-pink/90 text-white"
              >
                Post Anonymously
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Advice List */}
      <div className="space-y-4">
        {filteredAdvice.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700 p-8 text-center">
            <div className="text-gray-400">
              <MessageCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">No advice found</h3>
              <p className="font-paragraph">
                {searchTerm ? 'Try adjusting your search terms.' : 'Be the first to ask for advice!'}
              </p>
            </div>
          </Card>
        ) : (
          filteredAdvice.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-start space-x-4">
                {/* Upvote Section */}
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => upvoteAdvice(item.id)}
                    className="text-gray-400 hover:text-accent-teal hover:bg-accent-teal/10"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-foreground font-paragraph font-semibold">
                    {item.upvotes}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-paragraph ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    {item.isAnswered && (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-paragraph">
                        ✓ Answered
                      </span>
                    )}
                    <span className="text-gray-500 text-xs">
                      Posted anonymously
                    </span>
                  </div>
                  
                  <p className="text-foreground font-paragraph leading-relaxed mb-4">
                    {item.content}
                  </p>

                  {/* Sample Responses */}
                  {item.isAnswered && (
                    <div className="bg-gray-700 rounded-lg p-4 mt-4">
                      <h4 className="font-paragraph font-semibold text-foreground mb-2">
                        💬 Community Response
                      </h4>
                      <p className="text-gray-300 font-paragraph text-sm leading-relaxed">
                        "I've been through something similar. What helped me was taking things one step at a time and reaching out to the counseling center. You're not alone in this!"
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-400 text-xs">Anonymous Helper</span>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-accent-pink text-xs">
                            Helpful (12)
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-secondary text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-4 mt-4">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-secondary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Respond
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-accent-teal">
                      Share Support
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Support Resources */}
      <Card className="bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border-accent-purple/30 p-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          🌟 Need Immediate Support?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h4 className="font-paragraph font-semibold text-foreground mb-2">
              Campus Counseling
            </h4>
            <p className="text-gray-300 text-sm mb-2">
              Free, confidential support
            </p>
            <Button variant="outline" size="sm" className="border-accent-purple text-accent-purple hover:bg-accent-purple/10">
              Contact
            </Button>
          </div>
          <div className="text-center">
            <h4 className="font-paragraph font-semibold text-foreground mb-2">
              Crisis Hotline
            </h4>
            <p className="text-gray-300 text-sm mb-2">
              24/7 emergency support
            </p>
            <Button variant="outline" size="sm" className="border-accent-pink text-accent-pink hover:bg-accent-pink/10">
              Call Now
            </Button>
          </div>
          <div className="text-center">
            <h4 className="font-paragraph font-semibold text-foreground mb-2">
              Peer Support
            </h4>
            <p className="text-gray-300 text-sm mb-2">
              Connect with trained peers
            </p>
            <Button variant="outline" size="sm" className="border-accent-teal text-accent-teal hover:bg-accent-teal/10">
              Join
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnonymousAdvice;