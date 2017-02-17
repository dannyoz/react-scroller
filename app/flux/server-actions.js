import AppDispatcher from "./app-dispatcher";
import AppConstants  from "../shared/app-constants";
import AppStore      from "./app-store";

let ServerActions = {

	receiveData (data,params){
		AppStore.setData(data,params);
		AppDispatcher.appUpdate({
			type : params.event,
			params : params,
			data : data
		});
	},

	handleError(error,response){
		AppDispatcher.appUpdate({
			type : AppConstants.ERROR,
			data : {
				error : error,
				response : response
			}
		});
	}
}

export default ServerActions;