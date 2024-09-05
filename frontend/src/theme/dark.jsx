import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#121212",
      paper: "#1D1D1D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "1px solid #333",
          color: "#FFF",
          "& .MuiDataGrid-cell": {
            color: "#FFF",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333",
            color: "#FFF",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "#FFF",
          },
        },
      },
    },
  },
});
