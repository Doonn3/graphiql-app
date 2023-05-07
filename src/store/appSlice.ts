import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    logActive: false,
    singActive: false,
  },
  reducers: {
    handleChangeLogActive(state, action) {
      state.logActive = action.payload;
    },
    handleChangeSingActive(state, action) {
      state.singActive = action.payload;
    },
  },
});

export const { handleChangeLogActive, handleChangeSingActive } = appSlice.actions;

export default appSlice.reducer;
