import { useState } from "react";

const useCredentials = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (inputEvent) => {
    inputEvent.preventDefault();
    const { name, value } = inputEvent.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return [userCredentials, handleInputChange];
};

export default useCredentials;
