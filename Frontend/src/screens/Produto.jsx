import React, { useState, useEffect } from 'react';
import MenuAppBar from '../components/AppBar';
import TableProdutos from '../components/Products/TableProdutos';
import { useProdutoStore } from '../store/produtoStore';



const MeuComp = () => {

    const { fetchProdutos } = useProdutoStore()

    async function atualizarTabela() {
        await fetchProdutos()
    }

    useEffect(() => {

        atualizarTabela();
    }, []);


    return (
        <div>
            <MenuAppBar />
            <TableProdutos atualizarTabela={atualizarTabela} />
        </div>
    );
};

export default MeuComp;
