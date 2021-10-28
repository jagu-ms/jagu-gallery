import axios from 'axios';
//Dealing with local storage.
const Auth = {
    login: user => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('id', user.id);
        localStorage.setItem('user', user.name);
        // I didn't know why i doesn't work !!!
        axios.defaults.headers.common['Authorization'] = user.token;
    },
    auth: () => localStorage.getItem('token') !== null,
    guest: () => localStorage.getItem('token') === null,
    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('user');
    },
    getToken: () => {
        let token = localStorage.getItem('token')
        return token
    },
}

export default Auth;