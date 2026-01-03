import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CartPage() {
  const [cart, setCart] = useState([]);

  // ✅ Fetch cart inside useEffect
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data);
      } catch (err) {
        // Error handled silently
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/${id}`);

      // refresh cart after removal
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      // Error handled silently
    }
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p className="empty-message">Your cart is empty</p>
            <Link to="/" className="back-home-btn">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    <p className="cart-item-price">
                      ₹{Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
