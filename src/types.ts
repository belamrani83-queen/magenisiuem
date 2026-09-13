export interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
  bottlesCount: number;
  price: number;
  originalPrice: number;
  saveAmount: number;
  badge?: string;
  isPopular?: boolean;
  freeShipping: boolean;
  gift?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  userType: string;
}

export interface IngredientItem {
  id: string;
  nameAr: string;
  nameEn: string;
  role: string;
  benefit: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  packageId: string;
  notes?: string;
}

export type VoiceName = 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon';

export interface TTSState {
  isPlaying: boolean;
  isLoading: boolean;
  currentText: string;
  activeId: string | null;
  progress: number;
  duration: number;
  voice: VoiceName;
  error: string | null;
}
