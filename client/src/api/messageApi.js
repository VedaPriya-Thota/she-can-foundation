const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Creates a new support/contact message submission.
 * 
 * @param {Object} formData - Object containing name, email, and message
 * @returns {Promise<Object>} API response data
 */
export const createMessage = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Message API Create Error:", error);
    return {
      success: false,
      message: error.message || "Connection failed. Please verify your server is running.",
    };
  }
};

/**
 * Fetches all message submissions (authenticated).
 * 
 * @param {string} token - Admin JWT token
 * @returns {Promise<Object>} API response containing messages array
 */
export const getMessages = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Message API Fetch Error:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch messages from server.",
    };
  }
};

/**
 * Updates the status of a specific message submission (authenticated).
 * 
 * @param {string} token - Admin JWT token
 * @param {string} id - Message ID
 * @param {string} status - Target status ('New', 'Reviewed', or 'Responded')
 * @returns {Promise<Object>} API response containing the updated message
 */
export const updateMessageStatus = async (token, id, status) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Message API Update Status Error:", error);
    return {
      success: false,
      message: error.message || "Failed to update message status.",
    };
  }
};

/**
 * Deletes a specific message submission (authenticated).
 * 
 * @param {string} token - Admin JWT token
 * @param {string} id - Message ID
 * @returns {Promise<Object>} API response data
 */
export const deleteMessage = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Message API Delete Error:", error);
    return {
      success: false,
      message: error.message || "Failed to delete message.",
    };
  }
};
