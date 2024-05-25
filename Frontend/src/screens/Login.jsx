import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { authService } from '../service/auth';
import { useCookies } from 'react-cookie';
import InputMask from 'react-input-mask';
import authToken from '../cookies/appCookies';
import { Link, useNavigate } from 'react-router-dom';
import { useUtils } from '../utils';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const service = authService();

const schema = yup.object().shape({
  cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF é obrigatório').required('CPF é obrigatório'),
  senha: yup.string().trim().required('Senha é obrigatória'),
});

export default function SignIn() {
  const utils = useUtils();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([authToken]);
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await service.login({
        cpf: data.cpf,
        senha: data.senha,
      });

      if (res.data.token) {
        setCookie(authToken, res.data.token, {
          expires: new Date(utils.jwtToJson(res.data.token).exp * 1000),
        });
        navigate('/produto');
      } else {
        setErrorMessage('Credenciais inválidas');
      }
    } catch (error) {
      setErrorMessage('Credenciais inválidas');
    }
  };

  useEffect(() => {
    if (cookies[authToken]) {
      navigate('/produto');
    }
  }, [cookies, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Controller
      name="cpf"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <InputMask mask="999.999.999-99" value={field.value} onChange={field.onChange}>
          {(inputProps) => (
            <TextField
              {...inputProps}
              variant="outlined"
              fullWidth
              label="CPF"
              error={!!errors.cpf}
              helperText={errors.cpf ? errors.cpf.message : ''}
            />
          )}
        </InputMask>
      )}
    />
          <Controller
            name="senha"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                error={!!errors.senha}
                helperText={errors.senha ? errors.senha.message : ''}
                inputProps={{ maxLength: 20 }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/cadastro" variant="body2">
                <Button> Não tem conta? Cadastre-se</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
