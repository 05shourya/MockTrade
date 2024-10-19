import axios from 'axios';

export default async function validate(token:String) {
  try {
    const response = await axios.get("trader/validate", {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json" 
      }
    });
	if(response.status == 200){
		return true
	}
	return false; 
  } catch (error:any) {
    console.error('Error fetching data:', error.response ? error.response.status : error.message);
	return false; 
  }
}
