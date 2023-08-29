const DashboardCard = ({ title, value }) => {
  return (
    <div className="px-6 py-8  flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
      <div>
        <h2 className="py-2 text-xl font-bold text-white">{title}</h2>
        <h2 className="text-xl font-semibold text-slate-50">{value}</h2>
      </div>
      <button className="inline-flex items-center  gap-2 text-lg font-semibold text-blue-50 border rounded-md py-2 px-6 hover:bg-blue-600 hover:border-blue-500">
        See All{" "}
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
          <path d="m12 16 4-4-4-4" />
          <path d="M8 12h8" />
        </svg>
      </button>
    </div>
  );
};

export default DashboardCard;
