import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("asc");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products safely inside useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products?sort=${sort}`);
        setProducts(res.data || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sort]);

  // ✅ Fetch cart count once
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await api.get("/cart");
        const count = (res.data || []).reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        setCartCount(count);
      } catch (err) {
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, []);

  const addToCart = async (productId) => {
    if (!productId) return;
    try {
      await api.post("/cart", {
        product_id: productId,
        quantity: 1,
      });

      // update cart count instantly by incrementing
      setCartCount((prev) => prev + 1);
    } catch (err) {
      // Error handled silently
    }
  };

  return (
    <div className="home">
      <header className="header">
        <h1>Innerwear Store</h1>

        <div className="header-controls">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <Link to="/cart" className="cart-link">
            Cart <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>
      </header>

      <div className="products-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
