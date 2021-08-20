import { useContext } from "react";
import { Route, useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import AuthLayout from "../Layouts/AuthLayout";
function ProtectedRoute({ path, component: Component, children }) {
  const { authState } = useContext(AuthContext);
  const history = useHistory();
  //   if (!authState.isAuthenticated) history.push("/login");
  return (
    <>
      {!authState.isLoading ? (
        authState.isAuthenticated ? (
          <Route to={path} component={Component} />
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <AuthLayout>
          <Spinner
            style={{ position: "absolute", left: "50%", top: "50%" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </AuthLayout>
      )}
    </>
  );
}
export default ProtectedRoute;
