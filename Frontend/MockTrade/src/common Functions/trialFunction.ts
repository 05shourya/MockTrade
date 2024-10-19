import axios from "axios";

export default async function TrialFunction(){
	try {
		const response = await axios.get("trader/validate", {
		  headers: {
			"Content-Type": "application/json" 
		  }, 
		  withCredentials: true
		});
		if(response.status == 200){
			console.log(response)
			return true
		}
		return false; 
	  } catch (error:any) {
		console.error('Error fetching data:', error.response ? error.response.status : error.message);
		return false; 
	  }
}