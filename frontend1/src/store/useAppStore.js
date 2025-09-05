import { create } from 'zustand';
import { dummyPosts, dummyEvents, dummyCommunities, dummyAdvice, dummyConnections } from '../data/dummyData';

const useAppStore = create((set, get) => ({
  // Posts state
  posts: dummyPosts,
  selectedMood: 'Motivated',
  selectedPostType: 'public',
  
  // Events state
  events: dummyEvents,
  
  // Communities state
  communities: dummyCommunities,
  
  // Advice state
  advice: dummyAdvice,
  
  // Connections state
  connections: dummyConnections,
  
  // UI state
  activeTab: 'Feed',
  isMobileMenuOpen: false,
  isCreatePostModalOpen: false,
  isCreateEventModalOpen: false,
  
  // Chat state
  activeChat: null,
  chatMessages: {},
  
  // Time capsule state
  timeCapsules: [],
  
  // Study Notes state
  studyNotes: [
    { id: '1', title: 'Calculus Review', status: 'Due: Tomorrow', dueDate: 'Tomorrow' },
    { id: '2', title: 'React Hooks', status: 'In Progress', dueDate: 'No due date' },
    { id: '3', title: 'Data Structures', status: 'Completed', dueDate: 'Last week' }
  ],
  
  // Comments state
  comments: {
    '1': [
      {
        id: 'c1',
        postId: '1',
        username: 'jane_doe',
        content: 'Great post! This really resonates with my experience too.',
        timestamp: '2h ago',
        likes: 3,
        replies: [
          {
            id: 'r1',
            commentId: 'c1',
            username: 'alex_codes',
            content: 'Thanks Jane! Glad you found it helpful.',
            timestamp: '1h ago',
            likes: 1
          }
        ]
      },
      {
        id: 'c2',
        postId: '1',
        username: 'mike_dev',
        content: 'I had the same issue last week. The debugging process taught me so much!',
        timestamp: '1h ago',
        likes: 5,
        replies: []
      }
    ],
    '2': [
      {
        id: 'c3',
        postId: '2',
        username: 'math_lover',
        content: 'Count me in! I need help with integration by parts.',
        timestamp: '3h ago',
        likes: 2,
        replies: [
          {
            id: 'r2',
            commentId: 'c3',
            username: 'study_buddy_sarah',
            content: 'Perfect! I\'ll bring my notes on that topic.',
            timestamp: '2h ago',
            likes: 1
          }
        ]
      }
    ]
  },
  
  // Actions
  addPost: (post) => set((state) => ({
    posts: [{ ...post, id: Date.now().toString(), timestamp: 'Just now' }, ...state.posts]
  })),
  
  updatePostReactions: (postId) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId 
        ? { ...post, reactionCount: post.reactionCount + 1 }
        : post
    )
  })),
  
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  
  setSelectedPostType: (type) => set({ selectedPostType: type }),
  
  addEvent: (event) => set((state) => ({
    events: [{ ...event, id: Date.now().toString() }, ...state.events]
  })),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  setCreatePostModalOpen: (isOpen) => set({ isCreatePostModalOpen: isOpen }),
  
  setCreateEventModalOpen: (isOpen) => set({ isCreateEventModalOpen: isOpen }),
  
  addAdvice: (advice) => set((state) => ({
    advice: [{ ...advice, id: Date.now().toString(), upvotes: 0, isAnswered: false, status: 'active' }, ...state.advice]
  })),
  
  upvoteAdvice: (adviceId) => set((state) => ({
    advice: state.advice.map(item => 
      item.id === adviceId 
        ? { ...item, upvotes: item.upvotes + 1 }
        : item
    )
  })),
  
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  
  addChatMessage: (chatId, message) => set((state) => ({
    chatMessages: {
      ...state.chatMessages,
      [chatId]: [...(state.chatMessages[chatId] || []), { ...message, id: Date.now().toString(), timestamp: new Date() }]
    }
  })),
  
  addTimeCapsule: (capsule) => set((state) => ({
    timeCapsules: [{ ...capsule, id: Date.now().toString() }, ...state.timeCapsules]
  })),
  
  unlockTimeCapsule: (capsuleId) => set((state) => ({
    timeCapsules: state.timeCapsules.map(capsule => 
      capsule.id === capsuleId 
        ? { ...capsule, isUnlocked: true }
        : capsule
    )
  })),
  
  // Comment actions
  addComment: (postId, comment) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: [
        ...(state.comments[postId] || []),
        {
          ...comment,
          id: `c${Date.now()}`,
          postId,
          timestamp: 'Just now',
          likes: 0,
          replies: []
        }
      ]
    }
  })),
  
  addReply: (postId, commentId, reply) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: state.comments[postId]?.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  ...reply,
                  id: `r${Date.now()}`,
                  commentId,
                  timestamp: 'Just now',
                  likes: 0
                }
              ]
            }
          : comment
      ) || []
    }
  })),
  
  likeComment: (postId, commentId) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: state.comments[postId]?.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ) || []
    }
  })),
  
  likeReply: (postId, commentId, replyId) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: state.comments[postId]?.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ) || []
    }
  })),
  
  // Study Notes actions
  addStudyNote: (note) => set((state) => ({
    studyNotes: [
      ...state.studyNotes,
      {
        ...note,
        id: Date.now().toString(),
        status: 'In Progress',
        dueDate: note.dueDate || 'No due date'
      }
    ]
  })),
  
  deleteStudyNote: (noteId) => set((state) => ({
    studyNotes: state.studyNotes.filter(note => note.id !== noteId)
  })),
  
  // Study Notes actions
  addStudyNote: (note) => set((state) => ({
    studyNotes: [{ ...note, id: Date.now().toString() }, ...state.studyNotes]
  })),
  
  removeStudyNote: (noteId) => set((state) => ({
    studyNotes: state.studyNotes.filter(note => note.id !== noteId)
  })),
  
  updateStudyNote: (noteId, updates) => set((state) => ({
    studyNotes: state.studyNotes.map(note => 
      note.id === noteId 
        ? { ...note, ...updates }
        : note
    )
  }))
}));

export default useAppStore;