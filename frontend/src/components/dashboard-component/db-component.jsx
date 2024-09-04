import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

export default function DbForm() {
  const [rows, setRows] = useState([]); // Estado para armazenar as tarefas

  // Obtendo o usuário do localStorage e buscando tarefas
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchTarefas(user.id);
    }
  }, []);

  // Função para buscar as tarefas do backend
  const fetchTarefas = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/tasks/getTasksByIdUser/${userId}`
      );
      setRows(response.data); // Atualizando o estado com as tarefas obtidas
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
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
      width: 800,
      editable: true,
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
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
