import baseURLAxios from './baseURLAxios';

export function login(credentails) {
    return baseURLAxios.post('/user/login', credentails);
}

export function register(credentials) {
    return baseURLAxios.post('/user', credentials);
}

export function getUser(){
    return baseURLAxios.get('/user');
}