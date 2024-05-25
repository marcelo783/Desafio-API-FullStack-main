import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Tooltip } from '@mui/material';
import { Await, Link, useNavigate } from 'react-router-dom';
import { ProdutoService } from '../../service/ProdutoService';
import { useProdutoStore } from '../../store/produtoStore';

const service = ProdutoService();

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({ atualizarTabela }) {
    const navigate = useNavigate();
    const { produtos } = useProdutoStore()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - produtos.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (id) => {
        await service.deletarProduto(id).then(async (res) => {
            if (res) {
                await atualizarTabela()
            }
        })

    };

    const handleEditar = async (id) => {
        navigate(`/SalvarProduto/${id}`)
    };


    return (
        <TableContainer style={{ marginTop: '7rem' }} component={Paper}>
            <Link to='/SalvarProduto'>
                <Button variant="contained" endIcon={<AddIcon />}>
                    Adicionar Produto
                </Button>
            </Link>

            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    <TableRow>
                        <TableCell style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Nome</TableCell>
                        <TableCell style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Descrição</TableCell>
                        <TableCell style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Valor</TableCell>
                        <TableCell style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Categoria</TableCell>
                        <TableCell style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Ações</TableCell>
                    </TableRow>
                    {(rowsPerPage > 0
                        ? produtos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : produtos
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.nome}</TableCell>
                            <TableCell>{row.descricao}</TableCell>
                            <TableCell>{row.valor}</TableCell>
                            <TableCell>{row.categoria}</TableCell>
                            <TableCell>

                                <Tooltip title="Editar">
                                    <IconButton onClick={() => handleEditar(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Deletar">
                                    <IconButton onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>



                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                            colSpan={3}
                            count={produtos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
