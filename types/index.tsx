export interface CarbonOffset {
  id: string;
  projectName: string;
  emoji: string;
  tonsOffset: number;
  platform: string;
  verifiedDate: string;
  description: string;
  location: string;
  projectType: string;
  certificateUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface UserStats {
  totalOffset: number;
  goal: number;
  netZeroStatus: 'Net Zero' | 'Carbon Positive' | 'Carbon Negative';
  achievements: Achievement[];
  offsets: CarbonOffset[];
}