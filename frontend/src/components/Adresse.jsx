import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { BsPencil } from "react-icons/bs";
import FormAddress from "./formAddress";

const Adresse = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);


  const openModal = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAddress(null);
  };

  const onSubmitHandler = async (formData) => {
    // e.preventDefault();
    
   
    try {
      let response
      if(formData._id){ //If ._id --> update Address / Else --> add Address
        response = await axios.patch(
          backendUrl + "/api/address/update",
          {
            formData
          },
          { headers: { token } }
        );
      } 
      else {
        response = await axios.post(
          backendUrl + "/api/address/add",
          {
            formData
          },
          { headers: { token } }
        );
      }
      

      if (response.data.success) {
        closeModal();
        getUserAddresses()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    
    
  };

  const getUserAddresses = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/address/active",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setAddresses(response.data.userAddress);
      }
    } catch (error) {}
  };

  const handleSelectAddress = async (addressId) => {
    try {
      
      const response = await axios.patch(
        backendUrl + "/api/address/is-active",
        { addressId }, 
        { headers: { token } }
      );
  
      if (response.data.success) {
        // Recharger les adresses après mise à jour
        getUserAddresses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAddresses();
  }, [token]);
  return (
    <div className="flex flex-col w-5/6 mt-2 sm:mt-0 sm:w-[90%] lg:w-[50%] text-gray-800 rounded-xl mx-1">
      <div className="text-center text-3xl">
        <Title text1={"MY"} text2={"ADDRESSES"} />
      </div>

      {addresses.map((address, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row justify-center  w-full ${address.isActive ? 'border-2 border-[#368721] bg-[#F4F9F3]' : 'bg-gray-100'} text-gray-800 p-3.5  rounded-xl m-1`}
        >
          <div className="m-auto lg:m-0">           
            {address.isActive && <span className="relative top-[-2.5px] right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md shadow-md">Preferred Address</span>}
          </div>
          <div className={`flex flex-row w-full justify-center items-center lg:justify-start gap-3 lg:w-3/6`}>
            <input onChange={() => handleSelectAddress(address._id)} type="radio" checked={address.isActive === true} />
            
            <p className="">
              {address.street}, {address.zipcode} {address.city}
            </p>
            <BsPencil className="hover:cursor-pointer" size={20} onClick={() => openModal(address)}/>
          </div>
        </div>
      ))}
      <div className="flex flex-row justify-center">
      <button type="button" onClick={() => openModal()} className="bg-black text-white w-[200px] font-light px-8 py-2 mt-4 rounded">Add Address</button>

      </div>

{showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col items-center w-full bg-white p-6 rounded-lg shadow-lg w-96">
            
            
            <FormAddress address={selectedAddress} closeModal={closeModal} onSubmit={onSubmitHandler}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adresse;
