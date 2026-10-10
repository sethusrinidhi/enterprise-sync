import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// 1. User Registration
export async function registerUserApi(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Registration failed on server';
    throw new Error(message);
  }
}

// 2. User Authentication / Login
export async function loginUserApi(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    const data = response.data;
    const token = data.accessToken || data.token;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', data.username || username);
      if (data.role) {
        localStorage.setItem('user_clearance_role', data.role);
      }
    }
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Invalid credentials';
    throw new Error(message);
  }
}

// 3. Fetch Issues
export async function fetchIssuesApi() {
  try {
    const response = await axios.get(`${API_BASE_URL}/issues`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.warn('Backend fetch failed, falling back to cached state:', error.message);
    return null;
  }
}

// 4. Create Issue
export async function createIssueApi(issueData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/issues`, issueData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.warn('Backend issue creation failed:', error.message);
    throw error;
  }
}

// 5. Delete Issue
export async function deleteIssueApi(issueId) {
  try {
    await axios.delete(`${API_BASE_URL}/issues/${issueId}`, { headers: getAuthHeaders() });
    return true;
  } catch (error) {
    console.warn('Backend issue deletion failed:', error.message);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('user_clearance_role');
}

// --- EXPORT ALIASES FOR COMPONENT COMPATIBILITY ---
export const fetchIssues = fetchIssuesApi;
export const createIssue = createIssueApi;
export const deleteIssue = deleteIssueApi;
export const registerUser = registerUserApi;
export const loginUser = loginUserApi;