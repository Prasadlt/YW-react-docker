import { API } from '../../api/Api-Endpoint';
import { axiosPost } from '../../api/axiosApi';
import { loginUser } from '../Reducer/LoginReducer';
import axios  from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URI;

export const loginAction = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    const response = axiosPost(
      baseURL+API.login.Login+'?mobileNo=' + body.email +'&password=' +body.password
    )
      response.then((response) => {
        dispatch(loginUser(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const logoutAction = () => async () => {
  return await new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: API.login.logoutUser,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
