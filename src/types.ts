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
