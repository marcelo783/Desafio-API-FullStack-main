const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const secury = process.env.TOKEN_SECRET;

exports.cadastro = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, cpf, email, senha } = req.body;
    const unformattedCPF = cpf.replace(/\D/g, ''); // Remove formatação do CPF

    try {
        // Verifica se o CPF já está em uso
        const cpfExists = await User.findOne({ where: { cpf: unformattedCPF } });
        if (cpfExists) {
            return res.status(400).json({ error: 'CPF já está em uso' });
        }

        // Verifica se o e-mail já está em uso
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ error: 'E-mail já está em uso' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria o usuário no banco de dados
        await User.create({
            nome,
            cpf: unformattedCPF, // Armazena CPF sem formatação
            email,
            senha: hashedPassword
        });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { cpf, senha } = req.body;
    const unformattedCPF = cpf.replace(/\D/g, ''); // Remove formatação do CPF

    try {
        const user = await User.findOne({ where: { cpf: unformattedCPF } });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, secury, { expiresIn: '5h' });
        res.json({ token });
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
};
