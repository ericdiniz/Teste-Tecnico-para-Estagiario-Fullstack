import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true,
  },
  {
    field: "Description",
    headerName: "Description",
    width: 600,
    editable: true,
  },
];

const rows = [
  { id: 1, Description: "Snow", title: "Jon" },
  { id: 2, Description: "Lannister", title: "Cersei" },
  { id: 3, Description: "Lannister", title: "Jaime" },
  { id: 4, Description: "Stark", title: "Arya" },
  { id: 5, Description: "Targaryen", title: "Daenerys" },
  { id: 6, Description: "Melisandre", title: "Daenerys" },
  { id: 7, Description: "Clifford", title: "Ferrara" },
  { id: 8, Description: "Frances", title: "Rossini" },
  { id: 9, Description: "Roxie", title: "Harvey" },
];

export default function DbForm() {
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
          width: "100%", // Ajuste o tamanho conforme necessário
          maxWidth: 1200, // Para limitar a largura máxima
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: rows.length,
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
