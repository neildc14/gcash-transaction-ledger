import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(null);
  const location = useLocation();
  const navigateToLogin = useNavigate();

  useEffect(() => {
    let stored_credentials = localStorage.getItem("credentials");
    if (stored_credentials) {
      setCredentials(JSON.parse(stored_credentials));
    }
  }, []);

  useEffect(() => {
    console.log(credentials);
    if (!credentials && location.pathname === "/logout") {
      navigateToLogin("/login");
    }
  }, [credentials, location, navigateToLogin]);

  return (
    <AuthContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
