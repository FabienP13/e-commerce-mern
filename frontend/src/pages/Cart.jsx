import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const handleDelete = (item) => {
    // Confirm notification before deleting product from cartData.
    const confirmToast = toast(
      <div>
        <p className="text-gray-700 text-xs sm:text-lg font-medium">Are you sure you want to remove this item from your cart?</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              updateQuantity(item._id, item.size, 0); // Delete product
              toast.dismiss(confirmToast); // Close notification
            }}
            className="bg-red-500 text-white py-1 px-4 rounded"
          >
            Delete Product
          </button>
          <button
            onClick={() => toast.dismiss(confirmToast)} // Close notificaiton
            className="bg-gray-500 text-white py-1 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // La notification ne se ferme pas automatiquement
        closeOnClick: false, // On ne ferme pas la notification si l'utilisateur clique dessus
        draggable: false, // Désactiver le drag de la notification
        hideProgressBar: true, // Ne pas afficher la barre de progression
      }
    );
  }
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {/* Lien vers la page du produit */}
                <Link to={`/product/${productData._id}`}>
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                  
                />
                </Link>
                <div>
                <Link to={`/product/${productData._id}`}>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  </Link>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {productData.price} {currency}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {" "}
                      Size : {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => handleDelete(item)}
                className="w-4 mr-4 sm:w-5 cursor-pointer text-red-500"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end ">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
