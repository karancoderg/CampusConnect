import React, { useState } from 'react';
import { Send, Paperclip, Smile, Users, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAppStore from '@/store/useAppStore';

const ChatInterface = () => {
  const { activeChat, setActiveChat, chatMessages, addChatMessage } = useAppStore();
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('study-group-1');

  const chatList = [
    {
      id: 'study-group-1',
      name: 'Calculus Study Group',
      type: 'group',
      lastMessage: 'Anyone free for practice problems?',
      timestamp: '2m ago',
      unread: 3,
      members: 8
    },
    {
      id: 'private-sarah',
      name: 'Sarah Chen',
      type: 'private',
      lastMessage: 'Thanks for the notes!',
      timestamp: '1h ago',
      unread: 0,
      online: true
    },
    {
      id: 'codecoffee-general',
      name: 'CodeCoffee General',
      type: 'group',
      lastMessage: 'Check out this React tutorial',
      timestamp: '3h ago',
      unread: 12,
      members: 247
    },
    {
      id: 'private-mike',
      name: 'Mike Rodriguez',
      type: 'private',
      lastMessage: 'See you at the hackathon!',
      timestamp: '1d ago',
      unread: 0,
      online: false
    }
  ];

  const currentChat = chatList.find(chat => chat.id === selectedChat);
  const messages = chatMessages[selectedChat] || [
    {
      id: '1',
      sender: 'Sarah Chen',
      content: 'Hey everyone! I uploaded my calculus notes to the shared folder.',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Perfect timing! I was just struggling with integration by parts.',
      timestamp: new Date(Date.now() - 3000000),
      isOwn: true,
      type: 'text'
    },
    {
      id: '3',
      sender: 'Mike Rodriguez',
      content: 'I created a shared document for practice problems. Link in the study notes section!',
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false,
      type: 'text'
    },
    {
      id: '4',
      sender: 'You',
      content: 'Thanks Mike! This is exactly what I needed.',
      timestamp: new Date(Date.now() - 900000),
      isOwn: true,
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    addChatMessage(selectedChat, {
      sender: 'You',
      content: newMessage.trim(),
      isOwn: true,
      type: 'text'
    });

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Chat List */}
      <div className="w-80 border-r border-gray-700 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-foreground">Messages</h2>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <Users className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-gray-700 border-gray-600 text-foreground placeholder-gray-400"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-700 transition-colors border-b border-gray-800 ${
                selectedChat === chat.id ? 'bg-gray-700' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-heading font-bold">
                      {chat.type === 'group' ? <Users className="h-6 w-6" /> : chat.name.charAt(0)}
                    </span>
                  </div>
                  {chat.type === 'private' && chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-paragraph font-semibold text-foreground truncate">
                      {chat.name}
                    </h3>
                    <span className="text-gray-400 text-xs">{chat.timestamp}</span>
                  </div>
                  <p className="text-gray-400 text-sm truncate mt-1">
                    {chat.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {chat.type === 'group' && (
                      <span className="text-gray-500 text-xs">
                        {chat.members} members
                      </span>
                    )}
                    {chat.unread > 0 && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-heading font-bold">
                      {currentChat.type === 'group' ? <Users className="h-5 w-5" /> : currentChat.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-paragraph font-semibold text-foreground">
                      {currentChat.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {currentChat.type === 'group' 
                        ? `${currentChat.members} members` 
                        : currentChat.online ? 'Online' : 'Last seen 2h ago'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    {!message.isOwn && (
                      <p className="text-gray-400 text-xs mb-1 font-paragraph">
                        {message.sender}
                      </p>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-700 text-foreground'
                      }`}
                    >
                      <p className="font-paragraph">{message.content}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Study Notes Section */}
            <div className="border-t border-gray-700 bg-gray-800 p-4">
              <div className="mb-4">
                <h4 className="font-paragraph font-semibold text-foreground mb-2">
                  📚 Shared Study Notes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card className="bg-gray-700 border-gray-600 p-3 cursor-pointer hover:bg-gray-600 transition-colors">
                    <h5 className="font-paragraph font-medium text-foreground text-sm">
                      Calculus Chapter 5
                    </h5>
                    <p className="text-gray-400 text-xs mt-1">Shared by Sarah</p>
                    <p className="text-accent-teal text-xs mt-1">📄 PDF • 2.3 MB</p>
                  </Card>
                  <Card className="bg-gray-700 border-gray-600 p-3 cursor-pointer hover:bg-gray-600 transition-colors">
                    <h5 className="font-paragraph font-medium text-foreground text-sm">
                      Practice Problems
                    </h5>
                    <p className="text-gray-400 text-xs mt-1">Shared by Mike</p>
                    <p className="text-accent-teal text-xs mt-1">📝 DOC • 1.8 MB</p>
                  </Card>
                  <Card className="bg-gray-700 border-gray-600 p-3 cursor-pointer hover:bg-gray-600 transition-colors">
                    <h5 className="font-paragraph font-medium text-foreground text-sm">
                      Formula Sheet
                    </h5>
                    <p className="text-gray-400 text-xs mt-1">Shared by Alex</p>
                    <p className="text-accent-teal text-xs mt-1">📊 XLS • 0.9 MB</p>
                  </Card>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-foreground hover:bg-gray-700">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Share File
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-foreground hover:bg-gray-700">
                    📁 View All Files
                  </Button>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="bg-gray-700 border-gray-600 text-foreground placeholder-gray-400 resize-none min-h-[40px] max-h-32"
                    rows={1}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-400 font-paragraph">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;