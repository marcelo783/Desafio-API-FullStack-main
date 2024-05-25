const Product = require('../models/Product');

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os produtos' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar o produto' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedRows] = await Product.update(req.body, { where: { id } });
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o produto' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Product.destroy({ where: { id } });
        if (deletedRows > 0) {
            res.status(200).json({ message: 'Produto excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao excluir o produto' });
    }
};
