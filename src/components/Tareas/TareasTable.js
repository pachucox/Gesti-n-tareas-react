import React, { useState, useRef, useContext } from "react";
//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Button,Box,Typography,Modal, Grid, TextField,Avatar} from "@mui/material";
//prettier-ignore
import{ Select,InputLabel,MenuItem,FormControl,FormHelperText} from '@mui/material'
import { green, red, orange } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
//prettier-ignore
import { addTarea, modTarea, deleteTarea,calcDif,calcProgresoTarea } from "../../helpers/tareas";
import UpdateIcon from "@mui/icons-material/Update";
import { style } from "../../helpers/modalStyle";
import AddIcon from "@mui/icons-material/Add";
import AuthContext from "../../store/auth-context";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const initialValue = {
  descripcion: { error: false },
  resp: { error: false },
  inicio: { error: false },
  limite: { error: false },
  termino: { error: false },
  funcion: { error: false },
};

const today = new Date();
const locale = today.toLocaleDateString("en-US");

const TareasTable = (props) => {
  const authCtx = useContext(AuthContext);
  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [tarea, setTarea] = useState({});
  const [idResponsable, setIdResponsable] = useState("");
  const [idFuncion, setIdFuncion] = useState("");
  const [idPadre, setIdPadre] = useState("");
  const [idHermana, setIdHermana] = useState("");
  const [open, setOpen] = useState(false);
  const [fechaI, setFechaI] = useState(locale);
  const [fechaL, setFechaL] = useState(locale);
  const idRef = useRef();
  const idCreadorRef = useRef();
  const descRef = useRef();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setTarea({});
    setIdResponsable("");
    setIdFuncion("");
    setIdPadre("");
    setIdHermana("");
    setFechaL(locale);
    setFechaI(locale);
    setErrores(initialValue);
  };

  const validateDesc = () => {
    if (descRef.current.value.length < 4) {
      setErrores({
        ...errores,
        descripcion: { error: true, msg: "Descripción debe contener 4 letras" },
      });
      return false;
    } else {
      setErrores({ ...errores, descripcion: { error: false } });
      return true;
    }
  };
  const validateResp = () => {
    if (idResponsable <= 0) {
      setErrores({
        ...errores,
        resp: { error: true, msg: "Seleccione un responsable" },
      });
      return false;
    } else {
      setErrores({ ...errores, resp: { error: false } });
      return true;
    }
  };
  const validateFuncion = () => {
    if (idFuncion <= 0) {
      setErrores({
        ...errores,
        funcion: { error: true, msg: "Seleccione una función" },
      });
      return false;
    } else {
      setErrores({ ...errores, funcion: { error: false } });
      return true;
    }
  };

  const handleChangeResp = (event) => {
    setIdResponsable(event.target.value);
    setErrores({ ...errores, resp: { error: false } });
  };
  const handleChangeFuncion = (event) => {
    setIdFuncion(event.target.value);
    setErrores({ ...errores, funcion: { error: false } });
  };
  const handleChangePadre = (event) => {
    setIdPadre(event.target.value);
  };
  const handleChangeHermana = (event) => {
    setIdHermana(event.target.value);
  };
  const handleChangeFechaI = (newValue) => {
    const newFecha = newValue.toLocaleDateString("en-US");
    console.log(newFecha);
    setFechaI(newFecha);
  };
  const handleChangeFechaL = (newValue) => {
    const newFecha = newValue.toLocaleDateString("en-US");
    setFechaL(newFecha);
  };
  const onDelete = (id) => {
    deleteTarea(id);
    props.setTareas();
  };

  const onUpdate = (t) => {
    setIsUpdate(true);
    setIdPadre(t.id_tareapadre);
    setIdHermana(t.tarea_id_tarea);
    setIdResponsable(t.id_responsable);
    setIdFuncion(t.funcion_id_funcion);
    setFechaI(t.fecha_inicio);
    setFechaL(t.fecha_limite);
    setTarea({
      id_tarea: t.id_tarea,
      id_creador: t.id_creador,
      descripcion_tarea: t.descripcion_tarea,
      id_tareapadre: t.id_tareapadre,
      tarea_id_tarea: t.tarea_id_tarea,
      fecha_inicio: t.fecha_inicio,
      fecha_limite: t.fecha_limite,
      funcion_id_funcion: t.funcion_id_funcion,
    });
    handleOpen();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateDesc() || !validateResp() || !validateFuncion()) return;

    const newTarea = {
      id_tarea: isUpdate ? idRef.current.value : null,
      descripcion_tarea: descRef.current.value,
      id_creador: isUpdate ? idCreadorRef.current.value : authCtx.id,
      id_responsable: idResponsable,
      fecha_inicio: fechaI,
      fecha_limite: fechaL,
      id_tareapadre: idPadre,
      tarea_id_tarea: idHermana,
      funcion_id_funcion: idFuncion,
    };

    if (!isUpdate) {
      addTarea(newTarea);
    } else {
      modTarea(newTarea);
    }
    handleClose();
    props.setTareas();
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
          Agregar tarea
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
            {!isUpdate ? "AGREGAR TAREA" : "MODIFICAR TAREA"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={3}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID tarea"
                    value={tarea.id_tarea}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}
              <Grid item xs={3}>
                <TextField
                  disabled
                  variant="outlined"
                  inputRef={idCreadorRef}
                  label="ID creador"
                  value={!isUpdate ? authCtx.id : tarea.id_creador}
                ></TextField>
              </Grid>

              <Grid item xs={!isUpdate ? 6 : 6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  inputRef={descRef}
                  label="Descripcion"
                  onChange={validateDesc}
                  error={errores.descripcion.error}
                  helperText={
                    errores.descripcion.msg ? errores.descripcion.msg : ""
                  }
                  defaultValue={!tarea ? " " : tarea.descripcion_tarea}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.resp.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Responsable
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label=" Responsable"
                    id="demo-simple-select"
                    value={idResponsable}
                    onChange={handleChangeResp}
                  >
                    {props.usuarios.map((u) => (
                      <MenuItem
                        key={u.id_usuario}
                        value={u.id_usuario}
                        onChange={handleChangeResp}
                      >
                        {u.nombre_usuario}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.resp.error ? (
                    <FormHelperText>Seleccione un responsable</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  sx={{ minWidth: 210 }}
                  error={errores.funcion.error ? true : false}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Función
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Función"
                    id="demo-simple-select"
                    value={idFuncion}
                    onChange={handleChangeFuncion}
                  >
                    {props.funciones.map((f) => (
                      <MenuItem
                        key={f.id_funcion}
                        value={f.id_funcion}
                        onChange={handleChangeFuncion}
                      >
                        {f.nombre_funcion}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.funcion.error ? (
                    <FormHelperText>Seleccione una funcion</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
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
                    label="Fecha límite"
                    inputFormat="MM/dd/yyyy"
                    value={fechaL}
                    onChange={handleChangeFechaL}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Tarea padre
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Tarea padre"
                    id="demo-simple-select"
                    value={idPadre}
                    onChange={handleChangePadre}
                  >
                    {props.Data.map((t) => (
                      <MenuItem
                        key={t.id_tarea}
                        value={t.id_tarea}
                        onChange={handleChangePadre}
                      >
                        {t.descripcion_tarea}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 210 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Tarea hermana
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Tarea hermana"
                    id="demo-simple-select"
                    value={idHermana}
                    onChange={handleChangeHermana}
                  >
                    {props.Data.map((t) => (
                      <MenuItem
                        key={t.id_tarea}
                        value={t.id_tarea}
                        onChange={handleChangeHermana}
                      >
                        {t.descripcion_tarea}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onSubmit}
                  fullWidth
                >
                  {!isUpdate ? "Agregar" : "Modificar"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="error"
                  size="large"
                  fullWidth
                >
                  CERRAR
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID tarea</TableCell>
              <TableCell align="center">Descripcion tarea</TableCell>
              <TableCell align="center">ID creador</TableCell>
              <TableCell align="center">ID responsable</TableCell>
              <TableCell align="center">Fecha inicio</TableCell>
              <TableCell align="center">Fecha límite</TableCell>
              <TableCell align="center">Progreso Tarea</TableCell>
              <TableCell align="center">ID tarea padre</TableCell>
              <TableCell align="center">ID tarea hermana</TableCell>
              <TableCell align="center">ID función</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((t) => (
              <TableRow
                key={t.id_tarea}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                align="center"
              >
                <TableCell align="center" component="th" scope="row">
                  {t.id_tarea}
                </TableCell>
                <TableCell align="center">{t.descripcion_tarea}</TableCell>
                <TableCell align="center">{t.id_creador}</TableCell>
                <TableCell align="center">{t.id_responsable}</TableCell>
                <TableCell align="center">{t.fecha_inicio}</TableCell>
                <TableCell align="center">{t.fecha_limite}</TableCell>
                <TableCell
                  style={{
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {t.fecha_termino ? (
                    <Avatar
                      sx={{ bgcolor: green[500] }}
                      style={{ fontSize: "1rem" }}
                    >
                      %100
                    </Avatar>
                  ) : calcDif(t.fecha_limite) > 6 ? (
                    <Avatar
                      sx={{ bgcolor: green[500] }}
                      style={{ fontSize: "1rem" }}
                    >
                      %{calcProgresoTarea(t.fecha_inicio, t.fecha_limite)}
                    </Avatar>
                  ) : calcDif(t.fecha_limite) < 0 ? (
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      style={{ fontSize: "1rem" }}
                    >
                      %{calcProgresoTarea(t.fecha_inicio, t.fecha_limite)}
                    </Avatar>
                  ) : (
                    <Avatar
                      sx={{ bgcolor: orange[500] }}
                      style={{ fontSize: "1rem" }}
                    >
                      %{calcProgresoTarea(t.fecha_inicio, t.fecha_limite)}
                    </Avatar>
                  )}
                </TableCell>
                <TableCell align="center">
                  {t.id_tareapadre === 0 ? "No tiene" : t.id_tareapadre}
                </TableCell>
                <TableCell align="center">
                  {t.tarea_id_tarea === 0 ? "No tiene" : t.tarea_id_tarea}
                </TableCell>
                <TableCell align="center">{t.funcion_id_funcion}</TableCell>

                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      onUpdate(t);
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
                    onClick={() => onDelete(t.id_tarea)}
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

export default TareasTable;
