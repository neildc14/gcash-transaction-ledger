import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "./SGVIcons";
const DashboardCard = ({ transaction }) => {
  console.log({ transaction });
  const navigateToTransactions = useNavigate();

  const handleNavigateClick = () => {
    navigateToTransactions("/transactions", { state: transaction.type });
  };

  return (
    <div className="px-6 py-8  md:w-96 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
      <div>
        <h2 className="py-2 text-xl font-bold text-white">
          {transaction.title}
        </h2>
        <h2 className="flex flex-wrap text-xl font-semibold text-slate-50">
          <span className="pe-2">Total:</span>
          <span>&#8369;</span>
          <span>{transaction.total?.toLocaleString()}.00</span>
        </h2>
        <h2 className="text-xl flex-wrap font-semibold text-slate-50">
          <span className="pe-2">Profit:</span>
          <span>&#8369;</span>
          <span>{transaction.profit?.toLocaleString()}.00</span>
        </h2>
      </div>
      <button
        className="inline-flex items-center  gap-2 text-lg font-semibold text-blue-50 border rounded-md py-2 px-6 hover:bg-blue-600 hover:border-blue-500"
        onClick={handleNavigateClick}
      >
        See All <ArrowRightIcon />
      </button>
    </div>
  );
};

DashboardCard.propTypes = {
  transaction: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardCard;
