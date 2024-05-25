import api from './api';
export const ProdutoService = () => {

    async function inserirProduto(payload) {
        return api.post('produtos', payload)
    }

    async function atualizarProduto(payload, id) {
        return api.put(`produtos/${id}`, payload)
    }

    async function deletarProduto(id) {
        return api.delete(`produtos/${id}`)
    }

    async function listarProduto() {
        return api.get('produtos')
    }


    return {
        inserirProduto, listarProduto, atualizarProduto, deletarProduto
    }


}

