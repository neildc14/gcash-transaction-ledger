import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(null);
  const location = useLocation();
  const navigateToLogin = useNavigate();

  useEffect(() => {
    let cookie = Cookies.get("jwt");
    if (cookie) {
      setCredentials(JSON.parse(cookie));
    }
  }, []);

  useEffect(() => {
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
