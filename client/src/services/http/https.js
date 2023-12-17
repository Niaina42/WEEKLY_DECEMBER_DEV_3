import axios from 'axios';

const BaseUrl = 'http://localhost:9090'
const https = axios.create({
    baseURL: BaseUrl,
});

export default https

export {
    BaseUrl
}