import logo from "../assets/images/cropped.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const onProceed = () => {
    navigate("/transactions");
  };

  return (
    <div className="h-screen grid place-items-center place-content-center">
      <img src={logo} alt="gcash logo" className="pb-4" />
      <h1 className="text-center text-5xl font-bold font-lato">GCash-Trans</h1>
      <span className="font-thin text-center text-sm text-slate-500">
        Your Trusted Ledger
      </span>
      <div className="mt-10 ">
        <button
          className="px-20 py-3 bg-sky-500 font-semibold font-lato text-2xl text-slate-50 tracking-wider rounded-md shadow-2xl shadow-blue-200"
          onClick={onProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Home;
