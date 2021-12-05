import React, { useState, useRef } from "react";
//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Stack,Button,Box,Typography,Modal, Grid, TextField} from "@mui/material";
//prettier-ignore
import {deleteCliente,addCliente,modCliente,Fn} from "../../helpers/clientes";
import { style } from "../../helpers/modalStyle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";

const initialValue = {
  rut: { error: false },
  nombre: { error: false },
};

const ClientsTable = (props) => {
  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({});
  const nombreRef = useRef();
  const rutRef = useRef();
  const idRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setClient({});
    setErrores(initialValue);
  };

  const onUpdate = (c) => {
    setClient({
      id_cliente: c.id_cliente,
      rut_cliente: c.rut_cliente,
      nombre_cliente: c.nombre_cliente,
    });
    setIsUpdate(true);
    handleOpen();
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
  const validateRut = () => {
    // const isRut = Fn.validaRut(rutRef.current.value);
    if (!Fn.validaRut(rutRef.current.value)) {
      setErrores({
        ...errores,
        rut: { error: true, msg: "Ingrese un rut válido" },
      });
      return false;
    } else {
      setErrores({ ...errores, rut: { error: false } });
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateRut() || !validateNombre()) return;

    const newCliente = {
      id_cliente: isUpdate ? idRef.current.value : null,
      rut_cliente: rutRef.current.value,
      nombre_cliente: nombreRef.current.value,
    };

    if (!isUpdate) {
      addCliente(newCliente);
    } else {
      modCliente(newCliente);
    }
    handleClose();
    props.setClientes();
  };
  const onDelete = (id) => {
    deleteCliente(id);
    props.setClientes();
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
          Agregar cliente
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
            {!isUpdate ? "AGREGAR CLIENTE" : "MODIFICAR CLIENTE"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={6}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID cliente"
                    value={client.id_cliente}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  inputRef={rutRef}
                  label="Rut cliente"
                  onChange={validateRut}
                  error={errores.rut.error}
                  helperText={errores.rut.msg ? errores.rut.msg : ""}
                  defaultValue={!client ? " " : client.rut_cliente}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  inputRef={nombreRef}
                  label="Nombre cliente"
                  onChange={validateNombre}
                  error={errores.nombre.error}
                  helperText={errores.nombre.msg ? errores.nombre.msg : ""}
                  defaultValue={!client ? " " : client.nombre_cliente}
                ></TextField>
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
              <TableCell align="center">ID cliente</TableCell>
              <TableCell align="center">Rut cliente</TableCell>
              <TableCell align="center">Nombre cliente</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((u) => (
              <TableRow
                key={u.id_cliente}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {u.id_cliente}
                </TableCell>
                <TableCell align="center">{u.rut_cliente}</TableCell>
                <TableCell align="center">{u.nombre_cliente}</TableCell>

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
                    onClick={() => onDelete(u.id_cliente)}
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

export default ClientsTable;
