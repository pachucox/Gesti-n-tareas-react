import React, { useState, useRef, useReducer } from "react";

//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Select,InputLabel} from "@mui/material";
//prettier-ignore
import {Stack,Button,Box,Typography,Modal, Grid, TextField,MenuItem , FormControl, FormHelperText} from '@mui/material';
import { addFuncion, modFuncion, deleteFuncion } from "../../helpers/funciones";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import { style } from "../../helpers/modalStyle";
import AddIcon from "@mui/icons-material/Add";

const initialValue = {
  nombre: { error: false },
  flujo: { error: false },
};

const FuncionesTable = (props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [funcion, setFuncion] = useState({});
  const idRef = useRef();
  const nombreRef = useRef();
  const [idFlujo, setIdFlujo] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setFuncion({});
    setIdFlujo("");
    setErrores(initialValue);
  };

  const validateNombre = () => {
    if (nombreRef.current.value.length < 5) {
      setErrores({
        ...errores,
        nombre: { error: true, msg: "Nombre debe contener 5 letras" },
      });
      return false;
    } else {
      setErrores({ ...errores, nombre: { error: false } });
      return true;
    }
  };

  const validateFlujo = () => {
    if (idFlujo <= 0) {
      setErrores({
        ...errores,
        flujo: { error: true, msg: "Seleccione un flujo" },
      });
      return false;
    } else {
      setErrores({ ...errores, flujo: { error: false } });
      return true;
    }
  };
  const handleChange = (event) => {
    setIdFlujo(event.target.value);
    setErrores({ ...errores, flujo: { error: false } });
  };

  const onDelete = (id) => {
    deleteFuncion(id);
    props.setFunciones();
    forceUpdate();
  };

  const onUpdate = (f) => {
    setIsUpdate(true);
    setIdFlujo(f.flujo_id_flujo);
    setFuncion({
      id_funcion: f.id_funcion,
      nombre_funcion: f.nombre_funcion,
      flujo_id_flujo: f.flujo_id_flujo,
    });
    handleOpen();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateNombre() || !validateFlujo()) return;

    const newFuncion = {
      id_funcion: isUpdate ? idRef.current.value : null,
      nombre_funcion: nombreRef.current.value,
      flujo_id_flujo: idFlujo,
    };

    if (!isUpdate) {
      addFuncion(newFuncion);
    } else {
      modFuncion(newFuncion);
    }
    handleClose();
    props.setFunciones();
    forceUpdate();
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
          Agregar función
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
            {!isUpdate ? "AGREGAR FUNCIÓN" : "MODIFICAR FUNCIÓN"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={2}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID funcion"
                    value={funcion.id_funcion}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}
              <Grid item xs={isUpdate ? 10 : 6}>
                <TextField
                  sx={{ width: isUpdate ? 380 : 210 }}
                  variant="outlined"
                  inputRef={nombreRef}
                  label="Nombre funcion"
                  onChange={validateNombre}
                  error={errores.nombre.error}
                  helperText={errores.nombre.msg ? errores.nombre.msg : ""}
                  defaultValue={!funcion ? " " : funcion.nombre_funcion}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.flujo.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Seleccione flujo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Seleccione departamento"
                    id="demo-simple-select"
                    value={idFlujo}
                    onChange={handleChange}
                  >
                    {props.flujosData.map((f) => (
                      <MenuItem
                        key={f.id_flujo}
                        value={f.id_flujo}
                        onChange={handleChange}
                      >
                        {f.descripcion_flujo}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.flujo.error ? (
                    <FormHelperText>Seleccione un flujo</FormHelperText>
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
              <TableCell align="center">ID función</TableCell>
              <TableCell align="center">Nombre función</TableCell>
              <TableCell align="center">ID flujo</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((f) => (
              <TableRow
                key={f.id_funcion}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {f.id_funcion}
                </TableCell>
                <TableCell align="center">{f.nombre_funcion}</TableCell>
                <TableCell align="center">{f.flujo_id_flujo}</TableCell>

                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      onUpdate(f);
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
                    onClick={() => onDelete(f.id_funcion)}
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

export default FuncionesTable;
