
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ProdutoService } from '../service/ProdutoService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProdutoStore } from '../store/produtoStore';
import { Snackbar } from '@mui/material';
import MenuAppBarProduto from '../components/AppBarProduto';

const service = ProdutoService();

export default function SalvarProduto({ atualizarTabela }) {

    const { id } = useParams();
    const { produtos } = useProdutoStore()
    const produto = produtos.find((item) => id == item.id)
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);
    const [categoria, setCategoria] = useState('');


    useEffect(() => {

        if (!produto && id) {
            navigate('/produto')
        } else if (produto) {

            setNome(produto.nome)
            setDescricao(produto.descricao)
            setValor(produto.valor)
            setCategoria(produto.categoria)
        }
    }, []);


    const handleSubmit = async () => {

        const payload = {
            nome,
            descricao,
            valor,
            categoria
        }

        try {
            if (produto) {
                await service.atualizarProduto(payload, produto.id)
            } else {
                await service.inserirProduto(payload);
            }

            // Após o cadastro, atualiza a tabela
            atualizarTabela();
        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
        }
    };

    return (

        <Container component="main" maxWidth="xs">
            <MenuAppBarProduto/>

            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <TextField onChange={(event) => {
                        setNome(event.target.value);
                    }}

                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome do produto"
                        value={nome}
                        autoComplete="nome"
                        autoFocus
                    />
                    <TextField onChange={(event) => {
                        setDescricao(event.target.value)
                    }}

                        margin="normal"
                        required
                        fullWidth
                        id="descricao"
                        label="Descrição"
                        value={descricao}
                        autoComplete="descricao"
                    />
                    <TextField onChange={(event) => {
                        setValor(event.target.value)
                    }}

                        margin="normal"
                        required
                        fullWidth
                        id="valor"
                        label="Valor"
                        value={valor}
                        autoComplete="valor"
                        type="number"
                    />
                    <TextField onChange={(event) => {
                        setCategoria(event.target.value);
                    }}

                        required
                        fullWidth
                        id="categoria"
                        label="Categoria"
                        value={categoria}
                        autoComplete="categoria"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Salvar
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}
