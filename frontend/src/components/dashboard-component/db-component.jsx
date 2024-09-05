import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FullScreenDialog from "../full-screen-dialog-component/full-screen-dialog.component";

export default function DbForm() {
  const [rows, setRows] = useState([]);
  const [usuarioData, setUsuarioData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para abrir/fechar o modal

  // Obtendo o usuário do localStorage e buscando tarefas
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsuarioData(user); // Salvando os dados do usuário no estado
      fetchTarefas(user.id);
    }
  }, []);

  // Função para buscar as tarefas do backend
  const fetchTarefas = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/tasks/getTasksByIdUser/${userId}`
      );
      setRows(response.data);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // Função para abrir o modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Função para deletar tarefa
  const handleDelete = async (id) => {
    try {
      if (!usuarioData) {
        alert("Usuário não encontrado.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:9999/tasks/deleteTasks`,
        {
          data: { id: id, user_id: usuarioData.id },
        }
      );

      if (response.status === 200) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        alert(`Tarefa ${id} deletada com sucesso!`);
      }
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      alert("Erro ao deletar a tarefa.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => alert(`Finalizar tarefa ${params.row.id}`)}
            sx={{ minWidth: "80px" }}
          >
            Finalizar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert(`Editar tarefa ${params.row.id}`)}
            sx={{ minWidth: "80px" }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            sx={{ minWidth: "80px" }}
          >
            Deletar
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Dashboard de tarefas
        </Typography>
        <Button variant="contained" color="success" onClick={handleOpenModal}>
          CADASTRAR TAREFAS
        </Button>
      </Box>

      <Box
        sx={{
          height: 600,
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* Modal para cadastrar tarefa */}
      <FullScreenDialog
        open={modalOpen}
        handleClose={handleCloseModal}
        refreshTasks={() => fetchTarefas(usuarioData.id)} // Passa a função para atualizar as tarefas
      />
    </Box>
  );
}
