// Dummy data for ConnectHub

export const dummyPosts = [
  {
    id: '1',
    username: 'alex_codes',
    community: 'CodeCoffee',
    mood: 'Focused',
    textContent: 'Just finished my React project! The feeling when your code finally works is unmatched 🚀',
    imageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=coding-project',
    reactionCount: 24,
    postType: 'Public',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    username: 'study_buddy_sarah',
    community: 'Study Groups',
    mood: 'Motivated',
    textContent: 'Anyone up for a calculus study session tomorrow? Coffee on me! ☕',
    imageUrl: null,
    reactionCount: 12,
    postType: 'Public',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    username: 'anonymous_owl',
    community: 'Anonymous Advice',
    mood: 'Thoughtful',
    textContent: 'Remember: It\'s okay to not have everything figured out. College is about growth, not perfection.',
    imageUrl: null,
    reactionCount: 45,
    postType: 'Anonymous',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    username: 'art_enthusiast',
    community: 'Creative Corner',
    mood: 'Inspired',
    textContent: 'My latest digital artwork - exploring the theme of connection in the digital age',
    imageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=digital-art',
    reactionCount: 67,
    postType: 'Public',
    timestamp: '8 hours ago'
  },
  {
    id: '5',
    username: 'future_self_2027',
    community: 'Time Capsule',
    mood: 'Hopeful',
    textContent: 'Dear future me, I hope you remember how excited you were about starting your CS journey today!',
    imageUrl: null,
    reactionCount: 15,
    postType: 'Time Capsule',
    timestamp: 'Locked until 2027'
  }
];

export const dummyEvents = [
  {
    id: '1',
    eventName: 'Hackathon 2024',
    description: '48-hour coding marathon with amazing prizes and networking opportunities',
    eventDate: '2024-03-15',
    eventTime: '09:00',
    location: 'Computer Science Building',
    eventImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hackathon-event',
    registrationLink: '#'
  },
  {
    id: '2',
    eventName: 'Study Group: Algorithms',
    description: 'Weekly study session for Data Structures and Algorithms',
    eventDate: '2024-03-10',
    eventTime: '14:00',
    location: 'Library Room 204',
    eventImage: null,
    registrationLink: '#'
  },
  {
    id: '3',
    eventName: 'Art Exhibition Opening',
    description: 'Showcase of student digital art and photography',
    eventDate: '2024-03-12',
    eventTime: '18:00',
    location: 'Student Center Gallery',
    eventImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=art-exhibition',
    registrationLink: '#'
  }
];

export const dummyCommunities = [
  {
    id: '1',
    name: 'CodeCoffee',
    description: 'Where programmers meet, share code, and caffeinate',
    memberCount: 1247,
    isTrending: true,
    communityImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=codecoffee-community'
  },
  {
    id: '2',
    name: 'Study Groups',
    description: 'Find your perfect study buddy and ace those exams',
    memberCount: 892,
    isTrending: true,
    communityImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=study-groups-community'
  },
  {
    id: '3',
    name: 'Creative Corner',
    description: 'Share your art, photography, and creative projects',
    memberCount: 634,
    isTrending: false,
    communityImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=creative-corner-community'
  },
  {
    id: '4',
    name: 'Wellness Warriors',
    description: 'Mental health, fitness, and self-care for students',
    memberCount: 756,
    isTrending: true,
    communityImage: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=wellness-community'
  }
];

export const dummyAdvice = [
  {
    id: '1',
    content: 'How do I balance coding projects with other coursework? I feel overwhelmed.',
    category: 'Academic',
    upvotes: 23,
    isAnswered: true,
    status: 'active'
  },
  {
    id: '2',
    content: 'Is it normal to feel imposter syndrome in CS classes? Everyone seems so much smarter.',
    category: 'Mental Health',
    upvotes: 45,
    isAnswered: true,
    status: 'active'
  },
  {
    id: '3',
    content: 'Best way to network as an introverted student?',
    category: 'Social',
    upvotes: 18,
    isAnswered: false,
    status: 'active'
  }
];

export const dummyConnections = [
  {
    id: '1',
    username: 'mike_the_designer',
    major: 'Graphic Design',
    graduationYear: 2025,
    interests: 'UI/UX, Photography, Coffee',
    profilePicture: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=profile-mike'
  },
  {
    id: '2',
    username: 'data_scientist_jane',
    major: 'Data Science',
    graduationYear: 2024,
    interests: 'Machine Learning, Statistics, Hiking',
    profilePicture: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=profile-jane'
  },
  {
    id: '3',
    username: 'business_bob',
    major: 'Business Administration',
    graduationYear: 2026,
    interests: 'Entrepreneurship, Finance, Basketball',
    profilePicture: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=profile-bob'
  }
];

export const moods = [
  'Focused', 'Motivated', 'Creative', 'Stressed', 'Excited', 
  'Thoughtful', 'Inspired', 'Relaxed', 'Curious', 'Hopeful'
];

export const postTypes = [
  { id: 'public', label: 'Public', icon: '🌍', description: 'Share with everyone' },
  { id: 'anonymous', label: 'Anonymous', icon: '🎭', description: 'Post anonymously' },
  { id: 'timecapsule', label: 'Time Capsule', icon: '⏰', description: 'Lock until future date' },
  { id: 'voicenote', label: 'Voice Note', icon: '🎤', description: 'Record a voice message' }
];