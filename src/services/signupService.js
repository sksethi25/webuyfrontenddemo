const axios = require('axios');
const qs = require('qs');

let signup = async function (args)
{
	try{
   		const response=  await axios.post(process.env.REACT_APP_API_BASE_URL+'/user/register',qs.stringify(args), {withCredentials: true});
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

exports.signup = signup;