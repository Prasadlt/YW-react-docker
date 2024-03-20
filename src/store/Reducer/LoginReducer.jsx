import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
 
  loginData: {
    data: {},
    accessToken: '',
    refreshToken: '',
  },
 
};
 
const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loginData = action.payload;
    },
   
    loginActiveState: (state, action) => {
      state.activeState = action.payload;
    },

    logoutUser: (state) => {
      state.loginData = null
    }
  },
});
 
export const {
 
  loginUser, logoutUser
 
} = loginReducer.actions;
 
export default loginReducer.reducer;
 