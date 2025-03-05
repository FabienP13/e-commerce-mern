import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let birthDate = Number(new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth));

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          firstName,
          lastName,
          birthDate,
          street,
          city,
          zipcode,
          country,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const currentYear = new Date().getFullYear() - 18;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="First name"
            required
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Last name"
            required
          />
          <div className="flex flex-col sm:flex-row gap-1 w-full">
            {/* Jour */}
            <select
              value={dayOfBirth}
              onChange={(e) => setDayOfBirth(e.target.value)}
              className="sm:w-1/3 px-1 py-2 border border-gray-800"
              required
            >
              <option value="">Day</option>
              {[...Array(31).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>

            {/* Mois */}
            <select
              value={monthOfBirth}
              onChange={(e) => setMonthOfBirth(e.target.value)}
              className="sm:w-1/3 px-1 py-2 border border-gray-800"
              required
            >
              <option value="">Month</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>
                  {month + 1}
                </option>
              ))}
            </select>
            {/* Année */}
            <select
              value={yearOfBirth}
              onChange={(e) => setYearOfBirth(e.target.value)}
              className="sm:w-1/3 px-1 py-2 border border-gray-800 max-h-[100px] overflow-auto"
              required
            >
              <option value="">Year</option>
              {[...Array(currentYear - 1930 + 1).keys()].map((index) => {
                const year = currentYear - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Street"
            required
          />
          <div className="flex flex-col sm:flex-row gap-1 w-full">
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="City"
              required
            />
            <input
              onChange={(e) => setZipcode(e.target.value)}
              value={zipcode}
              type="text"
              className="w-full sm:w-2/4 px-3 py-2 border border-gray-800"
              placeholder="Zipcode"
              required
            />
          </div>
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Country"
            required
          />
        </>
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-smm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password ?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer "
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer "
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
