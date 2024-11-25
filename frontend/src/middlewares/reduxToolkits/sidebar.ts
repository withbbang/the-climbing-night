import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
  selectedSidebar: string;
}

export const initialState: SidebarState = {
  selectedSidebar: '',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    useSetSelectedSidebarToken: (state, action) => {
      state.selectedSidebar = action.payload.selectedSidebar;
    },
  },
});

export const { useSetSelectedSidebarToken } = sidebarSlice.actions;

export default sidebarSlice.reducer;
