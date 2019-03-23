import baseURLAxiosService from './baseURLAxios';

export function getProduct() {
    return baseURLAxiosService.get('/fruits/getFruits', {
        header: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
            "Access-Control-Allow-Credentials": "true"
        }
    });
}

export function getProductById(id) {
    return baseURLAxiosService.get('/fruits/' + id);
}

export function addProduct(data) {
    return baseURLAxiosService.post('/fruits', data);
}

export function deleteProduct(id) {
    return baseURLAxiosService.delete('/fruits/' + id);
}

export function updateProduct(id, data) {
    return baseURLAxiosService.put('/fruits/' + id, data);
}

export function addToCart(data) {
    return baseURLAxiosService.post('/cart', data);
}

export function getCartbyUser(userid) {
    return baseURLAxiosService.get('/cart/' + userid);
}

export function deleteCart(fruitid) {
    return baseURLAxiosService.delete('/cart/' + fruitid);
}

export function getCartByFruit(fruitid) {
    return baseURLAxiosService.get('/cart/fruit/' + fruitid);
}

export function addDeliveryDetails(data) {
    return baseURLAxiosService.post('/delivery', data);
}

export function getDeliveryByUser(userid) {
    return baseURLAxiosService.get('/delivery/' + userid);
}

export function addOrder(data) {
    return baseURLAxiosService.post('/order', data);
}

export function updateOrderedCart(fruitid, userid) {
    return baseURLAxiosService.put('/cart/' + fruitid + '/' + userid);
}