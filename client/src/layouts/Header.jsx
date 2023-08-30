import logo from "../assets/images/cropped.png";
import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon, HamburgerMenuIcon } from "../components/SGVIcons";
import PropTypes from "prop-types";

const ToggleSidebarContext = createContext(null);

const Header = () => {
  const [toggled, setToggle] = useState(false);
  const toggleSideBar = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <>
      <ToggleSidebarContext.Provider value={{ toggleSideBar }}>
        <header className="p-3 md:max-w-5xl md:mx-auto md:mt-6 shadow-md  shadow-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <img src={logo} alt="this is logo" className="h-8 w-8" />
            </div>
            <div className="hidden md:block">
              <NavBar />
            </div>

            <div onClick={toggleSideBar} className="block md:hidden">
              {!toggled ? <HamburgerMenuIcon /> : <CloseIcon />}
            </div>
          </div>
        </header>
        <div className="md:hidden">{toggled && <SideBar />}</div>
      </ToggleSidebarContext.Provider>
    </>
  );
};

const navigationLinks = [
  { href: "/login", text: "Login" },
  { href: "/dashboard", text: "My Dashboard" },
  { href: "/add-transaction", text: "Add Transaction" },
  { href: "/transactions", text: "All Transactions" },
];

function NavigationLink({ href, text }) {
  const { toggleSideBar } = useContext(ToggleSidebarContext);
  const navigateToPages = useNavigate();
  return (
    <button
      onClick={() => {
        navigateToPages(href);
        toggleSideBar();
      }}
      href={href}
      className="text-xl md:text-base text-slate-50 md:text-slate-500 md:hover:text-blue-500 font-medium"
    >
      {text}
    </button>
  );
}

function NavBar() {
  return (
    <nav className="pt-40 md:pt-0 flex justify-center items-center flex-col md:flex-row gap-4 md:gap-6">
      {navigationLinks.map((link) => (
        <NavigationLink key={link.href} href={link.href} text={link.text} />
      ))}
    </nav>
  );
}

function SideBar() {
  return (
    <div className="h-screen bg-blue-500 z-10 transition ease-out duration-500">
      <NavBar />
    </div>
  );
}

NavigationLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default Header;
