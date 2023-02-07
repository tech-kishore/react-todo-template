import {apiClient} from './ApiClient'

export const retireveHelloWorldBean1
=  () => apiClient.get('/hello-world-json-test');

export const retireveHelloWorldPathVarible 
=  (username) => apiClient.get(`/hello-world/${username}`);

