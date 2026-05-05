import axios from "axios"
import ProductList from "./ProductList"
import { checkUserAuth, getUserEmailFromToken } from "../service/authService";

const CART_API_ENDPOINT = import.meta.env.VITE_CART_API_ENDPOINT;


function ProductDetail({ product, onBack }) {
    const isLoggedIn = checkUserAuth()

    if (!product) return null


    const userEmail = getUserEmailFromToken()
    const handleAddToCart = () => {
        if (isLoggedIn) {
            axios.post(CART_API_ENDPOINT + `/${userEmail}`, {
                productId: product.id
            })
                .then(response => {
                    alert(`${product.title} has been added to your account's cart!`);
                })
                .catch(error => {
                    console.error("Error adding to backend cart:", error);
                    alert("Failed to add item to cart. Please try again.");
                });
        } else {
            const uniqueKey = `cart-item-${Date.now()}`;

            localStorage.setItem(uniqueKey, JSON.stringify(product));

            alert(`${product.title
                } added to cart!`);
        }
    };

    return (
        <>
            <h1>{product.title}</h1>
            <img src={product.image} width="200" />
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>

            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={onBack}>Back to Products</button>
        </>
    )

}

export default ProductDetail;