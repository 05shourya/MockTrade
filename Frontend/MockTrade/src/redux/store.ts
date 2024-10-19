import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice'; 
import validUserReducer from './authentication/validUserSlice'
import traderInfoReducer from './authentication/traderInfoSlice'
import tokenInfoReducer from './authentication/jwtTokenSlice'

const store = configureStore({
	reducer: {
		counter: counterReducer, 
		validUser: validUserReducer, 
		traderInfo : traderInfoReducer, 
		tokenInfo: tokenInfoReducer
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
