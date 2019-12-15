import {API} from "../../config";

export const isAuth = () => {
    if(typeof window == 'undefined') {
        return false;
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }else {
        return false;
    }
};

export const signOut = (cb) => {
    if(typeof window != 'undefined') {
        localStorage.removeItem('jwt');
    }
    cb();
    return fetch(`${API}/signout`, {
        method: "GET"
    })
        .then(res => console.log(res))
        .catch(err => console.error(err));
};