import React, { useContext, useState } from "react";
import { API } from "../service/api";
import loginBg from "../assets/loginBg.webp";
import { setAccessToken } from "../utils/common_utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider";

const Login = ({ setIsAuthenticated }) => {
  const [toggle, setToggle] = useState(true);
  const [lgshowpswd, setLgShowPswd] = useState(false);
  const [sgshowpswd, setSgShowPswd] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({ email: "" });
  const [signupErrors, setSignupErrors] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const {setAdded,setName} = useContext(DataContext)

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate input
    if (name === "email" && !validateEmail(value)) {
      setLoginErrors((prev) => ({
        ...prev,
        email: "Invalid email format.",
      }));
    } else {
      setLoginErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate input
    if (name === "name" && !validateName(value)) {
      setSignupErrors((prev) => ({
        ...prev,
        name: "Atleast 3 chars long.",
      }));
    } else if (name === "email" && !validateEmail(value)) {
      setSignupErrors((prev) => ({
        ...prev,
        email: "Invalid email format.",
      }));
    } else if (name === "password" && !validatePassword(value)) {
      setSignupErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include an uppercase letter, a special symbol, and a number.",
      }));
    } else {
      setSignupErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,})/;
    return re.test(password);
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      const response = await API.userLogin(login);
      if (response.isSuccess) {
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
        setAdded((prev)=>!prev)
        setName(response.data.name)
        toast.success("Welcome back!!")
        setLogin({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.msg)
    }
  };

  const signupuser = async (e) => {
    e.preventDefault();
    try {
      const response = await API.userSignup(signup);
      if (response.isSuccess) {
        toast.success(response.data.msg)
        setSignup({ email: "", name: "", password: "" });
        setToggle(!toggle);
      }
    } catch (error) {
      toast.error(error.msg)
    }
  };

  return (
    <div className="w-full relative h-[80vh] py-20 flex justify-center items-center xl:px-5 px-2">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      ></div>
      <div className="realtive flex max-w-xl w-full justify-center items-center rounded-3xl bg-white p-5">
        <div className="flex flex-col gap-8 items-center justify-center">
          <h1 className="xl:text-3xl text-2xl font-bold underline text-[#b88e2f]">
            {toggle ? "LogIn" : "SignUp"}
          </h1>
          {toggle ? (
            <form
              onSubmit={loginuser}
              className="flex flex-col gap-5 items-center justify-center"
            >
              <div className="flex flex-col gap-2 items-start justify-center">
                <label className="input input-bordered flex items-center gap-2 xl:px-5 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow input-lg"
                    placeholder="Email"
                    name="email"
                    required={true}
                    value={login.email}
                    onChange={handleLoginChange}
                  />
                </label>
                {loginErrors.email && (
                  <p className="text-red-500 text-sm">{loginErrors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-center justify-center flex-wrap">
                <label className="input input-bordered flex items-center xl:px-5 px-2 gap-2">
                  <svg
                    onClick={() => setLgShowPswd(!lgshowpswd)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70 cursor-pointer"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={lgshowpswd ? "text" : "password"}
                    className="grow input-lg"
                    placeholder="Password"
                    name="password"
                    required={true}
                    value={login.password}
                    onChange={handleLoginChange}
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={!login.email || !login.password}
                className="py-2 px-8 lg:py-4 lg:px-16 font-bold bg-[#B88E2F] text-white hover:bg-white hover:text-[#b88e2f] duration-300 ease-in-out border-[#b88e2f] border-2 border-solid"
              >
                Log In
              </button>
            </form>
          ) : (
            <form
              onSubmit={signupuser}
              className="flex flex-col gap-7 items-center justify-center"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <label className="input input-bordered flex items-center xl:px-5 px-2 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow input-lg"
                    placeholder="Name"
                    name="name"
                    required={true}
                    value={signup.name}
                    onChange={handleSignupChange}
                  />
                </label>
                {signupErrors.name && (
                  <p className="text-red-500">{signupErrors.name}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <label className="input input-bordered flex items-center xl:px-5 px-2 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow input-lg"
                    placeholder="Email"
                    name="email"
                    required={true}
                    value={signup.email}
                    onChange={handleSignupChange}
                  />
                </label>
                {signupErrors.email && (
                  <p className="text-red-500">{signupErrors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <label className="input input-bordered flex items-center xl:px-5 px-2 gap-2">
                  <svg
                    onClick={() => setSgShowPswd(!sgshowpswd)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70 cursor-pointer"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={sgshowpswd ? "text" : "password"}
                    className="grow input-lg"
                    placeholder="Password"
                    required={true}
                    name="password"
                    value={signup.password}
                    onChange={handleSignupChange}
                  />
                </label>
                {signupErrors.password && (
                  <p className="text-red-500 text-xs text-wrap text-center">
                    {signupErrors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!signup.email || !signup.name || !signup.password}
                className="py-2 px-8 lg:py-4 lg:px-16 font-bold bg-[#B88E2F] text-white hover:bg-white hover:text-[#b88e2f] duration-300 ease-in-out border-[#b88e2f] border-2 border-solid"
              >
                Sign Up
              </button>
            </form>
          )}
          <div className="flex justify-center items-center gap-4">
            <span>
              {toggle ? "Don't have an account ?" : "Already have an account ?"}
            </span>
            <span
              onClick={() => setToggle(!toggle)}
              className="underline text-[#B88E2F] cursor-pointer"
            >
              {toggle ? "SignUp" : "LogIn"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
