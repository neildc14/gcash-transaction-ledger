import DashboardCard from "../components/Card";
import TotalRequest from "../services/totalRequest";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const totalRequest = new TotalRequest();
  const { data: totalTransactions } = useQuery({
    queryKey: [import.meta.env.VITE_REACT_APP_TOTAL_KEY],
    queryFn: () => totalRequest.getTotal(),
  });

  return (
    <main className="pt-4 h-screen ">
      <div className="mx-2 md:max-w-4xl md:mx-auto">
        <h2 className="mb-4 text-xl  md:text-2xl  font-semibold text-slate-700 ">
          Dashboard Overview
        </h2>
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4 ">
          {totalTransactions?.map((transaction) => (
            <DashboardCard key={transaction.type} transaction={transaction} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
