import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface validUserState {
	isValidUser : boolean 
}

const initialState: validUserState = {
	isValidUser:false
}

const isValidUserSlice = createSlice({
	name: 'isValidUser', 
	initialState, 
	reducers: {
		setIsValidUser(state , action : PayloadAction<boolean>){
			state.isValidUser = action.payload; 
		}
	}
})

export const {setIsValidUser} = isValidUserSlice.actions; 
export default isValidUserSlice.reducer