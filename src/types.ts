export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number; // in PKR
  salePrice: number; // in PKR
  discountPercent: number;
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  image: string;
  gallery: string[];
  description: string;
  specifications: Record<string, string>;
  ingredients?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isActive: boolean;
  unit: string; // e.g. "150g", "400ml", "950g", "1 Pack"
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  productCount: number;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  orderNotes?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    area: string;
    orderNotes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Bank Transfer';
  status: OrderStatus;
  trackingNumber?: string;
  courier?: string;
  estimatedDelivery?: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  joinedDate: string;
  avatar?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  minOrder: number;
  expiryDate: string;
  isActive: boolean;
  timesUsed: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerCity: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  verifiedPurchase: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  country: string;
  freeShippingThreshold: number;
  flatShippingRate: number;
  currency: string;
  currencySymbol: string;
  operatingHours: string;
  lowStockAlertThreshold?: number;
  announcementText?: string;
}

export type CustomerPageView =
  | 'home'
  | 'shop'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'login'
  | 'register'
  | 'account'
  | 'my-orders'
  | 'order-tracking'
  | 'about'
  | 'contact';

export type AdminTabView =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'inventory'
  | 'categories'
  | 'coupons'
  | 'reviews'
  | 'settings';
