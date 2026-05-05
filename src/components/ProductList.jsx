import { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import axios from "axios";
import Cart from "./Cart";

const PRODUCTS_API_ENDPONINT = import.meta.env.VITE_PRODUCTS_API_ENDPOINT;

function ProductList() {



    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewingCart, setViewingCart] = useState(false);

    // Fetch products from the API when the component mounts
    // In real application change to .env variable and use our own DB
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);
    if (viewingCart) {
        return <Cart onBack={() => setViewingCart(false)} />;
    }

    return (
        <>

            <button onClick={() => setViewingCart(true)}>View Cart</button>
            {selectedProduct && (
                <div className="product-detail-container">
                    <hr />
                    <ProductDetail
                        product={selectedProduct}
                        onBack={() => setSelectedProduct(null)} />
                </div>
            )}
            {!selectedProduct && (
                <div>
                    <h1>Product List</h1>
                    <label htmlFor="category">Filter by Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="women's clothing">women's clothing</option>
                        <option value="jewelery">jewelery</option>
                        <option value="electronics">electronics</option>
                    </select>

                    <div>

                        {products
                            .filter((product) => category === "All" || product.category === category)
                            .map((product) => (
                                <div key={product.id} onClick={() => setSelectedProduct(product)}>
                                    <img src={product.image} width="100" />
                                    <h2>{product.title}</h2>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>

    )
}

export default ProductList;