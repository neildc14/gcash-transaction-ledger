import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../layouts/Header";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { credentials } = useAuth();

  if (!credentials) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
