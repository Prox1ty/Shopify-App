import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../features/cartSlice';
import { checkout } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handleCheckout = async() => {

        console.log(user);
        const result = await dispatch(checkout());

        if (checkout.rejected.match(result)) {
            const errorPayload = result.payload;

            if (errorPayload?.message?.includes("Authentication") || result.error.message.includes(401)) {
                alert("You must be logged in to checkout!");
                navigate('/register');
            }
        } else if (checkout.fulfilled) {
            alert('Order placed');
            const state = getSelection();

            state.cartItems = [];
            state.quantity = 0;
            state.totalPrice = 0;
            state.status = 'idle'
        }

    }

    useEffect(() => {
        fetch('http://localhost:8000/user/api/me', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.ok ? response.json() : null)
        .then(currUser => setUser(currUser))
        .catch(err => setUser(null));
    }, []) 

    const dispatch = useDispatch();
    
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen p-10 bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <Link to="/" className="text-blue-600 font-medium hover:underline">
                    &larr; Go back to products
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen p-10 bg-gray-50 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <h1 className="text-4xl font-black tracking-tight pb-8 pl-2 text-gray-900">Your Cart</h1>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-6 border-b border-gray-100 last:border-0 gap-4">
                            
                            {/* product info */}
                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                <img 
                                    src={item.img || '/placeholder.jpg'} 
                                    alt={item.title} 
                                    className="w-24 h-24 object-cover rounded-xl bg-gray-100" 
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-500 font-medium">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                                
                                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                                    <button 
                                        // removeFromCart expects just the id 
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all font-bold cursor-pointer"
                                    >
                                        &minus;
                                    </button>
                                    
                                    <span className="w-12 text-center font-bold text-gray-900">
                                        {item.quantity}
                                    </span>
                                    
                                    <button 
                                        // addToCart expects the whole item object to increment or add
                                        onClick={() => dispatch(addToCart(item))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all font-bold cursor-pointer"
                                    >
                                        &#43;
                                    </button>
                                </div>

                                {/* item subtotal */}
                                <div className="w-24 text-right font-black text-xl text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* checkout summary */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <Link to="/Products" className="text-blue-600 font-medium hover:underline hidden sm:block">
                        &larr; Continue Shopping
                    </Link>
                    
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                            <span className="block text-sm text-gray-500 font-medium uppercase tracking-wider">Total</span>
                            <span className="text-4xl font-black text-gray-900">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button onClick={() => {handleCheckout()}}
                        className={`py-4 px-8 ${user ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-sm cursor-pointer`}>
                            Checkout
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}