import { Prediction, NewsItem, Review } from './types';

export const MOCK_PREDICTIONS: Prediction[] = [
  {
    id: '1',
    homeTeam: { name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
    awayTeam: { name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
    league: 'Premier League',
    leagueLogo: 'https://media.api-sports.io/football/leagues/39.png',
    startTime: new Date(Date.now() + 3600000).toISOString(),
    odds: 1.85,
    type: 'Daily Tips',
    prediction: 'Home Win',
    confidence: 85,
    isVip: false,
    status: 'pending'
  },
  {
    id: '2',
    homeTeam: { name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
    awayTeam: { name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
    league: 'La Liga',
    leagueLogo: 'https://media.api-sports.io/football/leagues/140.png',
    startTime: new Date(Date.now() + 7200000).toISOString(),
    odds: 2.10,
    type: 'VIP Sure Odds',
    prediction: 'BTS - Yes',
    confidence: 94,
    isVip: true,
    status: 'pending'
  },
  {
    id: '3',
    homeTeam: { name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
    awayTeam: { name: 'Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' },
    league: 'Bundesliga',
    leagueLogo: 'https://media.api-sports.io/football/leagues/78.png',
    startTime: new Date(Date.now() - 7200000).toISOString(),
    odds: 1.65,
    type: 'Daily Tips',
    prediction: 'Home Win',
    confidence: 90,
    isVip: false,
    status: 'win',
    result: '3-1'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Mbappe Set to Miss Champions League Clash',
    summary: 'Kylian Mbappe has been ruled out of the upcoming match due to a hamstring injury.',
    content: 'Full content goes here...',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800',
    date: '2024-03-20',
    author: 'Admin'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Kelvin M.',
    avatar: 'https://i.pravatar.cc/150?u=kelvin',
    rating: 5,
    comment: 'Odisure is the real deal! Won 50k last weekend thanks to the VIP tips.',
    date: '2024-03-18'
  },
  {
    id: '2',
    name: 'Sarah J.',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5,
    comment: 'Most reliable platform in Kenya. The customer service on WhatsApp is top notch.',
    date: '2024-03-15'
  }
];
