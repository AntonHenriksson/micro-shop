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

    useEffect(() => {
        axios.get(`${PRODUCTS_API_ENDPONINT}/products/public/all`)
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
                <div className="shop-conainer">
                    <hr />
                    <ProductDetail
                        product={selectedProduct}
                        onBack={() => setSelectedProduct(null)} />
                </div>
            )}
            {!selectedProduct && (
                <div className="shop-container">
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

                    <div className="product-grid">

                        {products
                            .filter((product) => category === "All" || product.category === category)
                            .map((product) => (
                                <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
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