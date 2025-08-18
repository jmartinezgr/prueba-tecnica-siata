import axios from "axios";
const api = axios.create({
  // Here use complete url becouse there is not a real api or other routes
  baseURL: "https://689e1ef63fed484cf876618e.mockapi.io/stations",
  withCredentials: true,
});

export default api;
