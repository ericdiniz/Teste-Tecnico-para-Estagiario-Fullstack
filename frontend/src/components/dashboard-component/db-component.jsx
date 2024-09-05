import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionar
import FullScreenDialog from "../full-screen-dialog-component/full-screen-dialog.component";

export default function DbForm() {
  const [rows, setRows] = useState([]);
  const [usuarioData, setUsuarioData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate(); // Hook para redirecionar

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Se não há usuário logado, redireciona para a página de login
      navigate("/");
    } else {
      setUsuarioData(user);
      fetchTarefas(user.id);
    }
  }, [navigate]);

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

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

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

  const handleFinalize = async (id) => {
    const confirmation = window.confirm("Deseja realmente finalizar a tarefa?");
    if (!confirmation) return;

    try {
      await axios.patch(`http://localhost:9999/tasks/finalizeTask/${id}`, {
        user_id: usuarioData.id,
      });

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, finalizada: true } : row
        )
      );
    } catch (error) {
      console.error("Erro ao finalizar a tarefa:", error);
      alert("Erro ao finalizar a tarefa.");
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
      renderCell: (params) => {
        if (params.row.finalizada) {
          return <Typography variant="body1">FINALIZADA</Typography>;
        }

        return (
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
              onClick={() => handleFinalize(params.row.id)}
              sx={{ minWidth: "80px" }}
            >
              Finalizar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal(params.row)}
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
        );
      },
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
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenModal(null)}
        >
          CADASTRAR TAREFAS
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "100%", maxWidth: 1200 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <FullScreenDialog
        open={modalOpen}
        handleClose={handleCloseModal}
        taskData={editingTask}
        refreshTasks={() => fetchTarefas(usuarioData.id)}
      />
    </Box>
  );
}
