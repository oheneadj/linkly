import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import DashboardNav from "../components/Navbar/DashboardNav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("False");
  const [msg, setMsg] = useState("")

  const router = useRouter();
// Login User 
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Set button to loading status
    setIsLoading("True");

    const credentials = { email, password };
// Try to register the user with axios using the credentials
    try {
      const user = await axios.post("/api/auth/login", credentials);

 // Check if user was successfully registered
      if (user) {
        // Set button loading status to false
        setIsLoading("False");
        // Route to dashboard page if user was created
        return router.push("/dashboard");
      }   
    } catch (error) {
      // Get error message from server
      setMsg(error.response.data.message)
      // Set Button loading status to false
      setIsLoading("False");
      // Display error to user
      setError("True");
    }
  };

  return (
    <>
      <DashboardNav />
      <div className="bg-blue-100 h-screen pt-15">
        <div className="flex px-3 flex-col items-center justify-center">
          
          <div className="bg-white shadow rounded sm:mx-10 lg:w-1/3  md:w-1/2 w-full p-10 m-28">
          {error === "True" ? (<span className="bg-red-500 text-white p-2 px-3 my-3 inline-block rounded">{msg}</span>)
          :("")}
            <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
              Login to your account
            </p>
            <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
              Dont have an account?{" "}
              <Link
                href="/register"
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
              >
                Register here
              </Link>
            </p>

            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />

              <hr className="w-full bg-gray-400" />
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  id="email"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Email
                </label>
                <input
                  required
                  aria-labelledby="email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
              </div>
              <div className="mt-6  w-full">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Password
                </label>
                <div className="relative flex items-center justify-center">
                  <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                  <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                        fill="#71717A"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                {/* Set button to loading state */}
                {isLoading === "False" ? (
                  <button
                    role="button"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 text-sm font-semibold leading-none text-white focus:outline-none bg-teal-700 border rounded hover:bg-teal-600 py-4 w-full"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    role="button"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 text-sm font-semibold leading-none text-white focus:outline-none bg-teal-400 border rounded hover:bg-teal-400 py-4 w-full"
                    disabled
                  >
                    Please wait...
                  </button>
                )}
              </div>
              <p className="focus:outline-none text-sm mt-4 font-medium leading-none mt-6 text-teal-500">
                Forgot your password?{" "}
                <Link
                  href="/register"
                  className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
