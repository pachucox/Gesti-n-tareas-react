import React, { useState, useRef } from "react";
//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Stack,Button,Box,Typography,Modal, Grid, TextField} from "@mui/material";
//prettier-ignore
import{ Select,InputLabel,MenuItem,FormControl,FormHelperText} from '@mui/material'
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { addUser, modUser, deleteUser } from "../../helpers/usuarios";
import UpdateIcon from "@mui/icons-material/Update";
import { style } from "../../helpers/modalStyle";
import AddIcon from "@mui/icons-material/Add";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const initialValue = {
  nombre: { error: false },
  email: { error: false },
  pass: { error: false },
  perfil: { error: false },
  cliente: { error: false },
};

const UsersTable = (props) => {
  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idCliente, setIdCliente] = useState("");
  const [idPerfil, setIdPerfil] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const nombreRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const idRef = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setUser({});
    setIdCliente("");
    setIdPerfil("");
    setErrores(initialValue);
  };

  const validateNombre = () => {
    if (nombreRef.current.value.length < 4) {
      setErrores({
        ...errores,
        nombre: { error: true, msg: "Nombre debe contener 4 letras" },
      });
      return false;
    } else {
      setErrores({ ...errores, nombre: { error: false } });
      return true;
    }
  };
  const validateCorreo = () => {
    if (!validateEmail(emailRef.current.value)) {
      setErrores({
        ...errores,
        email: { error: true, msg: "Ingrese un correo válido" },
      });
      return false;
    } else {
      setErrores({ ...errores, email: { error: false } });
      return true;
    }
  };
  const validatePass = () => {
    if (passRef.current.value.length < 4) {
      setErrores({
        ...errores,
        pass: {
          error: true,
          msg: "Contraseña debe contener al menos 4 caracteres",
        },
      });
      return false;
    } else {
      setErrores({ ...errores, pass: { error: false } });
      return true;
    }
  };
  const validateCliente = () => {
    if (idCliente <= 0) {
      setErrores({
        ...errores,
        cliente: { error: true, msg: "Seleccione un cliente" },
      });
      return false;
    } else {
      setErrores({ ...errores, cliente: { error: false } });
      return true;
    }
  };
  const validatePerfil = () => {
    if (idPerfil <= 0) {
      setErrores({
        ...errores,
        perfil: { error: true, msg: "Seleccione un perfil" },
      });
      return false;
    } else {
      setErrores({ ...errores, perfil: { error: false } });
      return true;
    }
  };
  const handleChangePerfil = (event) => {
    setIdPerfil(event.target.value);
    setErrores({ ...errores, perfil: { error: false } });
  };
  const handleChangeCliente = (event) => {
    setIdCliente(event.target.value);
    setErrores({ ...errores, cliente: { error: false } });
  };

  const onDelete = (id) => {
    deleteUser(id);
    props.setUsuarios();
  };

  const onUpdate = (u) => {
    setIdCliente(u.cliente_id_cliente);
    setIdPerfil(u.perfil_id_perfil);
    setUser({
      id_usuario: u.id_usuario,
      nombre_usuario: u.nombre_usuario,
      email_usuario: u.email_usuario,
      pass_usuario: u.pass_usuario,
      cliente_id_cliente: u.cliente_id_cliente,
      perfil_id_perfil: u.perfil_id_perfil,
    });
    setIsUpdate(true);
    handleOpen();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateNombre() ||
      !validateCorreo() ||
      !validatePass() ||
      !validateCliente() ||
      !validatePerfil()
    )
      return;

    const newUser = {
      id_usuario: isUpdate ? idRef.current.value : null,
      nombre_usuario: nombreRef.current.value,
      email_usuario: emailRef.current.value,
      pass_usuario: passRef.current.value,
      perfil_id_perfil: idPerfil,
      cliente_id_cliente: idCliente,
    };

    if (!isUpdate) {
      addUser(newUser);
    } else {
      modUser(newUser);
    }
    handleClose();
    props.setUsuarios();
  };

  return (
    <>
      <div className="btnDiv">
        <Button
          className="btnAdd"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Agregar usuario
          <AddIcon />
        </Button>
      </div>

      <Modal
        className=""
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxModal" sx={style}>
          <Typography variant="h4" align="center">
            {!isUpdate ? "AGREGAR USUARIO" : "MODIFICAR USUARIO"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={6}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID usuario"
                    value={user.id_usuario}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={!isUpdate ? 12 : 6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  inputRef={nombreRef}
                  label="Nombre usuario"
                  onChange={validateNombre}
                  error={errores.nombre.error}
                  helperText={errores.nombre.msg ? errores.nombre.msg : ""}
                  defaultValue={!user ? " " : user.nombre_usuario}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  inputRef={emailRef}
                  label="Email usuario"
                  onChange={validateCorreo}
                  error={errores.email.error}
                  helperText={errores.email.msg ? errores.email.msg : ""}
                  defaultValue={!user ? " " : user.email_usuario}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  type="password"
                  inputRef={passRef}
                  onChange={validatePass}
                  error={errores.pass.error}
                  helperText={errores.pass.msg ? errores.pass.msg : ""}
                  label="Pass usuario"
                  defaultValue={!user ? " " : user.pass_usuario}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.cliente.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Cliente
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label=" Cliente"
                    id="demo-simple-select"
                    value={idCliente}
                    onChange={handleChangeCliente}
                  >
                    {props.clientes.map((c) => (
                      <MenuItem
                        key={c.id_cliente}
                        value={c.id_cliente}
                        onChange={handleChangeCliente}
                      >
                        {c.nombre_cliente}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.cliente.error ? (
                    <FormHelperText>Seleccione un cliente</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.perfil.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Perfil
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label=" Perfil"
                    id="demo-simple-select"
                    value={idPerfil}
                    onChange={handleChangePerfil}
                  >
                    {props.perfiles.map((p) => (
                      <MenuItem
                        key={p.id_perfil}
                        value={p.id_perfil}
                        onChange={handleChangePerfil}
                      >
                        {p.nombre_perfil}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.perfil.error ? (
                    <FormHelperText>Seleccione un perfil</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onSubmit}
                  >
                    {!isUpdate ? "Agregar" : "Modificar"}
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                    size="large"
                  >
                    CERRAR
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID usuario</TableCell>
              <TableCell align="center">Nombre usuario</TableCell>
              <TableCell align="center">Email usuario</TableCell>
              <TableCell align="center">Pass usuario</TableCell>
              <TableCell align="center">ID perfil</TableCell>
              <TableCell align="center">ID cliente</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((u) => (
              <TableRow
                key={u.id_usuario}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {u.id_usuario}
                </TableCell>
                <TableCell align="center">{u.nombre_usuario}</TableCell>
                <TableCell align="center">{u.email_usuario}</TableCell>
                <TableCell align="center">{u.pass_usuario}</TableCell>
                <TableCell align="center">{u.perfil_id_perfil}</TableCell>
                <TableCell align="center">{u.cliente_id_cliente}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      onUpdate(u);
                    }}
                  >
                    <UpdateIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(u.id_usuario)}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
