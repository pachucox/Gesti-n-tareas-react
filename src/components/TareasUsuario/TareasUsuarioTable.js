import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Button,Avatar} from "@mui/material";
import { Stack, Box, Typography, Modal, Grid, TextField } from "@mui/material";
import { style } from "../../helpers/modalStyle";
import { green, red, orange } from "@mui/material/colors";
import { modTarea, calcDif, calcProgresoTarea } from "../../helpers/tareas";
//prettier-ignore
import {addJustificacion,getEmailCreador,enviarMail,} from "../../helpers/justificaciones";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
const today = new Date();

const initialValue = {
  descripcion: { error: false },
};

const TareasUsuarioTable = (props) => {
  const authCtx = useContext(AuthContext);
  const [errores, setErrores] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [idTarea, setIdTarea] = useState();
  const descripcionRef = useRef();
  const handleOpen = (idTarea) => {
    setIdTarea(idTarea);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validateDescripcion = () => {
    if (descripcionRef.current.value.length < 4) {
      setErrores({
        ...errores,
        descripcion: {
          error: true,
          msg: "Descripcion debe contener 4 letras",
        },
      });
      return false;
    } else {
      setErrores({ ...errores, descripcion: { error: false } });
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateDescripcion()) return;
    const newJustificacion = {
      descripcion_justificacion: descripcionRef.current.value,
      tarea_id_tarea: idTarea,
    };
    addJustificacion(newJustificacion);
    const emailCreador = await getEmailCreador(idTarea);
    const msg = descripcionRef.current.value;
    enviarMail(idTarea, emailCreador, msg, authCtx.nombre, authCtx.id);
    handleClose();
  };

  const onTerminar = (t) => {
    t.fecha_termino = today.toLocaleDateString("en-US");
    console.log(t);
    modTarea(t);
  };

  return (
    <>
      <Modal
        className=""
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxModal" sx={style}>
          <Typography variant="h4" align="center">
            AGREGAR JUSTIFICACION
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={2}>
                <TextField
                  disabled
                  variant="outlined"
                  label="ID tarea"
                  value={idTarea}
                ></TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  inputRef={descripcionRef}
                  label="Descripcion justificacion"
                  onChange={validateDescripcion}
                  error={errores.descripcion.error}
                  helperText={
                    errores.descripcion.msg ? errores.descripcion.msg : ""
                  }
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
                    Justificar
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
              <TableCell align="center">ID tarea</TableCell>
              <TableCell align="center">Descripcion tarea</TableCell>
              <TableCell align="center">ID creador</TableCell>
              <TableCell align="center">Fecha inicio</TableCell>
              <TableCell align="center">Fecha límite</TableCell>
              <TableCell align="center">Progreso</TableCell>
              <TableCell align="center">ID tarea padre</TableCell>
              <TableCell align="center">ID tarea hermana</TableCell>
              <TableCell align="center">ID función</TableCell>
              <TableCell align="center">Terminar</TableCell>
              <TableCell align="center">Notificar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((t) => (
              <TableRow
                key={t.id_tarea}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {t.id_tarea}
                </TableCell>
                <TableCell align="center">{t.descripcion_tarea}</TableCell>
                <TableCell align="center">{t.id_creador}</TableCell>
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
                      onTerminar(t);
                    }}
                  >
                    <CheckCircleIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleOpen(t.id_tarea)}
                  >
                    <AnnouncementIcon />
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

export default TareasUsuarioTable;
