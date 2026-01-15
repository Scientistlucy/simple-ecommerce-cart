import axios from 'axios';
window.axios = axios;

// Send CSRF/XHR headers
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// This line ensures cookies are sent with requests
window.axios.defaults.withCredentials = true;

