import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../layouts/Header";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { credentials } = useAuth();
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    setLoadPage(true);
  }, []);

  if (!credentials && loadPage) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loadPage && (
        <React.Fragment>
          <Header />
          {children}
        </React.Fragment>
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
