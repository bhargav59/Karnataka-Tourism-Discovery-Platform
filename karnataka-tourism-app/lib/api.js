// API utility functions

const API_BASE_URL = "/api";

/**
 * Fetch all attractions
 */
export async function getAttractions() {
  try {
    const res = await fetch(`${API_BASE_URL}/attractions`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching attractions:", error);
    throw error;
  }
}

/**
 * Fetch a single attraction by ID
 */
export async function getAttractionById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/attractions/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching attraction ${id}:`, error);
    throw error;
  }
}

/**
 * Search attractions
 */
export async function searchAttractions(query) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error searching attractions:", error);
    throw error;
  }
}

/**
 * User login
 */
export async function login(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * User signup
 */
export async function signup(name, email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

/**
 * Add attraction to favorites
 */
export async function addToFavorites(attractionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ attraction_id: attractionId }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
}

/**
 * Remove attraction from favorites
 */
export async function removeFromFavorites(favoriteId) {
  try {
    const res = await fetch(`${API_BASE_URL}/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
}
