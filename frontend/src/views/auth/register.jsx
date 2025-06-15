import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const register = async (e) => {
    e.preventDefault();

    await api
      .post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
      })

      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-2">REGISTER</h4>
          <hr className="mb-4" />
          {validation.errors && (
            <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4">
              {validation.errors.map((error, index) => (
                <p key={index} className="text-sm">
                  {error.path} : {error.msg}
                </p>
              ))}
            </div>
          )}
          <form onSubmit={register}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>

            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="mb-4 w-full">
                <label className="block mb-1 font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block mb-1 font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
