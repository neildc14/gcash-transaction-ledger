import axios from "axios";

const fetchTransactions = async () => {
  const response = await axios.get("http://localhost:3000/api/transactions");

  return response.data;
};

export default fetchTransactions;
