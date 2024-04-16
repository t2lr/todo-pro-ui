import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  start_date: [dayjs(), dayjs().add(1, 'day')]
};

const worklogSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<[Date, Date]>) => {
      Object.assign(state, {
        start_date: [dayjs(action.payload[0]), dayjs(action.payload[1])]
      });
    }
  }
});

export const { setStartDate } = worklogSlice.actions;

export default worklogSlice.reducer;
