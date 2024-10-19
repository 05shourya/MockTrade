import { createSlice, PayloadAction} from "@reduxjs/toolkit"

interface Token{
	token: string | null
}

export const initialState: Token = {
	token : localStorage.getItem('jwt')
}

const jwtTokenSlice = createSlice({
	name:'jwtTokenSlice' , 
	initialState, 
	reducers: {
		saveToken(state, action: PayloadAction<string>){
			localStorage.setItem('jwt' , action.payload)
			state.token = action.payload
			// console.log(state.token)
		}, 
		removeToken(state){
			localStorage.removeItem('jwt')
			state.token = null 
		}
	}
})

export const {saveToken , removeToken} = jwtTokenSlice.actions
export default jwtTokenSlice.reducer