import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAxios } from "../AxiosContext";
import { GlobalContext } from "./GlobalProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setLogUser } = useContext(GlobalContext);
  const API = useAxios();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Requerido"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { email, password } = values;
      const response = await API.post("/usuarios/login", {
        Email: email,
        Contrasena: password,
      });
      setLogUser(response.data.usuario); // Guardar el usuario en el estado global
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.usuario));
      console.log("Login exitoso");
      resetForm();
      navigate("/home");
    } catch (error) {
      console.error("Error al hacer login:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} style={{ width: "300px" }}>
            <Box mb={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Correo electrónico"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Iniciar Sesión|
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
