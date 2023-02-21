class WSHandler {
    constructor(ws_url){
        this.ws_url = ws_url;

        this.message_timeout_ms = 1000;
        this.reconnect_timeout_ms = 1000;

        this.ontimeout = ()=>{()=>{void(0)}}; // by default ontimeout will do nothing

        this._create_connection();
    }
    _create_connection(){
        // reset timeout if it was set
        if (typeof(this.ws_timeout) != "undefine"){
            clearInterval(this.ws_timeout)
        }
        // start new timeout
        this.ws_timeout = setTimeout(this.ontimeout, this.message_timeout_ms)

        // create websocket connection and define callbacks
        if(typeof this.socket == "undefined"){
            this.socket = new WebSocket(this.ws_url);
            this.socket.onopen = this._wrap_onopen(()=>{void(0)});
            this.socket.onclose = this._wrap_onclose(()=>{void(0)});
        } else {
            // backup callbacks before recreating websocket connection
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
        // reset timeout if it was set
        if (typeof(this.ws_timeout) != "undefine"){
            clearInterval(this.ws_timeout)
        }

        this.ontimeout = this._wrap_ontimeout(callback);

        this.ws_timeout = setTimeout(this.ontimeout, this.message_timeout_ms);
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
            }.bind(this), this.reconnect_timeout_ms);
        }.bind(this);
    }
    _wrap_onmessage(callback){
        return function(event){
            // reset timeout if it was set
            if (typeof(this.ws_timeout) != "undefine"){
                clearInterval(this.ws_timeout)
            }
            callback(event)
            this.ws_timeout = setTimeout(this.ontimeout, this.message_timeout_ms)
        }.bind(this)
    }
    _wrap_ontimeout(callback){
        return function(event){
            // only active when connection is opened
            if(this.socket.readyState === WebSocket.OPEN){
                callback(event)
            }
        }.bind(this)
    }
}