import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import baseAPI from "../config/api";
import Cookies from "js-cookie";
import { setUserDetail } from "../redux/user/reducer";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const userLogin = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (userLogin.value) {
      history.push("/");
    }
  }, [userLogin, history]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {isSignUp ? (
          <SignUpForm toggleForm={() => setIsSignUp(false)} />
        ) : (
          <LoginForm toggleForm={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  );
}

function LoginForm({ toggleForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const isLogin = localStorage.getItem("userSession");
    if (isLogin) {
      history.push("/");
    }
  }, [history]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter the username and password");
    } else {
      try {
        const res = await baseAPI.post("/auth/token", {
          username,
          password,
        });
        Cookies.set("accessToken", res.data.result.token);
        const myInfor = await baseAPI.get("/users/my-info");
        dispatch(setUserDetail(myInfor.data.result));
        localStorage.setItem("userSession", JSON.stringify({ login: true }));
        window.location.href = "/";
      } catch (err) {
        setError("Username or password is invalid!");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
        <p>{error}</p>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
}

function SignUpForm({ toggleForm }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = { username, password, dob, email, firstName, lastName };
    try {
      const res = await baseAPI.post("/users", payload);
      if (res) {
        try {
          const res = await baseAPI.post("/auth/token", {
            username,
            password,
          });
          Cookies.set("accessToken", res.data.result.token);
          const myInfor = await baseAPI.get("/users/my-info");
          dispatch(setUserDetail(myInfor.data.result));
          localStorage.setItem("userSession", JSON.stringify({ login: true }));
          window.location.href = "/";
        } catch (err) {
          setError("Something went wrong!");
        }
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            required
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            required
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date of Birth</label>
          <input
            required
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">First name</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Last name</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>
        <p className="text-red-500">{error}</p>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </>
  );
}
