import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    email: null,
    id: null,
    authUser: false,
  },
  reducers: {
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

export const { setAuth, setEmail, setId, removeUser } = appSlice.actions;

export default appSlice.reducer;
