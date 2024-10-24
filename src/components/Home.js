import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./GlobalProvider";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useAxios } from "../AxiosContext";

const Home = () => {
  const { logUser } = useContext(GlobalContext);
  const [clases, setClases] = useState([]); // Estado para guardar las clases
  const API = useAxios(); // Hook personalizado para hacer solicitudes
  const localStorageUser = JSON.parse(localStorage.getItem("user")); // Obtener el usuario desde localStorage
  const userID = localStorageUser.id_usuario; // Obtener el ID del usuario

  // Función para obtener las clases desde la API
  const fetchClases = async () => {
    try {
      const response = await API.get(`/clases/${userID}`);
      setClases(response.data); // Guardar las clases obtenidas
    } catch (error) {
      console.error("Error obteniendo las clases:", error);
    }
  };

  // Llamada a la API al cargar la página y cada cierto tiempo (e.g., cada 30 segundos)
  useEffect(() => {
    fetchClases(); // Llamada inicial

    const interval = setInterval(() => {
      fetchClases(); // Llamada periódica cada 30 segundos
    }, 30000); // 30,000 ms = 30 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [userID]);

  return (
    <Container>
      <h1>Bienvenido {localStorageUser.nombre}</h1>
      <p>Clases: {logUser?.nombre}</p>

      <Grid container spacing={3}>
        {clases.length > 0 ? (
          clases.map((clase) => (
            <Grid item xs={12} sm={6} md={4} key={clase.ID_Clase}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {clase.Nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Profesor: {clase.ID_Profesor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Horario: {clase.Horario}
                  </Typography>
                  <Button size="small" variant="contained" color="primary">
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div" style={{ marginTop: 20 }}>
            No se encontraron clases.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
