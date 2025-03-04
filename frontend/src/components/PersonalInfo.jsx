import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const PersonalInfo = () => {

  const {userData} = useContext(ShopContext)
  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">

    </form>
  )
}

export default PersonalInfo