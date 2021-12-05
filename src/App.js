import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import AuthPage from "./pages/AuthPage";
import StartingPage from "./pages/StartingPage";
import FlujosPage from "./pages/FlujosPage";
import FuncionesPage from "./pages/FuncionesPage";
import AdminPage from "./pages/AdminPage";
import TareasPage from "./pages/TareasPage";
import UsersPage from "./pages/UsersPage";
import ClientsPage from "./pages/ClientsPage";
import DepartamentosPage from "./pages/DepartamentosPage";
import PerfilesPage from "./pages/PerfilesPage";
import TareasUsuario from "./pages/TareasUsuarioPage";

import Layout from "./components/Layout/Layout";

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, prioridad } = authCtx;

  return (
    <Switch>
      <Route path="/auth">
        {isLoggedIn && <Redirect to="/" />}
        {!isLoggedIn && <AuthPage />}
      </Route>

      <Layout>
        <Route path="/admin">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <AdminPage />}
        </Route>

        <Route path="/usuarios">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <UsersPage />}
        </Route>
        <Route path="/clientes">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <ClientsPage />}
        </Route>
        <Route path="/deptos">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <DepartamentosPage />}
        </Route>
        <Route path="/perfiles">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <PerfilesPage />}
        </Route>
        <Route path="/flujos">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <FlujosPage />}
        </Route>

        <Route path="/funciones">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && prioridad !== 1 && <Redirect to="/" />}
          {prioridad === 1 && <FuncionesPage />}
        </Route>
        <Route path="/tareas">
          {!isLoggedIn && <Redirect to="/auth" />}
          {/* {isLoggedIn && prioridad === 3 && <Redirect to="/" />} */}
          {prioridad === 1 || prioridad === 2 ? (
            <TareasPage />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        <Route path="/tareasUser">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && <TareasUsuario />}
        </Route>

        <Route exact path="/">
          {isLoggedIn && <StartingPage />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
