const Transactions = () => {
  const dummyData = [
    {
      transaction_type: "cash-in",
      customer: "Neil Edward Dela Cruz",
      account_number: "09653488807",
      service_fee: 20,
      sub_total: 100,
      total: 120,
    },
    {
      transaction_type: "cash-in",
      customer: "Juan Dela Cruz",
      account_number: "09653488807",
      service_fee: 20,
      sub_total: 100,
      total: 120,
    },
    {
      transaction_type: "cash-in",
      customer: "Camille Joy Dela Cruz",
      account_number: "09653488807",
      service_fee: 20,
      sub_total: 100,
      total: 120,
    },
  ];

  return (
    <main className="pt-4 h-screen ">
      <div className="mx-2">
        <div className="ps-6 py-8 pe-10 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
          <h2 className="text-xl font-semibold text-slate-50">
            GCash Transactions
          </h2>
          <svg
            width={66}
            height={66}
            fill="#fcfcfc"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.8 4.8a2.4 2.4 0 0 0-2.4 2.4V12a2.4 2.4 0 0 0 2.4 2.4V7.2h12a2.4 2.4 0 0 0-2.4-2.4H4.8ZM7.2 12a2.4 2.4 0 0 1 2.4-2.4h9.6a2.4 2.4 0 0 1 2.4 2.4v4.8a2.4 2.4 0 0 1-2.4 2.4H9.6a2.4 2.4 0 0 1-2.4-2.4V12Zm7.2 4.8a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <section className="mt-10  px-2  ">
        {dummyData.map((data) => (
          <div
            key={data.customer}
            className="mb-2 flex align-top justify-between px-2 py-2 rounded-md shadow-sm bg-white border-l-4 border border-l-blue-500"
          >
            <div>
              <p className="font-semibold text-lg text-blue-900">
                {data.customer}
              </p>
              <p className="text-semibold text-base text-slate-500">
                {data.transaction_type.toLocaleUpperCase()}
              </p>
              <p className=" text-base text-slate-500"> {data.total}</p>
            </div>

            <div className="flex gap-3">
              <button className="h-0">
                <svg
                  width={25}
                  height={25}
                  fill="none"
                  stroke="#484747"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.121 14.121A3 3 0 1 0 9.88 9.88a3 3 0 0 0 4.242 4.242Z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
                </svg>
              </button>
              <button className="h-0">
                <svg
                  width={25}
                  height={25}
                  fill="none"
                  stroke="#484747"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m15.232 5.232 3.536 3.536m-2.036-5.036a2.5 2.5 0 0 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732Z" />
                </svg>
              </button>
              <button className="h-0">
                <svg
                  width={25}
                  height={25}
                  fill="none"
                  stroke="#484747"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 11v6m4-6v6M4 7h16m-1 0-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7h14Zm-4 0V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3h6Z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Transactions;
