import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const newsAPI = {
  // Search for news articles
  searchNews: async (topic) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { topic }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to search news');
    }
  },

  // Get search history
  getSearchHistory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get search history');
    }
  },

  // Get trending news
  getTrendingNews: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trending`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get trending news');
    }
  }
};