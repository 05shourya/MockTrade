import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface counterType{
	value : number
}

const initialState : counterType = {
	value : 0
}

const counterSlice = createSlice({
	name:'counterSlice', 
	initialState, 
	reducers: {
		increment(state){
			state.value += 1
		}, 
		incrementByValue(state , action: PayloadAction<number>){
			state.value += action.payload
		}
	}
})

export const {increment , incrementByValue} = counterSlice.actions
export default counterSlice.reducer