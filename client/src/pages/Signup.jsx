import logo from "../assets/images/cropped.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthenticationRequest from "../services/authenticationRequest";
import useCredentials from "../hooks/useCredentials";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Signup = () => {
  const [signupError, setSignupError] = useState(null);
  const navigateToSignUp = useNavigate();
  const navigateToHome = useNavigate();
  const { setCredentials } = useAuth();

  const [userCredentials, handleInputChange] = useCredentials();

  const authenticationRequest = new AuthenticationRequest();
  const signUpMutation = useMutation({
    mutationFn: (credentials) => {
      return authenticationRequest.SignUp(credentials);
    },
    onError: (error) => {
      setSignupError(error.response.data);
    },
    onSuccess: (response) => {
      const user_data = JSON.stringify(response?.data);
      localStorage.setItem("credentials", user_data);
      setCredentials(response.data);
      navigateToHome("/home");
    },
  });

  const handleSignUp = (signUpEvent) => {
    signUpEvent.preventDefault();
    signUpMutation.mutate(userCredentials);
  };

  const getFieldConfig = (attribute, textContent, type) => {
    return {
      attribute,
      textContent,
      type,
      onChange: handleInputChange,
    };
  };

  const formFieldsAttributes = [
    getFieldConfig("email", "Email", "email"),
    getFieldConfig("password", "Password", "password"),
  ];

  return (
    <main className="pt-10 h-screen md:max-w-4xl md:mx-auto">
      <div className="mx-2">
        <img src={logo} alt="gcash logo" className="h-24 w-24 mx-auto" />
        <h2 className="mt-2 text-center text-2xl font-semibold">
          Signup new account
        </h2>
        <section className="mt-10 mx-8 md:mx-auto md:max-w-sm ">
          <form action="" onSubmit={handleSignUp}>
            {formFieldsAttributes?.map((form) => (
              <div key={form.attribute} className="flex flex-col gap-2 my-6">
                <label
                  htmlFor={form.attribute}
                  className="text-2xl font-semibold text-slate-800"
                >
                  {form.textContent}
                </label>
                <input
                  type={form.type}
                  name={form.attribute}
                  onChange={form.onChange}
                  required
                  className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm  md:border-slate-300 "
                />
                <p className="text-red-500">
                  {signupError && signupError[form.attribute]}
                </p>
              </div>
            ))}
            <div className="w-full">
              <button className="mt-4 p-2 w-full rounded-md active:outline focus:outline-violet-600 hover:bg-violet-700 border-b-2 shadow-sm bg-violet-600 text-slate-50 font-semibold text-2xl">
                Signup
              </button>
            </div>{" "}
          </form>{" "}
          <p className="mt-4">
            Didn&apos;t have an account?{" "}
            <button
              className="text-blue-500"
              onClick={() => navigateToSignUp("/login")}
            >
              Login
            </button>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Signup;
