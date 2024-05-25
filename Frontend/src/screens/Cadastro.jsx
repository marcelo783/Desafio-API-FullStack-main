import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputMask from 'react-input-mask';
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { authService } from "../service/auth";

const service = authService();

const schema = yup.object().shape({
  nome: yup
    .string()
    .trim()
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF é obrigatório"
    )
    .required("CPF é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup
    .string()
    .trim()
    .min(5, "A senha deve ter no mínimo 5 caracteres")
    .required("Senha é obrigatória"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = React.useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await service.cadastro(data);
      if (res) {
        setSuccessMessage("Cadastro realizado com sucesso.");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000); // Mensagem de sucesso some após 3 segundos
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        {successMessage && (
          <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nome"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Nome"
                    error={!!errors.nome}
                    helperText={errors.nome ? errors.nome.message : ""}
                    autoFocus
                    inputProps={{ maxLength: 50 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    inputProps={{ maxLength: 80 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="senha"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Senha"
                    type="password"
                    error={!!errors.senha}
                    helperText={errors.senha ? errors.senha.message : ""}
                    minLength={5}
                    inputProps={{ maxLength: 20 }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastre-se
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                <Button>já possui um login? Entrar</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
