const axios = require('axios');

let logout = async function (args)
{
	try{
   		const response=  await axios.get(process.env.REACT_APP_API_BASE_URL+'/user/logout', {withCredentials: true});
   		return response.data;
	}
	catch(error){
		if(error.response !=undefined && error.response.data !=undefined){
			let apiError = error.response.data;
			return apiError;
		}
		throw error;
	}

}

exports.logout = logout;