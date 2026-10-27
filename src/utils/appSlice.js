import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true,
        selectedCategory: "All",
        searchQuery: ""
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
        openMenu: (state) => {
            state.isMenuOpen = true;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});

export const { toggleMenu, closeMenu, openMenu, setSelectedCategory, setSearchQuery } = appSlice.actions;
export default appSlice.reducer;