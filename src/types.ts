export interface CollectorItem {
  id: string;
  name: string;
  photoBase64: string;
  rarityCategory: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  rarityScore: number;
  description: string;
  estimatedValue: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  points: number;
  avatarUrl: string;
}

export interface CommunityMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  messages: CommunityMessage[];
}
