import { createSlice } from '@reduxjs/toolkit';
interface TextEditorText {
  text: string;
  queryValue: string;
  showModal: boolean;
  errorValue: string;
}

const initialState: TextEditorText = {
  text: '',
  queryValue: '',
  showModal: false,
  errorValue: '',
};

const textEditorSlice = createSlice({
  name: 'textEditorSlice',
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
    setQueryValue(state, action) {
      state.queryValue = action.payload;
    },
    changeShowModal(state, action) {
      state.showModal = action.payload;
    },
    setErrorValue(state, action) {
      state.errorValue = action.payload;
    },
  },
});

export const { setText, setQueryValue, changeShowModal, setErrorValue } = textEditorSlice.actions;
export default textEditorSlice.reducer;
