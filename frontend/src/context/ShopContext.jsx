import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '€';
    const delivery_fee = 10.00;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(true)
    const [cartItems,setCartItems] = useState({})
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('')
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate();

    
    const addToCart = async (itemId,size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        toast.success('Added to your cart', {
            autoClose: 800,
        });
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers:{token}})
            } catch (error) {
                
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0
        
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        
        try {
            const response = await axios.get(backendUrl + "/api/product/list")
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})

            if(response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserData = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/get', {}, {headers: {token}})
           
            if(response.data.success) {
                setUserData(response.data)

            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(()=>{
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
            getUserData(localStorage.getItem("token"))
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount, navigate,backendUrl,
        setToken,token,userData,setUserData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;