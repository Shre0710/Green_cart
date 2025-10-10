import { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios, { Axios } from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false)

    const setUserWithPersistence = (newUser) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    };

    const setIsSellerWithPersistence = (newIsSeller) => {
        setIsSeller(newIsSeller);
        if (newIsSeller) {
            localStorage.setItem('isSeller', 'true');
        } else {
            localStorage.removeItem('isSeller');
        }
    };

    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})


    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }




    //fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    //add to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Item added to cart')
    }

    //update cart items quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart updated')
    }

    //remove from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        toast.success('Item removed from cart')
        setCartItems(cartData);
    }

    // Get Cart Item Count 
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;

    }

    // Update product stock status
    const updateProductStock = (productId, inStock) => {
        setProducts(prevProducts => prevProducts.map(product =>
            product._id === productId ? { ...product, inStock } : product
        ));
    }


    useEffect(() => {
        fetchProducts()
        fetchSeller()
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        const storedIsSeller = localStorage.getItem('isSeller');
        if (storedIsSeller === 'true') {
            setIsSeller(true);
        }
        console.log('AppContext: Products loaded:', dummyProducts.length)
    }, [])



    const value = {
        navigate, user, setUser: setUserWithPersistence, setIsSeller: setIsSellerWithPersistence, isSeller,
        showUserLogin, setShowUserLogin, products, currency, addToCart, cartItems,
        updateCartItem, removeFromCart, searchQuery, setSearchQuery, getCartAmount, getCartCount, updateProductStock,
        axios,fetchSeller

    };

    // Add any global state or functions you want to provide here
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}