import logo from "../assets/images/cropped.png";
import { useState } from "react";

const Header = () => {
  const [toggled, setToggle] = useState(false);
  const toggleSideBar = () => {
    console.log("toggle");
    setToggle(!toggled);
  };
  return (
    <>
      <header className="p-3 shadow-md shadow-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <img src={logo} alt="this is logo" className="h-8 w-8" />
          </div>
          <div onClick={toggleSideBar}>
            {!toggled ? (
              <svg
                width={40}
                height={40}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.6 6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 1 1 0 2.4H4.8A1.2 1.2 0 0 1 3.6 6Zm0 6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 1 1 0 2.4H4.8A1.2 1.2 0 0 1 3.6 12Zm0 6a1.2 1.2 0 0 1 1.2-1.2h14.4a1.2 1.2 0 1 1 0 2.4H4.8A1.2 1.2 0 0 1 3.6 18Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                width={40}
                height={40}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m6 6 12 12M6 18 18 6 6 18Z" />
              </svg>
            )}
          </div>
        </div>
      </header>
      {toggled && <SideBar />}
    </>
  );
};

function SideBar() {
  return (
    <div className="h-screen  bg-blue-500 z-10 transition ease-out  duration-500 ">
      <nav className="pt-40 flex justify-center items-center flex-col gap-4">
        <a
          href="/add-transaction"
          className="text-xl text-slate-50 font-medium "
        >
          My Dashboard
        </a>
        <a
          href="/add-transaction"
          className="text-xl text-slate-50 font-medium"
        >
          Add Transaction
        </a>
        <a href="/transactions" className="text-xl text-slate-50 font-medium">
          All Transactions
        </a>
      </nav>
    </div>
  );
}

export default Header;
