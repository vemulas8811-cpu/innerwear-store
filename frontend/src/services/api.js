// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
// });

// export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "https://innerwear-store.onrender.com/api",
});

export default API;
