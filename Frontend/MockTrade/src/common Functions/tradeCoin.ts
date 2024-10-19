import { CoinInfo } from "@/types";
import axios from "axios"

export default async function TradeCoin(coinInfo: CoinInfo, isBuying: boolean) {
    const endpoint = isBuying ? 'buyCoin' : 'sellCoin';
    const url = `/trader/${endpoint}`;
    const token = localStorage.getItem('jwt');


    if (!token) {
        console.error("No authorization token found");
        return;
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, coinInfo, { headers });
        console.log(response.data); // Log the response data
        return response.data; // Return the response data if needed

    } catch (error) {
        console.error("Error during the API call:", error);
        throw error; // Rethrow the error if you want to handle it in the calling function
    }
}