const Authorization = (credentials) => {
  const headers = {
    Authorization: `Bearer ${credentials}`,
    "Content-Type": "application/json",
  };

  return { headers };
};

export default Authorization;
