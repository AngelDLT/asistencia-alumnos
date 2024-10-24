import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { useAxios } from "../AxiosContext";

const RegisterUser = () => {
  const API = useAxios();
  const initialValues = {
    email: "",
    fname: "",
    sname: "",
    userType: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Requerido"),
    fname: Yup.string()
      .required("Requerido"),
    sname: Yup.string()
      .required("Requerido"),
    userType: Yup.string()
      .required("Requerido")
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await API.post("/register", {...values, contrasena: 'contra123'}); // Establecer una contraseña default

      alert("Usuario registrado correctamente!");
      resetForm();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      alert('Error al registrar el usuario');
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
        Registrar usuarios
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
                id="fname"
                name="fname"
                label="Nombre"
                type="fname"
                value={values.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fname && Boolean(errors.fname)}
                helperText={touched.fname && errors.fname}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                id="sname"
                name="sname"
                label="Apellido"
                type="sname"
                value={values.sname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sname && Boolean(errors.sname)}
                helperText={touched.sname && errors.sname}
              />
            </Box>

            <Box mb={3}>
              <InputLabel id="userType-label">
                Tipo de usuario
              </InputLabel>

              <Select
                fullWidth
                id="userType"
                name="userType"
                value={values.userType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userType && Boolean(errors.userType)}
              >
                <MenuItem value={10}>Administrador</MenuItem>
                <MenuItem value={20}>Profesor</MenuItem>
                <MenuItem value={30}>Estudiante</MenuItem>
              </Select>

              {
                <p
                  style={{ color: '#d32f2f', marginTop: 3, marginLeft: 14, marginRight: 14, marginBottom: 0, fontSize: 12 }}
                >
                  { touched.userType && errors.userType }
                </p>
              }
            </Box>

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterUser;
