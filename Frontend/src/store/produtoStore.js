import { create } from 'zustand'
import { ProdutoService } from '../service/ProdutoService';

const service = ProdutoService();

export const useProdutoStore = create((set) => ({
    produtos: [],

    setProdutos: (novosProdutos) => set({ produtos: novosProdutos }),
    fetchProdutos: async () => {
        let p = []
        await service.listarProduto().then((res) => {
            if (res.data) {
                p = res.data
            }
        })
        return set({ produtos: p })
    }

}))