import axios from 'axios';
import { baseUrl } from '../path';

const baseURLAxiosService = axios.create(
    {
        baseURL: baseUrl
    }
);

export default baseURLAxiosService;