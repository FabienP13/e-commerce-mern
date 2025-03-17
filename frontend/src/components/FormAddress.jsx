import React, { useState } from "react";

const FormAddress = ({ address, closeModal, onSubmit }) => {
  const [formData, setFormData] = useState(
    address || { street: "", city: "", zipcode: "", country: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    onSubmit(formData);
  };
  return (
    <>
      <div className="flex flex-row justify-between items-baseline w-full">
        <h3 className="text-xl font-bold text-center mb-4">{!formData._id ? "Add New Address" : "Edit Address"}</h3>
        <button
          onClick={closeModal}
          className="bg-red-500 text-white px-2  rounded"
        >
          X
        </button>
      </div>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-3">
        <p>Street:</p>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="border p-2 rounded focus:border-[#C689A7] focus:border-[3px] focus:outline-none focus:ring-0"
          placeholder="Street"
        />

        <p>Zipcode:</p>
        <input
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          className="border p-2 rounded focus:border-[#C689A7] focus:border-[3px] focus:outline-none focus:ring-0"
          placeholder="Zipcode"
        />

        <p>City:</p>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 rounded focus:border-[#C689A7] focus:border-[3px] focus:outline-none focus:ring-0"
          placeholder="City"
        />

        <p>Country:</p>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 rounded focus:border-[#C689A7] focus:border-[3px] focus:outline-none focus:ring-0"
          placeholder="Country"
        />

        <div className="flex justify-center mt-1 gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default FormAddress;
