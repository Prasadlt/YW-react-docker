/* eslint-disable no-console */
import axios from "axios";
// const lastRequestTime=0;
// const minRequestInterval=1000;

axios.interceptors.request.use(
  (req) => {
    // Add configurations
    //const token= sessionStorage.getItem('accesstoken');
    req.headers["Authorization"] = "Bearer ${token}";
    req.headers["Content-Type"] = "application/json";
    // if(!token)
    // {

    // }
    //console.log(req.data);
    return req;
  },
  (err) => {
    //console.error("Request error: ", err)
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Add configurations
    if (response.status === 201) {
      console.log("Posted Successfully");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Authentication error: ", error.response.data);
      window.location.href = "/login";
    }
    if (error.response) {
      console.error("Response error status: ", error.response.status);
      console.error("Response error data: ", error.response.data);
    } else if (error.request) {
      console.error("No response received: ", error.request);
    } else {
      console.error("Request setup error: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;