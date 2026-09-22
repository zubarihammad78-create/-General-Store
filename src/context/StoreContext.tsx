import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  Customer,
  Coupon,
  ProductReview,
  StoreSettings,
  CustomerPageView,
  AdminTabView,
  OrderStatus,
  ShippingAddress,
} from '../types';
import {
  initialProducts,
  initialCategories,
  initialOrders,
  initialCustomers,
  initialCoupons,
  initialReviews,
  initialStoreSettings,
} from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & Modes
  currentMode: 'customer' | 'admin';
  setCurrentMode: (mode: 'customer' | 'admin') => void;
  customerView: CustomerPageView;
  setCustomerView: (view: CustomerPageView) => void;
  adminTab: AdminTabView;
  setAdminTab: (tab: AdminTabView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Search & Global filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;

  // Data collections
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  reviews: ProductReview[];
  settings: StoreSettings;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Checkout & Orders
  lastPlacedOrder: Order | null;
  placeOrder: (shipping: ShippingAddress, paymentMethod?: 'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Bank Transfer') => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;

  // User Auth Simulation
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    area: string;
  } | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<NonNullable<StoreContextType['user']>>) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateInventoryStock: (productId: string, newStock: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (catId: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  deleteCoupon: (couponId: string) => void;
  updateReviewStatus: (reviewId: string, status: 'Approved' | 'Pending' | 'Rejected') => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Toasts
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Helper Navigation
  goToProduct: (productId: string) => void;
  goToOrderTracking: (orderNumberOrId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentMode, setCurrentMode] = useState<'customer' | 'admin'>('customer');
  const [customerView, setCustomerView] = useState<CustomerPageView>('home');
  const [adminTab, setAdminTab] = useState<AdminTabView>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-1');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('ord-1001');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Core Data
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [settings, setSettings] = useState<StoreSettings>(initialStoreSettings);

  // Cart & Discounts
  const [cart, setCart] = useState<CartItem[]>([
    { product: initialProducts[0], quantity: 2 },
    { product: initialProducts[3], quantity: 1 },
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // User Auth
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    area: string;
  } | null>({
    name: 'Muhammad Tariq Khan',
    email: 'tariq.khan@gmail.com',
    phone: '0300-9281744',
    address: 'House 42-B, Street 14, Sector F-8/2',
    city: 'Islamabad',
    area: 'F-8 Markaz',
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  
  let shipping = 0;
  if (subtotal > 0) {
    if (appliedCoupon?.discountType === 'free_shipping') {
      shipping = 0;
    } else if (subtotal >= settings.freeShippingThreshold) {
      shipping = 0;
    } else {
      shipping = settings.flatShippingRate;
    }
  }

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else if (appliedCoupon.discountType === 'fixed') {
      discount = Math.min(appliedCoupon.discountValue, subtotal);
    } else if (appliedCoupon.discountType === 'free_shipping') {
      discount = settings.flatShippingRate;
    }
  }

  const total = Math.max(0, subtotal + shipping - (appliedCoupon?.discountType === 'free_shipping' ? 0 : discount));

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart! (Rs. ${product.salePrice})`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed ${item.product.name} from cart`, 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const formattedCode = code.trim().toUpperCase();
    const found = coupons.find(
      (c) => c.code.toUpperCase() === formattedCode && c.isActive
    );

    if (!found) {
      showToast('Invalid coupon code. Try IMRAN10 or FIRST50', 'error');
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < found.minOrder) {
      const msg = `Minimum order of Rs. ${found.minOrder} required for ${found.code}`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Order Placement
  const placeOrder = (
    shippingAddress: ShippingAddress,
    paymentMethod: 'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Bank Transfer' = 'Cash on Delivery'
  ): Order => {
    const orderNum = `IGS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString().split('T')[0],
      customer: {
        name: shippingAddress.fullName,
        email: shippingAddress.email,
        phone: shippingAddress.phoneNumber,
        address: shippingAddress.address,
        city: shippingAddress.city,
        area: shippingAddress.area,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.salePrice,
        quantity: item.quantity,
        image: item.product.image,
        unit: item.product.unit,
      })),
      subtotal,
      shipping,
      discount,
      couponCode: appliedCoupon?.code,
      total,
      paymentMethod,
      status: 'Pending',
      estimatedDelivery: '2 - 3 business days',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date().toLocaleString('en-US', { hour12: true }),
          note: 'Order placed successfully. Cash on Delivery confirmed.',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setSelectedOrderId(newOrder.id);

    // Update stock levels
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.product.id === prod.id);
        if (cartItem) {
          const newStock = Math.max(0, prod.stock - cartItem.quantity);
          return { ...prod, stock: newStock };
        }
        return prod;
      })
    );

    clearCart();
    setCustomerView('order-success');
    showToast(`Order ${orderNum} placed successfully via Cash on Delivery!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId || order.orderNumber === orderId) {
          const historyEntry = {
            status: newStatus,
            timestamp: new Date().toLocaleString('en-US', { hour12: true }),
            note: note || `Order status updated to ${newStatus}`,
          };
          return {
            ...order,
            status: newStatus,
            statusHistory: [...order.statusHistory, historyEntry],
          };
        }
        return order;
      })
    );
    showToast(`Order status updated to ${newStatus}`, 'success');
  };

  // Auth
  const login = (email: string, name = 'Muhammad Tariq Khan') => {
    setIsLoggedIn(true);
    setUser({
      name,
      email,
      phone: '0300-9281744',
      address: 'House 42-B, Street 14, Sector F-8/2',
      city: 'Islamabad',
      area: 'F-8 Markaz',
    });
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    showToast('You have been logged out', 'info');
  };

  const updateUserProfile = (profile: Partial<NonNullable<StoreContextType['user']>>) => {
    if (user) {
      setUser({ ...user, ...profile });
      showToast('Profile updated successfully', 'success');
    }
  };

  // Admin Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" created successfully!`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted', 'info');
  };

  const updateInventoryStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    showToast('Stock quantity updated', 'success');
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added`, 'success');
  };

  const deleteCategory = (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Category deleted', 'info');
  };

  const addCoupon = (coupData: Omit<Coupon, 'id'>) => {
    const newCoup: Coupon = {
      ...coupData,
      id: `coup-${Date.now()}`,
    };
    setCoupons((prev) => [...prev, newCoup]);
    showToast(`Coupon ${newCoup.code} created!`, 'success');
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
    showToast('Coupon removed', 'info');
  };

  const updateReviewStatus = (reviewId: string, status: 'Approved' | 'Pending' | 'Rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    showToast(`Review marked as ${status}`, 'success');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings saved successfully', 'success');
  };

  // Helper Navigation
  const goToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCustomerView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToOrderTracking = (orderNumberOrId: string) => {
    const target = orders.find(
      (o) => o.id === orderNumberOrId || o.orderNumber === orderNumberOrId
    );
    if (target) {
      setSelectedOrderId(target.id);
      setCustomerView('order-tracking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-scroll on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [customerView, adminTab, currentMode]);

  return (
    <StoreContext.Provider
      value={{
        currentMode,
        setCurrentMode,
        customerView,
        setCustomerView,
        adminTab,
        setAdminTab,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        products,
        categories,
        orders,
        customers,
        coupons,
        reviews,
        settings,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        discount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,
        isLoggedIn,
        user,
        login,
        logout,
        updateUserProfile,
        addProduct,
        updateProduct,
        deleteProduct,
        updateInventoryStock,
        addCategory,
        deleteCategory,
        addCoupon,
        deleteCoupon,
        updateReviewStatus,
        updateSettings,
        toasts,
        showToast,
        removeToast,
        goToProduct,
        goToOrderTracking,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
