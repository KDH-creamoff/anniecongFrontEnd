import axios from 'axios';

// API 기본 설정 (Vite 환경 변수 사용)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 만료 처리
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== 인증 API ====================
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  signup: (userData) => apiClient.post('/auth/signup', userData),
  refreshToken: () => apiClient.post('/auth/refresh'),
};

// ==================== 사용자 관리 API ====================
export const userAPI = {
  getUsers: (params) => apiClient.get('/users', { params }),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  createUser: (userData) => apiClient.post('/users', userData),
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  getAccessLogs: (params) => apiClient.get('/users/access-logs', { params }),
};

// ==================== 재고 관리 API ====================
export const inventoryAPI = {
  getInventoryStatus: (params) => apiClient.get('/inventory/status', { params }),
  getInventoryMovements: (params) => apiClient.get('/inventory/movements', { params }),
  getWarehouseUtilization: () => apiClient.get('/inventory/warehouse-utilization'),
  getAlerts: () => apiClient.get('/inventory/alerts'),
  updateTemperature: (data) => apiClient.post('/inventory/temperature', data),
  getTemperatureHistory: (params) => apiClient.get('/inventory/temperature-history', { params }),
};

// ==================== 제조 관리 API ====================
export const manufacturingAPI = {
  getManufacturingHistory: (params) => apiClient.get('/manufacturing/history', { params }),
  createManufacturingOrder: (data) => apiClient.post('/manufacturing/orders', data),
  updateManufacturingOrder: (id, data) => apiClient.put(`/manufacturing/orders/${id}`, data),
  getFactory2WorkList: (params) => apiClient.get('/manufacturing/factory2', { params }),
  createTransfer: (data) => apiClient.post('/manufacturing/transfers', data),
  getTransferStatus: (params) => apiClient.get('/manufacturing/transfers', { params }),
};

// ==================== 배송 관리 API ====================
export const shippingAPI = {
  getShippingList: (params) => apiClient.get('/shipping', { params }),
  createShipping: (data) => apiClient.post('/shipping', data),
  updateShipping: (id, data) => apiClient.put(`/shipping/${id}`, data),
  confirmShipping: (id) => apiClient.post(`/shipping/${id}/confirm`),
  getB2BShippings: (params) => apiClient.get('/shipping/b2b', { params }),
  getBC2Shippings: (params) => apiClient.get('/shipping/bc2', { params }),
};

// ==================== 입고 관리 API ====================
export const receivingAPI = {
  getReceivingList: (params) => apiClient.get('/receiving', { params }),
  createReceiving: (data) => apiClient.post('/receiving', data),
  confirmReceiving: (id) => apiClient.post(`/receiving/${id}/confirm`),
  printLabel: (id) => apiClient.get(`/receiving/${id}/label`),
};

// ==================== 전자 결재 API ====================
export const approvalAPI = {
  getPendingDocuments: (params) => apiClient.get('/approvals/pending', { params }),
  getSubmittedDocuments: (params) => apiClient.get('/approvals/submitted', { params }),
  createDocument: (data) => apiClient.post('/approvals', data),
  approveDocument: (id, data) => apiClient.post(`/approvals/${id}/approve`, data),
  rejectDocument: (id, data) => apiClient.post(`/approvals/${id}/reject`, data),
};

// ==================== 기준 정보 API ====================
export const basicAPI = {
  getItems: (params) => apiClient.get('/basic/items', { params }),
  createItem: (data) => apiClient.post('/basic/items', data),
  updateItem: (id, data) => apiClient.put(`/basic/items/${id}`, data),
  deleteItem: (id) => apiClient.delete(`/basic/items/${id}`),
  getBOMList: (params) => apiClient.get('/basic/bom', { params }),
  createBOM: (data) => apiClient.post('/basic/bom', data),
  getFactoryInfo: () => apiClient.get('/basic/factory'),
  updateFactoryInfo: (data) => apiClient.put('/basic/factory', data),
};

// ==================== 대시보드 API ====================
export const dashboardAPI = {
  getSummary: () => apiClient.get('/dashboard/summary'),
  getManufacturingStats: (params) => apiClient.get('/dashboard/manufacturing-stats', { params }),
  getRecentActivities: () => apiClient.get('/dashboard/recent-activities'),
};

export default apiClient;
