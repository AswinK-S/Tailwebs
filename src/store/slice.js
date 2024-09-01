import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teacher: JSON.parse(localStorage.getItem('Teacher')) || null 
};

const Slice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    teacherLogIn: (state, action) => {
      state.teacher = action.payload; 
      localStorage.setItem('Teacher', JSON.stringify(action.payload)); 
    },
    teacherLogOut: (state) => {
      state.teacher = null; 
      localStorage.removeItem('Teacher'); 
    }
  }
});

export const { teacherLogIn, teacherLogOut } = Slice.actions;
export default Slice.reducer;
