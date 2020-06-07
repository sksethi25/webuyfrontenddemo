const axios = require('axios');

let profile = async function (args)
{
	try{
		let path= ((args==undefined || args =="") ? "": ("/"+args));
   		const response=  await axios.get(process.env.REACT_APP_API_BASE_URL+'/user/profile'+path, {withCredentials: true});
   		return response.data;
	}
	catch(error){
		if(error.response !="undefined" && error.response.data !="undefined"){
			let apiError = error.response.data;
			return apiError;
		}
		throw error;
	}

}

exports.profile = profile;