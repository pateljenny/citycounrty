import baseURLAxiosService from './baseURLAxios';

export function getCountry() {
    return baseURLAxiosService.get('/register');
}

export function getStateByCountryId(countryid) {
    return baseURLAxiosService.get('/register/' + countryid);
}

export function addRegisterData(data) {
    return baseURLAxiosService.post('/register', data);
}

export function getRegisterData() {
    return baseURLAxiosService.get('/register/register/data');
}

export function deleteRegisterData(regId) {
    return baseURLAxiosService.put('/register/delete/' + regId);
}

export function getRegisterDataById(regId) {
    return baseURLAxiosService.get('/register/register/' + regId);
}

export function updateRegisterById(regId, data) {
    return baseURLAxiosService.put('/register/' + regId, data)
}

export function getDataByLimit(limitnumber,page) {
    return baseURLAxiosService.get('/register/pagination/' + limitnumber + '/' +page);
}