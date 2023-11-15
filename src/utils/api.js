const API_BASE_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app';

const api = {
  fetchThoughts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/thoughts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching thoughts:', error);
      throw error;
    }
  },
  postThought: async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/thoughts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        console.error('Failed to post thought');
        throw new Error('Failed to post thought');
      }
    } catch (error) {
      console.error('Error posting thought:', error);
      throw error;
    }
  },
  likeThought: async (thoughtId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/thoughts/${thoughtId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Failed to like thought');
        throw new Error('Failed to like thought');
      }
    } catch (error) {
      console.error('Error liking thought:', error);
      throw error;
    }
  }
}

export default api;
