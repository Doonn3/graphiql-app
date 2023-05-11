import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    email: null,
    id: null,
  },
  reducers: {
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

export const { setEmail, setId, removeUser } = appSlice.actions;

export default appSlice.reducer;
