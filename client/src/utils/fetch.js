import axios from "axios";
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3013/api',
  timeout: 2000
});

instance.interceptors.response.use(function(response){
      return response.data;
   },function(error){
    this.$Message.error(error.response.data.msg);
     return Promise.reject(error);
   });

export default instance;
