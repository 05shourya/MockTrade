import axios, { AxiosResponse } from 'axios';

export default async function FetchCurrencies() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    const localStorageKey = 'currenciesData';
    const timestampKey = 'currenciesDataTimestamp';
    const minuteLimit = 5 * 60 * 1000; 

    // Function to fetch data from API
    const fetchDataFromAPI = async (): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.get(url);
            localStorage.setItem(localStorageKey, JSON.stringify(response.data));
            localStorage.setItem(timestampKey, Date.now().toString());
            return response.data; 
        } catch (error: any) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const storedData = localStorage.getItem(localStorageKey);
    const storedTimestamp = localStorage.getItem(timestampKey);
    
    if (storedData && storedTimestamp) {
        const currentTime = Date.now();
        const dataAge = currentTime - parseInt(storedTimestamp, 10);

        if (dataAge < minuteLimit) {
            const data = JSON.parse(storedData);
            return data;
        }
    }
    
    return fetchDataFromAPI();
}
