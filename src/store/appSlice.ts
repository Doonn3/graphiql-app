import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    logActive: false,
    singActive: false,
    email: null,
    id: null,
    authUser: false,
  },
  reducers: {
    handleChangeLogActive(state, action) {
      state.logActive = action.payload;
    },
    handleChangeSingActive(state, action) {
      state.singActive = action.payload;
    },
    setAuth(state, action) {
      state.authUser = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    setId(state, action) {
      state.id = action.payload.id;
    },
    removeUser(state) {
      (state.email = null), (state.id = null);
    },
  },
});

export const {
  handleChangeLogActive,
  handleChangeSingActive,
  setAuth,
  setEmail,
  setId,
  removeUser,
} = appSlice.actions;

export default appSlice.reducer;
