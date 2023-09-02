import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigateToHistory = useNavigate();
  const backToLastPage = () => {
    navigateToHistory(-1);
  };
  return (
    <div className="mt-20 flex flex-col items-center content-center">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <p className="text-lg text-gray-400">Page Not Found.</p>
      <button
        onClick={backToLastPage}
        className="mt-10 py-2 px-8 bg-blue-400 text-white rounded-md"
      >
        Back
      </button>
    </div>
  );
};

export default PageNotFound;
