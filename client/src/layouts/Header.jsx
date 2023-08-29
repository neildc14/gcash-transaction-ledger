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
          <div className="hidden md:block">
            <HorizontalNavBar />
          </div>
          <div onClick={toggleSideBar} className="block md:hidden">
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

function NavigationLink({ href, text }) {
  return (
    <a
      href={href}
      className="text-xl md:text-base text-slate-50 md:text-slate-500 md:hover:text-blue-500 font-medium"
    >
      {text}
    </a>
  );
}

function SideBar() {
  return (
    <div className="h-screen bg-blue-500 z-10 transition ease-out duration-500">
      <nav className="pt-40 flex justify-center items-center flex-col gap-4">
        <NavigationLink href="/add-transaction" text="My Dashboard" />
        <NavigationLink href="/add-transaction" text="Add Transaction" />
        <NavigationLink href="/transactions" text="All Transactions" />
      </nav>
    </div>
  );
}

function HorizontalNavBar() {
  return (
    <nav className="flex justify-center items-center flex-row gap-6">
      <NavigationLink href="/add-transaction" text="My Dashboard" />
      <NavigationLink href="/add-transaction" text="Add Transaction" />
      <NavigationLink href="/transactions" text="All Transactions" />
    </nav>
  );
}

export default Header;
