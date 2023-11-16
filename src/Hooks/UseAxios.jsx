import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const UseAxios = () => {
  const navigate = useNavigate()
  const {logout}=UseAuth()
  AxiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("stoop", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  AxiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log("status error", status);
      if(status === 401 || status === 403){
        await logout()
        navigate('/login')
      }
      return Promise.reject(error);
    }
  );

  return AxiosSecure;
};

export default UseAxios;
