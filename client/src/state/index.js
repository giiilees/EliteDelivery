import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAdmin: false,
  isExpert: false,
  isClient: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state) =>{
      state.isAdmin = true;

      state.isExpert = false;
      state.isClient = false;

    },
    setExpert: (state) =>{
      state.isExpert = true;

      state.isAdmin = false;
      state.isClient = false;
    },
    setClient: (state) =>{
      state.isClient = true;

      state.isExpert = false;
      state.isAdmin = false;
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.isExpert = false;
      state.isClient = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCommandes : () =>{

    }
    
    
  

  },
});

export const { setClient,setAdmin, setExpert , setLogin , setUser, setLogout , setCommandes } =
  authSlice.actions;
export default authSlice.reducer;
