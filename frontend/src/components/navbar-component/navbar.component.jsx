import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Importa o contexto de autenticação

const Navbar = () => {
  const { loggedIn, logout } = useAuth(); // Usa o estado de autenticação e funções do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "primary.dark" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gerenciador de Tarefas
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Registrar
          </Button>
          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
