import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

export default function DbForm() {
  const [rows, setRows] = useState([]);
  const [usuarioData, setusuarioData] = useState(null);

  // Obtendo o usuário do localStorage e buscando tarefas
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setusuarioData(user); // Salvando os dados do usuário no estado
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
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Dashboard de tarefas
      </Typography>

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
    </Box>
  );
}
