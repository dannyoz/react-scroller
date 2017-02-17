import AppDispatcher from "./app-dispatcher";
import assign        from "object-assign/index";
import AppConstants  from '../shared/app-constants';

const EventEmitter = require('events').EventEmitter;
var data = {};

let AppStore = assign({}, EventEmitter.prototype,{

	getState(){
		return data;
	},

	setData(key,value){
		data[key] = value;
	},

	emitChange (event,data) {
	    this.emit(event,data);
	},

	addChangeListener (event,callback) {
		this.setMaxListeners(Infinity);
	    this.on(event,callback);
	},

	removeChangeListener (event,callback) {
	    this.removeListener(event,callback);
	}

});

AppDispatcher.register(function (payload) {

	var type = payload.type,
		data = payload.data;
	
	var types = [
		AppConstants.RECEIVE_ARTICLES,
		AppConstants.GET_ARTICLES,
		AppConstants.LOAD_NEXT_ARTICLE
	];

	if(types.indexOf(type) > -1){
		AppStore.emitChange(type,data);
	}

});

export default AppStore;
