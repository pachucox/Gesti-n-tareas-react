//prettier-ignore
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,Grid,Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import swal from "sweetalert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//////////////////////////////////////////////////////////////////////

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function SignInSide() {
  const classes = useStyles();
  const emailRef = useRef();
  const passRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userEmail = emailRef.current.value;
    const userPass = passRef.current.value;

    if (!validateEmail(userEmail) || userPass === "")
      return swal("Ingrese un email y contraseña válido");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          email_usuario: userEmail,
          pass_usuario: userPass,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (data.prioridad === 1) {
        authCtx.login(data.prioridad, data.nombre, data.id);
        window.location.replace("http://localhost:3000/tareas");
      } else if (data.nombre && data.prioridad !== 1) {
        authCtx.login(data.prioridad, data.nombre, data.id);
        window.location.replace("http://localhost:3000/tareasUser");
      } else if (!data.nombre) {
        swal("Email o contraseña no validos");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />

          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passRef}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
