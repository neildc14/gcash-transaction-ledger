import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default App;
