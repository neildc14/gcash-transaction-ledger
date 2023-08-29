import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Header from "./layouts/Header";
import AddTransaction from "./pages/AddTransaction";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
      </Routes>
    </>
  );
}

export default App;
