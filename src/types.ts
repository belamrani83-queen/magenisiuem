export interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
  bottlesCount: number;
  price: number;
  originalPrice: number;
  saveAmount: number;
  sku?: string;
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

export type OrderStatus = 'new' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface CodUnitCosts {
  productUnitCost: number;       // تكلفة شراء/صنع العلبة (مثلاً 45 DH)
  shippingCostDelivered: number; // تكلفة شركة الشحن للطلبات المستلمة (مثلاً 35 DH)
  shippingCostReturned: number;  // تكلفة الروتور في حالة الإلغاء/الرفض (مثلاً 15 DH)
  confirmationCallCost: number;  // تكلفة التأكيد والهاتف (مثلاً 5 DH)
  packagingCost: number;         // تكلفة الكرتون والتعليب (مثلاً 4 DH)
  adSpendPerLead: number;        // تكلفة الإشهار لكل ليد (Cost Per Lead - مثلاً 30 DH)
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  packageId: string;
  packageName: string;
  sku?: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  notes?: string;
  syncedToSheets?: boolean;
  customProductCost?: number;
  customShippingCost?: number;
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
