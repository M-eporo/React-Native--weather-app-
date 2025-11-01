import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteRegion } from "../../types/favoriteRegion";

type InitListState = {
    initListState: FavoriteRegion[];
}

const initialState: InitListState = {
    initListState: [],
};

const initWListSlice = createSlice({
    name: "initList",
    initialState,
    reducers: {
        setInitListState: (state, action: PayloadAction<FavoriteRegion[]>) => {
            state.initListState = action.payload;
        }
    }
});

export const { setInitListState } = initWListSlice.actions;
export default initWListSlice.reducer;