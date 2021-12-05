//prettier-ignore
import {AppBar,Toolbar,Typography,Button,IconButton} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
  items: {
    marginLeft: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.replace("/")}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bienvenido {authCtx.nombre}
          </Typography>
          {authCtx.prioridad === 1 ? (
            <>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/usuarios");
                }}
              >
                Usuarios
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/clientes");
                }}
              >
                Clientes
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/deptos");
                }}
              >
                Departamentos
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/perfiles");
                }}
              >
                Perfiles
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/flujos");
                }}
              >
                Flujos
              </Button>

              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/funciones");
                }}
              >
                Funciones
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/tareas");
                }}
              >
                Tareas
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/tareasUser");
                }}
              >
                Mis Tareas
              </Button>
            </>
          ) : authCtx.prioridad === 2 ? (
            <>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/tareas");
                }}
              >
                Tareas
              </Button>
              <Button
                className={classes.menuButton}
                onClick={() => {
                  history.replace("/tareasUser");
                }}
              >
                Mis Tareas
              </Button>
            </>
          ) : (
            <Button
              className={classes.menuButton}
              onClick={() => {
                history.replace("/tareasUser");
              }}
            >
              Mis Tareas
            </Button>
          )}

          <Button onClick={logoutHandler} variant="contained" color="secondary">
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
