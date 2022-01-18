import io from 'socket.io-client'
import axios from 'axios'

let socket_client = {};
let socket;

socket_client.connect = function(){
		socket  = io(axios.defaults.baseURL,{
		cors: {
			origin: '*',
		},
		withCredentials : false
	});
	return socket
}
socket_client.socket = function () {
	return socket
}


export default socket_client