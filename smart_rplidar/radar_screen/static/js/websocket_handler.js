class WSHandler {
    constructor(ws_url){
        this.ws_url = ws_url;

        this.timeout = 1000;
        this.ontimeout = ()=>{()=>{void(0)}}; // by default ontimeout will do nothing

        this._create_connection();
    }
    _create_connection(){
        this.ws_timeout = setTimeout(this.ontimeout, 1000)

        if(typeof this.socket == "undefined"){
            this.socket = new WebSocket(this.ws_url);
            this.socket.onopen = this._wrap_onopen(()=>{void(0)});
            this.socket.onclose = this._wrap_onclose(()=>{void(0)});
        } else {
            var temp_onpen = this.socket.onopen;
            var temp_onmessage = this.socket.onmessage;
            var temp_onclose = this.socket.onclose;
            var temp_onerror = this.socket.onerror;

            this.socket = new WebSocket(this.ws_url);
            this.socket.onopen = temp_onpen;
            this.socket.onmessage = temp_onmessage;
            this.socket.onclose = temp_onclose;
            this.socket.onerror = temp_onerror;
        }
    }
    set_onopen(callback){
        this.socket.onopen = this._wrap_onclose(callback);
    }
    set_onmessage(callback){
        this.socket.onmessage = this._wrap_onmessage(callback);
    }
    set_onclose(callback){
        this.socket.onclose = this._wrap_onclose(callback);
    }
    set_onerror(callback){
        this.socket.onerror = callback;
    }
    set_ontimeout(callback){
        clearTimeout(this.ontimeout);
        this.ontimeout = callback;
        this.ws_timeout = setTimeout(this.ontimeout, 1000);
    }
    _wrap_onopen(callback){
        return function(event) {
            callback(event);
            console.log("Socket is open.");
        }
    }
    _wrap_onclose(callback){
        return function(event){
            callback(event);
            console.log("Socket is close, Reconnection will be attempted.");
            setTimeout(function() {
                this._create_connection();
            }.bind(this), 1000);
        }.bind(this);
    }
    _wrap_onmessage(callback){
        return function(event){
            clearTimeout(this.ws_timeout)
            callback(event)
            this.ws_timeout = setTimeout(this.ontimeout, 1000)
        }.bind(this)
    }
}