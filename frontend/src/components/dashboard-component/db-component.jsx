import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../full-screen-dialog-component/full-screen-dialog.component";

export default function DbForm() {
  const [rows, setRows] = useState([]);
  const [usuarioData, setUsuarioData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const fetchTarefas = useCallback(
    async (userId, token) => {
      try {
        const response = await axios.get(
          `http://localhost:9999/tasks/getTasksByIdUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRows(response.data);
      } catch (error) {
        console.error("Erro ao buscar as tarefas:", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      // Se não há usuário logado ou token, redireciona para a página de login
      navigate("/");
    } else {
      setUsuarioData(user);
      fetchTarefas(user.id, token); // Passa o token para as requisições
    }
  }, [navigate, fetchTarefas]);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9999/tasks/deleteTasks`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
        },
        data: { id: id, user_id: usuarioData.id },
      });

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      alert(`Tarefa ${id} deletada com sucesso!`);
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      alert("Erro ao deletar a tarefa.");
    }
  };

  const handleFinalize = async (id) => {
    const confirmation = window.confirm("Deseja realmente finalizar a tarefa?");
    if (!confirmation) return;

    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:9999/tasks/finalizeTask/${id}`,
        {
          user_id: usuarioData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
          },
        }
      );

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
        refreshTasks={() =>
          fetchTarefas(usuarioData.id, localStorage.getItem("token"))
        }
      />
    </Box>
  );
}
