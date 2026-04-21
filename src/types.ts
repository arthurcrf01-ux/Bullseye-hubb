export interface CollectorItem {
  id: string;
  name: string;
  photoBase64: string;
  rarityCategory: 'Comum' | 'Incomum' | 'Raro' | 'Épico' | 'Lendário';
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

export interface Friendship {
  id: string;
  participants: string[];
  status: 'pending' | 'accepted';
  requesterId: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  createdAt: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  createdAt: number;
  messages: CommunityMessage[];
}
