const express = require('express');
const { check } = require('express-validator');
const authController = require('../controller/auth.controller');
const router = express.Router();

// validator for CPF format
const isValidCPF = (cpf) => {
   
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
};

router.post('/cadastro', [
    check('nome')
        .notEmpty().withMessage('Nome é obrigatório')
        .isLength({ max: 50 }).withMessage('Nome deve ter no máximo 50 caracteres')
        .custom(value => value.trim() !== ''),
    check('cpf')
        .notEmpty().withMessage('CPF é obrigatório')
        .custom(value => isValidCPF(value)).withMessage('CPF deve estar no formato XXX.XXX.XXX-XX'),
    check('email')
        .isEmail().withMessage('E-mail inválido')
        .custom(value => value.trim() !== ''),
    check('senha')
        .isLength({ min: 5 }).withMessage('A senha deve ter no mínimo 5 caracteres')
        .custom(value => value.trim() !== ''),
], authController.cadastro);

router.post('/login', [
    check('cpf')
        .notEmpty().withMessage('CPF é obrigatório')
        .custom(value => isValidCPF(value)).withMessage('CPF deve estar no formato XXX.XXX.XXX-XX')
        .custom(value => value.trim() !== ''),
    check('senha')
        .notEmpty().withMessage('Senha é obrigatória')
        .custom(value => value.trim() !== ''),
], authController.login);

router.post('/logout', authController.logout);

module.exports = router;
