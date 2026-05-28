const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Sends administrative login credentials to authenticate and obtain JWT token.
 * 
 * @param {Object} credentials - Object containing email and password
 * @returns {Promise<Object>} API response data containing success state and JWT token
 */
export const loginAdmin = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Auth API Login Error:", error);
    return {
      success: false,
      message: error.message || "Connection failed. Please verify your server is running.",
    };
  }
};
