import AppDispatcher from "./app-dispatcher";
import AppConstants  from "../shared/app-constants";
import ApiService    from "../shared/api-service";

var Api = new ApiService();

let AppActions = {

	apiRequest(path,params){
		Api.request(path,params);
	},

	loadNextArticle(id){
		AppDispatcher.appUpdate({
			type : AppConstants.LOAD_NEXT_ARTICLE,
			data : id
		});
	} 
}

export default AppActions;