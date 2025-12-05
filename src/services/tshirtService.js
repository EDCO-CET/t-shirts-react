const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tshirts`;

const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const tshirtService = {
  async getAll(token) {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch t-shirts');
    }

    return response.json();
  },

  async getById(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch t-shirt');
    }

    return response.json();
  },

  async create(tshirt, token) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(tshirt),
    });

    if (!response.ok) {
      throw new Error('Failed to create t-shirt');
    }

    return response.json();
  },

  async update(id, tshirt, token) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(tshirt),
    });

    if (!response.ok) {
      throw new Error('Failed to update t-shirt');
    }

    return response.json();
  },

  async delete(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to delete t-shirt');
    }

    return response.json();
  },
};
