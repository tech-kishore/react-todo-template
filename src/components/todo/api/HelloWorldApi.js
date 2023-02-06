import {apiClient} from './ApiClient'
export const retireveHelloWorldBean 
=  apiClient.get('/hello-world-json');

export const retireveHelloWorldPathVarible 
=  (username) => apiClient.get(`http://localhost:8080/hello-world/${username}`);

