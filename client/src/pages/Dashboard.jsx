import React from "react";
import DashboardCard from "../components/Card";

const Dashboard = () => {
  return (
    <main className="pt-4 h-screen ">
      <div className="mx-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-700">Dashboard</h2>
        <DashboardCard title="Total Cash-In" value={10000} />
        <DashboardCard title="Total Cash-Out" value={100000} />
        <DashboardCard title="Total Bank-Transfer" value={20000} />
      </div>
    </main>
  );
};

export default Dashboard;
