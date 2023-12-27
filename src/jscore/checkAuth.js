export function isAuthenticated() {
    // Check if the authentication token exists in localStorage
    const token = localStorage.getItem('authToken');
    
    // Return true if the token exists, otherwise return false
    return !!token;
  }