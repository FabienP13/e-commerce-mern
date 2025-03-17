import React, { useContext, useEffect, useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import Order from "../components/Order";
import Adresse from "../components/Adresse";
import Voucher from "../components/Voucher";
import { ShopContext } from "../context/ShopContext";



const MyProfile = () => {

  const [activeComponent, setActiveComponent] = useState();
  const [activeMenu, setActiveMenu] = useState('')
  const { userData } = useContext(ShopContext)
  
 
  useEffect(()=>{
    if (activeComponent !== undefined) {
      setActiveMenu(activeComponent.type.name)
    }
  },[activeComponent])
  
  return (
    <div className={`${activeComponent === undefined ? 'justify-start' : ''}flex flex-col md:flex-row items-start justify-center`}>
      {/* Menu profile*/}
      <div className="w-5/6 bg-[#C689A7] rounded-xl p-6 text-center text-white lg:w-1/5 mx-1">
        <ul className="flex flex-col text-start text-lg p-3 gap-1">
          <li className={`${activeMenu === 'PersonalInfo' ? 'bg-[#ffebf5] text-gray-700 px-3' : ''} w-full cursor-pointer rounded-full sm:transition-all sm:duration-200 hover:bg-[#ffebf5] hover:px-3 hover:text-gray-700`} onClick={() => setActiveComponent(<PersonalInfo user={userData.user}/>)}>Personal Informations</li>
          <li className={`${activeMenu === 'Order' ? 'bg-[#ffebf5] text-gray-700 px-3' : ''} w-full cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-3 hover:text-gray-700 `} onClick={() => setActiveComponent(<Order />)}>My Orders</li>
          <li className={`${activeMenu === 'Adresse' ? 'bg-[#ffebf5] text-gray-700 px-3' : ''} w-full cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-3 hover:text-gray-700 `} onClick={() => setActiveComponent(<Adresse />)}>My Adresses</li>
          <li className={`${activeMenu === 'Voucher' ? 'bg-[#ffebf5] text-gray-700 px-3' : ''} w-full cursor-pointer rounded-full transition-all duration-200 hover:bg-[#ffebf5] hover:px-3 hover:text-gray-700 `} onClick={() => setActiveComponent(<Voucher />)}>My Vouchers</li>
        </ul>
      </div>
      
        {activeComponent}
      
      
    </div>
  );
};

export default MyProfile;
