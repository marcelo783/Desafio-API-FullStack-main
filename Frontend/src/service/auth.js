import api from './api';
export const authService = () => {
    async function login(payload) {
        return api.post('auth/login', payload)
    }


    async function cadastro(payload) {
        return api.post('auth/cadastro', payload)
    }


    return{
        login, cadastro
    }


}

