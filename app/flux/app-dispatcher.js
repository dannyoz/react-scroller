const Dispatcher = require("flux").Dispatcher;
const assign = require("object-assign");

let AppDispatcher = assign(new Dispatcher(),{

	appUpdate(payload){
		this.dispatch(payload);
	}

});

export default AppDispatcher;
