import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: {
    id: '',
    title: '',
    description: '',
    estimated_time: 0,
    start_date: Date(),
    project_id: '',
    comments: [
      {
        id: '',
        content: '',
        user: {
          id: '',
          username: ''
        }
      }
    ]
  }
};

const subTaskSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSubTaskDetail: (state, action: PayloadAction<any>) => {
      Object.assign(state, { details: action.payload });
    }
  }
});

export const { setSubTaskDetail } = subTaskSlice.actions;

export default subTaskSlice.reducer;
