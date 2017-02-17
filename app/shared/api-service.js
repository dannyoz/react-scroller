import HTTP          from 'superagent';
import jsonp         from 'superagent-jsonp';
import ServerActions from '../flux/server-actions';
import appConstants  from './app-constants';

let url = appConstants.APIURL;

class apiService {

	request(path,params){
		HTTP.get(url+"/"+path).end(function(err,response) {
			if (err || !response.ok) {
		        ServerActions.handleError(err,response)
		    } else {
				ServerActions.receiveData(response.body,params);
			}
		});
	}

	addComment(csrf,recaptcha,data,event){
		HTTP.post(url+'/comment')
		.set('x-csrf-token', csrf)
		.set('x-recaptcha-token', recaptcha)
		.withCredentials()
		.send(data)
		.end(function(err,response) {
			if (err || !response.ok) {
		       ServerActions.handleError(err,response)
		    } else {
		       ServerActions.receiveData(response,{event : event});
		    }
		});
	}

	reply(csrf,recaptcha,data,event){
		HTTP.post(url+'/comment/'+data.commentId+'/reply')
		.set('x-csrf-token', csrf)
		.set('x-recaptcha-token', recaptcha)
		.withCredentials()
		.send(data)
		.end(function(err,response) {
			if (err || !response.ok) {
		       ServerActions.handleError(err,response)
		    } else {
		       ServerActions.receiveData(response,{event : event});
		    }
		});
	}
}

export default apiService;