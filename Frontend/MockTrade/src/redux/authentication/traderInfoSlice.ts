import FetchFromBackend from "@/common Functions/fetchFromBackend";
import { Trader, TraderState } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TraderState = {
    trader: null , 
    isLoading: false, 
    isError: false
}


export const fetchTraderInfo = createAsyncThunk<Trader, void>(
    'traderInfo/fetchTraderInfo', 
    async () => {
		const response = await FetchFromBackend('/trader/getTrader')
		return response
    }
);

const traderInfoSlice = createSlice({
    name: 'traderInfo',
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(fetchTraderInfo.fulfilled, (state, action: PayloadAction<Trader>) => {
            state.trader = action.payload;
            state.isLoading = false; 
            state.isError = false;
        });
        builder.addCase(fetchTraderInfo.pending, (state) => {
			state.isLoading = true; 
            state.isError = false; 
        });
        builder.addCase(fetchTraderInfo.rejected, (state) => {
			state.isError = true; 
            state.isLoading = false; 
        });
    }
});

export default traderInfoSlice.reducer;
