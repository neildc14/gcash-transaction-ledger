import axios from "axios";

const fetchTransactions = async () => {
  const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

  const response = await axios.get(ENDPOINT);

  return response.data;
};

export default fetchTransactions;
