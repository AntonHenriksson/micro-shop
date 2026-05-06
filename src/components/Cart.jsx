import { useState, useEffect } from 'react';
import { checkUserAuth, getUserEmailFromToken } from "../service/authService";

const CART_API_ENDPOINT = import.meta.env.VITE_CART_API_ENDPOINT;

function Cart({ onBack }) {
    const [cartItems, setCartItems] = useState([]);

    const isLoggedIn = checkUserAuth();
    const userEmail = getUserEmailFromToken();

    useEffect(() => {
        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith('cart-item-')) {
                const item = JSON.parse(localStorage.getItem(key));
                items.push({
                    ...item,
                    key: key
                });
            }
        }
        setCartItems(items);
    }, []);

    const handleCheckout = () => {
        if (!isLoggedIn) {
            alert("Please log in or register to proceed to checkout.");
            window.location.href = "/login";
            return;
        }
        axios.post(CART_API_ENDPOINT + `/checkout/${userEmail}/`, {
        })
            .then(response => {
                alert("Checkout successful! Your order is being processed.");
            })
            .catch(error => {
                console.error("Checkout failed:", error);
                alert("Checkout failed. Please try again.");
            });
    }

    const handleRemoveItem = (key) => {

        if (isLoggedIn) {
            axios.delete(CART_API_ENDPOINT + `/${userEmail}/items/${product.id}`, {
            })
                .then(response => {
                    alert(`${product.title} has been removed from your account's cart!`);
                })
                .catch(error => {
                    console.error("Error removing from backend cart:", error);
                    alert("Failed to remove item from cart. Please try again.");
                });
        } else {
            localStorage.removeItem(key);
            setCartItems(cartItems.filter(item => item.key !== key));
        };
    };



    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <h2>Cart</h2>

            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.key}>
                            <img src={item.image} width="50" alt={item.title} />
                            <div>
                                <h4>{item.title}</h4>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </div>
                            <button onClick={() => handleRemoveItem(item.key)}>Remove</button>
                        </div>
                    ))}

                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={onBack}>Back to Products</button>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}

            {cartItems.length === 0 && (
                <button onClick={onBack}>Back to Products</button>
            )}
        </div>
    );
}

export default Cart;