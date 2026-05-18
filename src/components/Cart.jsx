import { useState, useEffect } from 'react';
import { checkUserAuth } from "../service/authService";
import axios from 'axios';

const CART_API_ENDPOINT = import.meta.env.VITE_CART_API_ENDPOINT;

function Cart({ onBack }) {
    const [cartItems, setCartItems] = useState([]);

    const isLoggedIn = checkUserAuth();

    useEffect(() => {
        const localItems = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('cart-item-')) {
                localItems.push({ ...JSON.parse(localStorage.getItem(key)), key });
            }
        }

        if (!isLoggedIn) {
            setCartItems(localItems);
            return;
        }

        const syncAndFetch = async () => {
            const token = localStorage.getItem("token");

            try {
                const syncRequests = localItems.map(product =>
                    axios.post(`${CART_API_ENDPOINT}/cart/add`,
                        { productId: product.id, price: product.price },
                        { headers: { Authorization: `Bearer ${token}` } }
                    ).then(() => localStorage.removeItem(product.key))
                );

                await Promise.all(syncRequests);

                const response = await axios.get(`${CART_API_ENDPOINT}/cart/items`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setCartItems(response.data.items || response.data);

            } catch (error) {
                console.error("Cart sync error:", error);
            }
        };

        syncAndFetch();
    }, [isLoggedIn]);

    const handleCheckout = () => {
        if (!isLoggedIn) {
            alert("Please log in or register to proceed to checkout.");
            window.location.href = "/login";
            return;
        }

        const token = localStorage.getItem("token");
        axios.post(`${CART_API_ENDPOINT}/cart/checkout/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                alert("Checkout successful! Your order is being processed.");
                setCartItems([]);
            })
            .catch(error => {
                console.error("Checkout failed:", error);
                alert("Checkout failed. Please try again.");
            });
    }

    const handleRemoveItem = (item) => {
        const token = localStorage.getItem("token");
        const currentId = item.productId || item.id;

        if (isLoggedIn) {
            axios.delete(`${CART_API_ENDPOINT}/cart/items/${currentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    alert(`${item.title || 'Item'} has been removed from your account's cart!`);
                    setCartItems(cartItems.filter(cartItem => (cartItem.productId || cartItem.id) !== currentId));
                })
                .catch(error => {
                    console.error("Error removing from backend cart:", error);
                    alert("Failed to remove item from cart. Please try again.");
                });
        } else {
            localStorage.removeItem(item.key);
            setCartItems(cartItems.filter(cartItem => cartItem.key !== item.key));
        }
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="shop-container">
            <h2>Cart</h2>

            {cartItems.length === 0 ? (
                <div>
                    <p>Cart is empty</p>
                    <button onClick={onBack}>Back to Products</button>
                </div>
            ) : (
                <div>
                    <div className="product-grid">
                        {cartItems.map((item) => (
                            <div className="product-card" key={item.id || item.productId || item.key}>
                                <img src={item.image} width="50" alt={item.title} />
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                </div>
                                <button onClick={() => handleRemoveItem(item)}>Remove</button>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <button onClick={onBack} style={{ marginRight: '10px' }}>Back to Products</button>
                        <button onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;