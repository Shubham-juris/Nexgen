// import axios from 'axios';

// // Determine the API base URL based on the environment (local or live)
// const API_URL =
//   window.location.hostname === 'localhost'
//     ? 'http://localhost:8080' // Local API URL
//     : 'https://nexgeneducare.com'; // Live API URL

// export const getUsers = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/users`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// };
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const response = await fetch(`${API_URL}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});
