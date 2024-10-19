export interface Trader {
    id: string;
    username: string;
    coins: any[];
    balance: number;
}

export interface TraderState {
    trader: Trader | null; 
    isLoading: boolean; 
    isError: boolean;
}

export interface CoinInfo {
	name: string
	quantity: number
	price : number
}

export interface MyCurrency{
	name: string
	quantity: number
	averageBuyPrice: number
	investedAmount: number
}
