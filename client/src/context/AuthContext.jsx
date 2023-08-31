import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(null);
  console.log({ credentials }, "AUTH");
  useEffect(() => {
    if (!credentials) {
      let credentials = localStorage.getItem("credentials");
      setCredentials(JSON.parse(credentials));
    }
  }, [credentials]);

  return (
    <AuthContext.Provider value={credentials}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
