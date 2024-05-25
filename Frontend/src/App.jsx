
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';


import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import Produto from './screens/Produto';
import SalvarProduto from './screens/SalvarProduto';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={< Cadastro />} />
        <Route path="/produto" element={<PrivateRoute>< Produto /></PrivateRoute>} />
        <Route path="/SalvarProduto/:id?" element={<PrivateRoute><SalvarProduto /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>

  );
};

export default App;
