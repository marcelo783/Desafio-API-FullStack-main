import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useCookies } from 'react-cookie';
import authToken from '../cookies/appCookies';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function MenuAppBarProduto() {
  const navigate = useNavigate();
  const [cookies, setCookie]=useCookies([authToken])
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    navigate('/')
    setCookie(authToken, '')
  };

  return (
    <AppBar position="fixed">
        <Toolbar>
            <Link to={'/produto'}><IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIosIcon />
          </IconButton></Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Salvar Produto
          </Typography>

        </Toolbar>
      </AppBar>
  );
}
