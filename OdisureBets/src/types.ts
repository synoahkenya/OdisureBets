export interface Team {
  name: string;
  logo: string;
}

export type PredictionType = 
  | 'Fixed Matches' 
  | 'GG/NG' 
  | 'Over/Under' 
  | 'HT/FT' 
  | 'Correct Score' 
  | 'Accumulators' 
  | 'Daily Tips' 
  | 'VIP Sure Odds';

export type MatchStatus = 'win' | 'loss'| 'pending';

export interface Prediction {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  leagueLogo: string;
  startTime: string;
  odds: number;
  type: PredictionType;
  prediction: string;
  confidence: number;
  isVip: boolean;
  status: MatchStatus;
  result?: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Referral {
  id: string;
  userId: string;
  code: string;
  count: number;
  rewarded: boolean;
}

export interface UnlockCode {
  code: string;
  plan: string;
  expiry: string;
  isActive: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
