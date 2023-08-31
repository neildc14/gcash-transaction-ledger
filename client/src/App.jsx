import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Header from "./layouts/Header";
import AddTransaction from "./pages/AddTransaction";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
