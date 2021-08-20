import Dashboard from "./components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import AuthContextProvider from "./contexts/AuthContext";
import BlogContextProvider from "./contexts/BlogContext";
import ProtectedRoute from "./components/Route/ProtectedRoute";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthContextProvider>
            <BlogContextProvider>
              <Route
                path="/"
                exact
                component={() => <Redirect to="/login" />}
              />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/home" component={Dashboard} />
            </BlogContextProvider>
          </AuthContextProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
