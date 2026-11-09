// Core TypeScript Definitions for Oitijjo 64

export type DivisionBn =
  | 'ঢাকা'
  | 'চট্টগ্রাম'
  | 'খুলনা'
  | 'রাজশাহী'
  | 'রংপুর'
  | 'সিলেট'
  | 'বরিশাল'
  | 'ময়মনসিংহ';

export interface DivisionMeta {
  nameBn: DivisionBn;
  slug: string;
  count: number;
}

export interface FoodItem {
  id: string;
  nameBn: string;
  descriptionBn: string;
  imageUrl?: string;
  isDemo?: boolean;
}

export interface HeritageItem {
  id: string;
  titleBn: string;
  descriptionBn: string;
  imageUrl?: string;
  isDemo?: boolean;
}

export interface PlaceItem {
  id: string;
  titleBn: string;
  descriptionBn: string;
  imageUrl?: string;
  isDemo?: boolean;
}

export interface EventItem {
  id: string;
  titleBn: string;
  descriptionBn: string;
  imageUrl?: string;
}

export interface District {
  id: string;
  slug: string;
  nameBn: string;
  divisionBn: DivisionBn;
  introBn: string;
  voteCount: number;
  isDemo: boolean;
  accentColor?: string;
  foods: FoodItem[];
  heritageItems: HeritageItem[];
  places: PlaceItem[];
  eventItems: EventItem[];
}

export interface LeaderboardEntry {
  rank: number;
  districtId: string;
  districtSlug: string;
  districtNameBn: string;
  divisionBn: DivisionBn;
  voteCount: number;
}

export interface VoteSummary {
  totalDemoVotes: number;
  totalDistricts: number;
  votingDeadline: string;
  isClosed: boolean;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  isDemo: boolean;
}

export interface VoteResult {
  success: boolean;
  messageBn: string;
  districtId?: string;
  alreadyVoted?: boolean;
}
