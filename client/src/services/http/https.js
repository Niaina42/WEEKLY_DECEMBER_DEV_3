import axios from 'axios';

const BaseUrl = 'http://173.249.22.169:9090'
const https = axios.create({
    baseURL: BaseUrl,
});

export default https

export {
    BaseUrl
}