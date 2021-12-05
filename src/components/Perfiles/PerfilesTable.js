import React, { useState, useRef } from "react";
//prettier-ignore
import { Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material";
//prettier-ignore
import {Stack,Button,Box,Typography,Modal, Grid, TextField} from '@mui/material';
import { addPerfil, deletePerfil, modPerfil } from "../../helpers/perfiles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import { style } from "../../helpers/modalStyle";
import AddIcon from "@mui/icons-material/Add";

const initialValue = {
  nombre: { error: false },
};

const PerfilesTable = (props) => {
  const [errores, setErrores] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [perfil, setPerfil] = useState({});
  const idRef = useRef();
  const nombreRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setPerfil({});
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

  const onDelete = (id) => {
    deletePerfil(id);
    props.setPerfiles();
  };

  const onUpdate = (p) => {
    setPerfil({
      id_perfil: p.id_perfil,
      nombre_perfil: p.nombre_perfil,
    });
    setIsUpdate(true);
    handleOpen();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateNombre()) return;

    const newPerfil = {
      id_perfil: isUpdate ? idRef.current.value : null,
      nombre_perfil: nombreRef.current.value,
    };

    if (!isUpdate) {
      addPerfil(newPerfil);
    } else {
      modPerfil(newPerfil);
    }
    handleClose();
    props.setPerfiles();
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
          Agregar perfil
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
            {!isUpdate ? "AGREGAR PERFIL" : "MODIFICAR PERFIL"}
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing={4}>
              {isUpdate ? (
                <Grid item xs={6}>
                  <TextField
                    disabled
                    variant="outlined"
                    inputRef={idRef}
                    label="ID perfil"
                    value={perfil.id_perfil}
                  ></TextField>
                </Grid>
              ) : (
                ""
              )}
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  inputRef={nombreRef}
                  label="Nombre perfil"
                  onChange={validateNombre}
                  error={errores.nombre.error}
                  helperText={errores.nombre.msg ? errores.nombre.msg : ""}
                  defaultValue={!perfil ? " " : perfil.nombre_perfil}
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
              <TableCell align="center">ID perfil</TableCell>
              <TableCell align="center">Nombre perfil</TableCell>
              <TableCell align="center">Modificar</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Data.map((d) => (
              <TableRow
                key={d.id_perfil}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {d.id_perfil}
                </TableCell>
                <TableCell align="center">{d.nombre_perfil}</TableCell>

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
                    onClick={() => onDelete(d.id_perfil)}
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

export default PerfilesTable;
