import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import RegisterIcon from "@mui/icons-material/Login";
import { Grid2 } from "@mui/material";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const initialForm = {
  email: "",
  password: "",
};

const SingUpForm = () => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = "http://localhost:9999/login";
    try {
      const response = await axios.post(baseUrl, form);
      //console.log("Resposta do servidor:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      console.log(JSON.parse(localStorage.getItem("user")));
      navigate("/");
    } catch (error) {
      // Certifique-se de capturar a resposta de erro corretamente
      console.error(
        "Erro no login:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Um erro ocorreu: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Box>
      <Grid2
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />

        <Grid2 xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
              <RegisterIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                helperText="Digite seu email"
                autoFocus
                onChange={handleChangeForm}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText="Digite sua senha"
                onChange={handleChangeForm}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                CADASTRAR
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SingUpForm;
