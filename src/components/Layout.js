import React from "react";
import {
  Box,
  Container,
  Select,
  Typography,
  InputLabel,
  Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAxios } from "../AxiosContext";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const API = useAxios();

  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const userName = localStorageUser.nombre;
  const userEmail = localStorageUser.email;

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
    alert('Sesion cerrada');
  };

  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: "black",
          borderBottomStyle: "solid",
          height: 100,
          borderBottomWidth: 1,
        }}
        mt={5}
        mb={5}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            { userName || 'Usuario' }
          </Typography>
          <Typography variant="h5">
            { userEmail || 'Usuario@mail.com' }
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          size="large"
          sx={{ height: 60, fontSize: 18 }}
          onClick={ onLogOut }
        >
          Cerrar sesión
        </Button>
      </Box>
      {
        children
      }
    </Container>
  );
};

export default Layout;
