import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [dateHistory, setDateHistory] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear())
  
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      
      if (response.data.success) {
        let dateArray = dateHistory;
        setOrderData(response.data.orders);
        response.data.orders.map((order) => {
          if (
            !dateHistory.includes(
              new Date(order.date).toISOString().split("T")[0].split("-")[0]//Check if dateHistory include order's year
            )
          ) {
            dateArray.push(
              new Date(order.date).toISOString().split("T")[0].split("-")[0]
            );
          }
          setDateHistory(dateArray.reverse());
        });
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
    
  }, [token]);

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
  };

  return (
    <div className=" w-5/6 mt-2 sm:mt-1 md:mt-0 sm:w-[90%] lg:w-[50%]  p-3.5 bg-gray-100 rounded-xl mx-1">
      <div className="text-center text-3xl">
        <Title text1={"ORDERS"} text2={"HISTORY"} />
      </div>
      <div>
        <div className="text-center">
        <select  onChange={handleYearChange} className="p-2 font-semibold rounded-xl">
          {dateHistory.map((date, index) => (
            <option key={index}>{date}</option>
          ))}
        </select>
        </div>
        
        {orderData.filter((order) => new Date(order.date).getFullYear() === year).map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-300 rounded-lg p-5 md:p-8 my-3 md:my-4 text-sm sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Payment Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {order.amount} {currency}
            </p>
            <p className="p-2 font-semibold">{order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
