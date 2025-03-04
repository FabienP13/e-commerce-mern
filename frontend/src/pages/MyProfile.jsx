import React, { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import Order from "../components/Order";
import Adresse from "../components/Adresse";
import Voucher from "../components/Voucher";


const MyProfile = () => {

  const [activeComponent, setActiveComponent] = useState();
  console.log(activeComponent)

  return (
    <div className="flex flex-row">
      <div className="bg-[#C689A7] rounded-xl p-8 text-center text-white w-1/4">
        <ul className="flex flex-col text-start text-lg p-4">
          <li className="w-5/6 cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-4 hover:text-gray-700 " onClick={() => setActiveComponent(<PersonalInfo />)}>Personal Informations</li>
          <li className="w-5/6 cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-4 hover:text-gray-700 " onClick={() => setActiveComponent(<Order />)}>My Orders</li>
          <li className="w-5/6 cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-4 hover:text-gray-700 " onClick={() => setActiveComponent(<Adresse />)}>My Adresses</li>
          <li className="w-5/6 cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-4 hover:text-gray-700 " onClick={() => setActiveComponent(<Voucher />)}>My Vouchers</li>
        </ul>
      </div>
      <div className="w-3/4 p-8">
        {activeComponent}
      </div>
    </div>
  );
};

export default MyProfile;
