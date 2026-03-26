import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

// create Context
const AppContext = createContext();

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'Summer Cotton T-Shirt',
    price: 299,
    description: 'Comfortable cotton t-shirt perfect for summer',
    size: ['S', 'M', 'L', 'XL'],
    color: ['White', 'Black', 'Navy'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
    sellerId: 'seller1'
  },
  {
    id: '2',
    name: 'Denim Jeans',
    price: 799,
    description: 'Classic fit denim jeans',
    size: ['28', '30', '32', '34'],
    color: ['Blue', 'Black'],
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'],
    sellerId: 'seller1'
  },
];

const mockOrders = [
  {
    id: '1',
    productId: '1',
    productName: 'Summer Cotton T-Shirt',
    productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    customerAddress: '123 Main St, City, Country',
    quantity: 2,
    size: 'M',
    color: 'White',
    status: 'pending',
    date: '2026-03-24',
    total: 598
  },
  {
    id: '2',
    productId: '2',
    productName: 'Denim Jeans',
    productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    customerName: 'Jane Smith',
    customerPhone: '+1234567891',
    customerAddress: '456 Oak Ave, City, Country',
    quantity: 1,
    size: '30',
    color: 'Blue',
    status: 'confirmed',
    date: '2026-03-23',
    total: 799
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);

  const login = (email, password) => {
    if (email && password) {
      setUser({
        id: 'seller1',
        name: 'John Seller',
        email,
        username: 'johnseller',
        storeName: "John's Fashion Store",
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
      });
      return true;
    }
    return false;
  };

  const register = (newUser, password) => {
    if (newUser.email && password) {
      setUser({
        id: 'seller' + Date.now(),
        ...newUser
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      sellerId: user?.id || ''
    };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully!');
  };

  const updateProduct = (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const updateOrder = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order status updated to ${status}!`);
  };

  const updateProfile = (updates) => {
    if (user) {
      setUser({ ...user, ...updates });
      toast.success('Profile updated successfully!');
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        products,
        orders,
        login,
        register,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrder,
        updateProfile
      }}
    >
      {children}
    </AppContext.Provider>
  ); 
}
// hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}