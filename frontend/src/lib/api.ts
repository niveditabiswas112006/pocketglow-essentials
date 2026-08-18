import axios from 'axios';

// Get base API URL from environment variables, default to port 5000 locally
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // required for cookie-based sessions if used
});

// Interceptor to attach token to headers automatically
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const authAPI = {
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  },
  register: async (userData: any) => {
    const res = await api.post('/auth/register', userData);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  },
  logout: async () => {
    await api.get('/auth/logout');
    localStorage.removeItem('token');
  },
  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  },
};

// Product Services
export const productAPI = {
  getAll: async (category?: string) => {
    const res = await api.get('/products', {
      params: category ? { category } : {},
    });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  create: async (productData: any) => {
    const res = await api.post('/products', productData);
    return res.data;
  },
  update: async (id: string, productData: any) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};

// Cart Services
export const cartAPI = {
  get: async () => {
    const res = await api.get('/cart');
    return res.data;
  },
  add: async (productId: string, quantity: number) => {
    const res = await api.post('/cart', { productId, quantity });
    return res.data;
  },
  updateQty: async (productId: string, quantity: number) => {
    const res = await api.put(`/cart/${productId}`, { quantity });
    return res.data;
  },
  remove: async (productId: string) => {
    const res = await api.delete(`/cart/${productId}`);
    return res.data;
  },
  clear: async () => {
    const res = await api.delete('/cart');
    return res.data;
  },
};

// Wishlist Services
export const wishlistAPI = {
  get: async () => {
    const res = await api.get('/wishlist');
    return res.data;
  },
  toggle: async (productId: string) => {
    const res = await api.post('/wishlist', { productId });
    return res.data;
  },
};

// Order Services
export const orderAPI = {
  create: async (orderData: { address: any; items: Array<{ productId: string; quantity: number }> }) => {
    const res = await api.post('/orders', orderData);
    return res.data;
  },
  getMyOrders: async () => {
    const res = await api.get('/orders');
    return res.data;
  },
  getAllOrders: async () => {
    const res = await api.get('/orders/all');
    return res.data;
  },
};

// Form Services
export const formAPI = {
  submitContact: async (contactData: { name: string; email: string; message: string }) => {
    const res = await api.post('/contact', contactData);
    return res.data;
  },
  subscribeNewsletter: async (email: string) => {
    const res = await api.post('/newsletter', { email });
    return res.data;
  },
};

// Admin Services
export const adminAPI = {
  getStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  },
};
