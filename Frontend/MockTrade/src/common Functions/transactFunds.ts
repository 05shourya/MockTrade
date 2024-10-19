import axios from "axios"

export default async function TransactFunds(isAdding: boolean, amount: number) {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        console.error('JWT token is missing. User might not be logged in.');
        throw new Error('Unauthorized: No JWT token found.');
    }

    const endpoint = isAdding ? "addBalance" : "withdrawBalance"; 
    const url = `/trader/${endpoint}`; 

    try {
        const response = await axios.post(url, amount,  {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Transaction successful:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error during transaction:', error);
        throw error;
    }
}
