import { createSlice } from '@reduxjs/toolkit';
interface TextEditorText {
  text: string;
  queryValue: string;
  showModal: boolean;
}

const initialState: TextEditorText = {
  text: '',
  queryValue: '',
  showModal: false,
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
  },
});

export const { setText, setQueryValue, changeShowModal } = textEditorSlice.actions;
export default textEditorSlice.reducer;
