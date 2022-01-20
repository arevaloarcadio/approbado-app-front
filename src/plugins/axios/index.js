
import router from '@/router'
import jwtToken from '@/plugins/jwt/jwt-token.js'
import axios from 'axios'
import toast from '@/toast'

//axios.defaults.baseURL = 'http://192.168.43.215:4000/';
//axios.defaults.baseURL = 'https://api-approbado.alaxatech.com/';
axios.defaults.baseURL = 'http://192.168.43.131:4000/';


axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (jwtToken.getToken()) {
    config.headers['Authorization'] = 'Bearer '+jwtToken.getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {

  if(error['response'] == undefined){
      toast.openToast("Error de conexión, intente nuevamente","error",2000)
      return Promise.reject(error);
  }
  if(error['response']['status'] == 422){
    let message="";

    for(let wrong in error['response']['data']['errors']){
      message += error['response']['data']['errors'][wrong]+'<br>'
    }
    
    toast.openToast(message,"error",2000)
  }else if(error['response']['status'] == 500){
    toast.openToast("Error interno","error",2000)
  }else if(error['response']['status'] == 401){
    toast.openToast("Se ha perdido la sesión, por favor inicie sesión nuevamente","error",2000)
    router.push({ name : 'login'})
  }else{
    toast.openToast("Error de conexión, intente nuevamente","error",2000)
  }
  
  return Promise.reject(error);
});

export default axios