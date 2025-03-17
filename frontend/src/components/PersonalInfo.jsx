import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../components/Title";

const PersonalInfo = ({ user }) => {
  const { backendUrl, token, setUserData } = useContext(ShopContext);
  const birthDateFormat = new Date(user.birthDate)
    .toISOString()
    .split("T")[0]
    .split("-"); // YYYY-MM-DD

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [dayOfBirth, setDayOfBirth] = useState(birthDateFormat[2]);
  const [monthOfBirth, setMonthOfBirth] = useState(birthDateFormat[1]);
  const [yearOfBirth, setYearOfBirth] = useState(birthDateFormat[0]);
  const [email, setEmail] = useState(user.email);

  const currentYear = new Date().getFullYear() - 18;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //Create birthdate before

    let birthDate = Number(
      new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth, 12)
    );

    try {
      const response = await axios.patch(
        backendUrl + "/api/user/update",
        {
          userId: user._id,
          firstName,
          lastName,
          dayOfBirth,
          monthOfBirth,
          yearOfBirth,
          birthDate,
          email,
          stripeCustomerId: user.stripeCustomerId,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // Met à jour userData avec les nouvelles valeurs
        setUserData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            firstName,
            lastName,
            birthDate,
            email,
          },
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-5/6 mt-2 sm:mt-0 sm:w-[90%] lg:w-[50%] text-gray-800 p-3.5 bg-gray-100 rounded-xl mx-1"
    >

      <div className="text-center text-xl sm:text-3xl">
        <Title text1={"PERSONAL"} text2={"INFORMATIONS"} />
      </div>
  
      {/* Display informations  */}
      <div className="flex flex-col sm:flex-row justify-center ">
        {/* Left Side */}
        <div className="flex flex-col sm:gap-4 w-[50%] items-start sm:items-center">
          {/* DIV FirstName */}
          <div className="flex flex-col items-baseline">
            <p className="text-[18px] sm:mx-2">First name : </p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              className=" px-1 py-1 border border-gray-800 w-[150px] max-w-auto"
              placeholder="First name"
              required
            />
          </div>
          {/* DIV LastName*/}
          <div className="flex flex-col items-baseline">
            <p className="text-[18px] sm:mx-2">Last name : </p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              className="px-1 py-1 border border-gray-800 w-[150px] max-w-auto"
              placeholder="Last name"
              required
            />
          </div>
        </div>
        <hr className="border-none w-full h-[0.5px] my-5 sm:h-auto sm:mx-5 sm:w-[0.5px] bg-gray-800" />
        {/* Right Side */}
        <div className="flex flex-col sm:gap-4 w-[50%] items-start 2xl:items-center">
          {/* Date infos */}
          <div className="flex flex-row gap-1 sm:px-2 sm:max-w-full">
            {/* Jour */}
            <div>
              <p className="text-[18px]">Day : </p>
              <select
                value={dayOfBirth}
                onChange={(e) => setDayOfBirth(e.target.value)}
                className="px-1 py-1 border border-gray-800 "
                required
              >
                <option value="">Day</option>
                {[...Array(31).keys()].map((day) => {
                  const formattedDay = String(day + 1).padStart(2, "0"); // Ajoute un 0 devant si < 10
                  return (
                    <option key={formattedDay} value={formattedDay}>
                      {formattedDay}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Mois */}
            <div>
              <p className="text-[18px]">Month :</p>
              <select
                value={monthOfBirth}
                onChange={(e) => setMonthOfBirth(e.target.value)}
                className="px-1 py-1 border border-gray-800 "
                required
              >
                <option value="">Month</option>
                {[...Array(12).keys()].map((month) => {
                  const formattedMonth = String(month + 1).padStart(2, "0"); // Ajoute un 0 devant si < 10
                  return (
                    <option key={formattedMonth} value={formattedMonth}>
                      {formattedMonth}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Année */}
            <div className="">
              <p className="text-[18px]">Year :</p>
              <select
                value={yearOfBirth}
                onChange={(e) => setYearOfBirth(e.target.value)}
                className="px-1 py-1 border border-gray-800 h-auto"
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
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1 sm:px-2 sm:max-w-full">
            <p className="text-[18px] sm:mx-2">Email : </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className=" px-3 py-1 border border-gray-800"
              placeholder="Email"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-black text-white w-[90px] font-light px-8 py-2 mt-4">
          Save
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
