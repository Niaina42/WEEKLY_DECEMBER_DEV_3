import axios from 'axios';

const BaseUrl = 'http://localhost:9090'
const httpsFiles= axios.create({
    baseURL: BaseUrl + '/api',
});

export default httpsFiles
