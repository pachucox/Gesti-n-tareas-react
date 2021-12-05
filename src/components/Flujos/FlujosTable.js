import React, { useState, useRef } from "react";

//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Select,InputLabel} from "@mui/material";
//prettier-ignore
import {Stack,Button,Box,Typography,Modal, Grid, TextField,MenuItem , FormControl, FormHelperText} from '@mui/material';
import { addFlujo, modFlujo, deleteFlujo } from "../../helpers/flujos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import { style } from "../../helpers/modalStyle";
import AddIcon from "@mui/icons-material/Add";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const initialValue = {
  descripcion: { error: false },
  fechaI: { error: false },
  fechaT: { error: false },
  tipoFlujo: { error: false },
  depto: { error: false },
};
const today = new Date();
const FlujosTable = (props) => {
  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [flujo, setFlujo] = useState({});
  const idRef = useRef();
  const descripcionRef = useRef();
  const [fechaI, setFechaI] = useState(today.toLocaleDateString("en-US"));
  const [fechaT, setFechaT] = useState(today.toLocaleDateString("en-US"));
  const tipoRef = useRef();
  const [idDepto, setIdDepto] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setFlujo({});
    setIdDepto("");
    setErrores(initialValue);
  };

  const validateDescripcion = () => {
    if (descripcionRef.current.value.length < 5) {
      setErrores({
        ...errores,
        descripcion: { error: true, msg: "Descripcion debe contener 5 letras" },
      });
      return false;
    } else {
      setErrores({ ...errores, descripcion: { error: false } });
      return true;
    }
  };
  const validateTipo = () => {
    if (tipoRef.current.value.length < 4) {
      setErrores({
        ...errores,
        tipoFlujo: { error: true, msg: "Tipo debe contener 4 letras" },
      });
      return false;
    } else {
      setErrores({ ...errores, tipoFlujo: { error: false } });
      return true;
    }
  };

  const validateDepto = () => {
    if (idDepto <= 0) {
      setErrores({
        ...errores,
        depto: { error: true, msg: "Seleccione un departamento" },
      });
      return false;
    } else {
      setErrores({ ...errores, depto: { error: false } });
      return true;
    }
  };
  const handleChange = (event) => {
    setIdDepto(event.target.value);
    setErrores({ ...errores, depto: { error: false } });
  };
  const handleChangeFechaI = (newValue) => {
    const newFecha = newValue.toLocaleDateString("en-US");
    console.log(newFecha);
    setFechaI(newFecha);
  };
  const handleChangeFechaT = (newValue) => {
    const newFecha = newValue.toLocaleDateString("en-US");
    setFechaT(newFecha);
  };

  const onDelete = (id) => {
    deleteFlujo(id);
    props.setFlujos();
  };

  const onUpdate = (f) => {
    setIsUpdate(true);
    setIdDepto(f.departamento_id_departamento);
    setFlujo({
      id_flujo: f.id_flujo,
      descripcion_flujo: f.descripcion_flujo,
      fecha_inicio: f.fecha_inicio,
      fecha_termino: f.fecha_termino,
      tipo_flujo: f.tipo_flujo,
      departamento_id_departamento: f.departamento_id_departamento,
    });
    handleOpen();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateDescripcion() || !validateDepto() || !validateTipo()) return;

    const newFlujo = {
      id_flujo: isUpdate ? idRef.current.value : null,
      descripcion_flujo: descripcionRef.current.value,
      fecha_inicio: fechaI,
      fecha_termino: fechaT,
      tipo_flujo: tipoRef.current.value,
      departamento_id_departamento: idDepto,
    };

    if (!isUpdate) {
      addFlujo(newFlujo);
    } else {
      modFlujo(newFlujo);
    }
    handleClose();
    props.setFlujos();
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
          Agregar flujo
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
            {!isUpdate ? "AGREGAR FLUJO" : "MODIFICAR FLUJO"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={2}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID flujo"
                    value={flujo.id_flujo}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}
              <Grid item xs={isUpdate ? 10 : 12}>
                <TextField
                  sx={{ width: isUpdate ? 380 : 470 }}
                  variant="outlined"
                  inputRef={descripcionRef}
                  label="Descripcion flujo"
                  onChange={validateDescripcion}
                  error={errores.descripcion.error}
                  helperText={
                    errores.descripcion.msg ? errores.descripcion.msg : ""
                  }
                  defaultValue={!flujo ? " " : flujo.descripcion_flujo}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha inicio"
                    inputFormat="MM/dd/yyyy"
                    value={fechaI}
                    onChange={handleChangeFechaI}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha término"
                    inputFormat="MM/dd/yyyy"
                    value={fechaT}
                    onChange={handleChangeFechaT}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  id="datetime-local"
                  label="Fecha inicio"
                  inputRef={fechaI}
                  type="date"
                  defaultValue={!isUpdate ? "2021-01-01" : flujo.fecha_inicio}
                  sx={{ width: 210 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="datetime-local"
                  inputRef={fechaT}
                  label="Fecha termino"
                  type="date"
                  defaultValue={!isUpdate ? "2021-01-01" : flujo.fecha_termino}
                  sx={{ width: 210 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid> */}
              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.depto.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Seleccione departamento
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Seleccione departamento"
                    id="demo-simple-select"
                    value={idDepto}
                    onChange={handleChange}
                  >
                    {props.deptosData.map((d) => (
                      <MenuItem
                        key={d.id_departamento}
                        value={d.id_departamento}
                        onChange={handleChange}
                      >
                        {d.nombre_departamento}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.depto.error ? (
                    <FormHelperText>Seleccione un departamento</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  inputRef={tipoRef}
                  label="Tipo flujo"
                  onChange={validateTipo}
                  error={errores.tipoFlujo.error}
                  helperText={
                    errores.tipoFlujo.msg ? errores.tipoFlujo.msg : ""
                  }
                  defaultValue={!flujo ? " " : flujo.tipo_flujo}
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
              <TableCell align="center">ID flujo</TableCell>
              <TableCell align="center">Descripcion flujo</TableCell>
              <TableCell align="center">Fecha inicio</TableCell>
              <TableCell align="center">Fecha término</TableCell>
              <TableCell align="center">Tipo flujo</TableCell>
              <TableCell align="center">ID departamento</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((f) => (
              <TableRow
                key={f.id_flujo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {f.id_flujo}
                </TableCell>
                <TableCell align="center">{f.descripcion_flujo}</TableCell>
                <TableCell align="center">{f.fecha_inicio}</TableCell>
                <TableCell align="center">{f.fecha_termino}</TableCell>
                <TableCell align="center">{f.tipo_flujo}</TableCell>
                <TableCell align="center">
                  {f.departamento_id_departamento}
                </TableCell>

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
                    onClick={() => onDelete(f.id_flujo)}
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

export default FlujosTable;
