import React, { useState, useRef } from "react";
//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Select,InputLabel} from "@mui/material";
//prettier-ignore
import {Stack,Button,Box,Typography,Modal, Grid, TextField,MenuItem , FormControl, FormHelperText} from '@mui/material';
import { addDepto, modDepto, deleteDepto } from "../../helpers/deptos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import { style } from "../../helpers/modalStyle";
import AddIcon from "@mui/icons-material/Add";

const initialValue = {
  nombre: { error: false },
  cliente: { error: false },
};

const DepartamentosTable = (props) => {
  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [depto, setDepto] = useState({});
  const idRef = useRef();
  const nombreRef = useRef();
  const [idCliente, setIdCliente] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setDepto({});
    setIdCliente("");
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
  const handleChange = (event) => {
    setIdCliente(event.target.value);
    setErrores({ ...errores, cliente: { error: false } });
  };

  const onUpdate = (d) => {
    setIdCliente(d.cliente_id_cliente);
    setDepto({
      id_departamento: d.id_departamento,
      nombre_departamento: d.nombre_departamento,
      cliente_id_cliente: d.cliente_id_cliente,
    });
    setIsUpdate(true);
    handleOpen();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateNombre() || !validateCliente()) return;

    const newDepto = {
      id_departamento: isUpdate ? idRef.current.value : null,
      nombre_departamento: nombreRef.current.value,
      cliente_id_cliente: idCliente,
    };

    if (!isUpdate) {
      addDepto(newDepto);
    } else {
      modDepto(newDepto);
    }
    handleClose();
    props.setDeptos();
  };

  const onDelete = (id) => {
    deleteDepto(id);
    props.setDeptos();
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
          Agregar departamento
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
            {!isUpdate ? "AGREGAR DEPARTAMENTO" : "MODIFICAR DEPARTAMENTO"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={6}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID departamento"
                    value={depto.id_departamento}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  inputRef={nombreRef}
                  label="Nombre departamento"
                  onChange={validateNombre}
                  error={errores.nombre.error}
                  helperText={errores.nombre.msg ? errores.nombre.msg : ""}
                  defaultValue={!depto ? " " : depto.nombre_departamento}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.cliente.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Seleccione cliente
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Seleccione cliente"
                    id="demo-simple-select"
                    value={idCliente}
                    onChange={handleChange}
                  >
                    {props.clientes.map((c) => (
                      <MenuItem
                        key={c.id_cliente}
                        value={c.id_cliente}
                        onChange={handleChange}
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
              <TableCell align="center">ID departamento</TableCell>
              <TableCell align="center">Nombre departamento</TableCell>
              <TableCell align="center">ID cliente</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((d) => (
              <TableRow
                key={d.id_departamento}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {d.id_departamento}
                </TableCell>
                <TableCell align="center">{d.nombre_departamento}</TableCell>
                <TableCell align="center">{d.cliente_id_cliente}</TableCell>

                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      onUpdate(d);
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
                    onClick={() => onDelete(d.id_departamento)}
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

export default DepartamentosTable;
