import axios from "axios";

export default async function FetchFromBackend(url : string) : Promise<any>{
	const jwt = localStorage.getItem('jwt')
	const data =await axios.get(
		url, 
		{
			headers : {
				'Authorization' : `Bearer ${jwt}`
			}
		}
	).
	then(response => response.data)
	.catch(e => {
		console.error('Error fetching data ', e )
		throw e; 
	})
	return data; 
}