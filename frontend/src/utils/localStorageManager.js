const LocalStorageManager = {
  getAccessToken: () => {
    return localStorage.getItem('token');
  },
  getRefreshToken: () => {
    return localStorage.getItem('refresh-token');
  },
  setAccessToken: (token) => {
    localStorage.setItem('token', token);
  },
  resetAccessToken: () => {
    localStorage.removeItem('token');
  },
  setRefreshToken: (token) => {
    localStorage.setItem('refresh-token', token);
  },
  resetRefreshToken: () => {
    localStorage.removeItem('refresh-token');
  },
};

export default LocalStorageManager;
