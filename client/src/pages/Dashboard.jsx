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
      <div className="mx-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-700">Dashboard</h2>
        {totalTransactions?.map((transaction) => (
          <DashboardCard
            key={transaction.type}
            title={transaction.type}
            value={transaction.total}
          />
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
