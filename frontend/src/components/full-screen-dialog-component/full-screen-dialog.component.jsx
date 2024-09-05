import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, handleClose, taskData, refreshTasks }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({ title: false, description: false });

  // Preencher o formulário com os dados da tarefa se estiver em modo de edição
  useEffect(() => {
    if (taskData) {
      setForm({
        title: taskData.title,
        description: taskData.description,
        id: taskData.id, // Incluímos o ID da tarefa para a edição
      });
    } else {
      setForm(initialForm); // Reseta o formulário ao abrir o modal para cadastrar
    }
  }, [taskData]);

  // Recupera o user_id do localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setForm((prevForm) => ({
        ...prevForm,
        user_id: user.id,
      }));
    }
  }, [open]);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação simples
    if (!form.title || !form.description) {
      setError({
        title: !form.title,
        description: !form.description,
      });
      return; // Não enviar se os campos estiverem vazios
    }

    const token = localStorage.getItem("token");
    try {
      const url = taskData // Se taskData existe, estamos editando
        ? `http://localhost:9999/tasks/updateTasks/${taskData.id}`
        : "http://localhost:9999/tasks/createTasks";

      console.log(url);
      console.log(form);

      // Use PATCH para atualização
      const method = taskData ? "patch" : "post";

      await axios[method](url, form, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
        },
      }); // Aguarda a resposta da API

      // Limpa o formulário, fecha o modal e recarrega as tarefas no Dashboard
      setForm(initialForm);
      handleClose();
      refreshTasks(); // Recarrega as tarefas no dashboard
    } catch (error) {
      console.error("Erro ao cadastrar/editar tarefa:", error);
      alert("Ocorreu um erro ao processar a tarefa. Tente novamente.");
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", bgcolor: "primary.dark" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {taskData ? "Editar Tarefa" : "Cadastrar Tarefa"}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Fechar
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Preencha os dados da tarefa
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título da tarefa"
                name="title"
                autoComplete="title"
                value={form.title}
                onChange={handleChangeForm}
                error={error.title}
                helperText={error.title ? "Preencha o título da tarefa" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                autoComplete="description"
                multiline
                rows={4}
                value={form.description}
                onChange={handleChangeForm}
                error={error.description}
                helperText={
                  error.description ? "Preencha a descrição da tarefa" : ""
                }
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{ mr: 2 }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="success">
              {taskData ? "Atualizar" : "Salvar"}
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;
