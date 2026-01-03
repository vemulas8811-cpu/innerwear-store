function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  const price = parseFloat(product.price) || 0;

  return (
    <div className="product-card">
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.name || "Product"}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name || "Unknown Product"}</h3>
        <p className="product-description">
          {product.description || "No description available"}
        </p>
        <p className="product-price">₹{price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart && product.id && onAddToCart(product.id)}
          className="add-to-cart-btn"
          disabled={!product.id}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
