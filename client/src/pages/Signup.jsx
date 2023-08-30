import React from "react";
import logo from "../assets/images/cropped.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const formFieldsAttributes = [
    { attribute: "email", textContent: "Email", type: "email" },
    { attribute: "password", textContent: "Password", type: "password" },
  ];

  const navigateToSignUp = useNavigate();

  return (
    <main className="pt-4 h-screen md:max-w-4xl md:mx-auto">
      <div className="mx-2">
        <img src={logo} alt="gcash logo" className="h-24 w-24 mx-auto" />
        <h2 className="mt-2 text-center text-2xl font-semibold">
          Signup new account
        </h2>
        <section className="mt-10 mx-8 md:mx-auto md:max-w-sm ">
          <form action="">
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
                  required
                  className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm  md:border-slate-300 "
                />
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
