import { combineReducers } from 'redux';
import auth from './auth.js';
import product from './product.js';
import country from './getCountry.js';
import state from './getState.js';
import getregister from './getRegisterData';
import getregisterbyid from './getDataById';

export default combineReducers({ auth, product, country, state, getregister, getregisterbyid});