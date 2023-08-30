import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "./SGVIcons";
const DashboardCard = ({ type, title, value }) => {
  const navigateToTransactions = useNavigate();

  const handleNavigateClick = () => {
    navigateToTransactions("/transactions", { state: type });
  };

  return (
    <div className="px-6 py-8  flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
      <div>
        <h2 className="py-2 text-xl font-bold text-white">{title}</h2>
        <h2 className="text-xl font-semibold text-slate-50">
          {" "}
          <span>&#8369;</span>
          {value.toLocaleString()}.00
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
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default DashboardCard;
