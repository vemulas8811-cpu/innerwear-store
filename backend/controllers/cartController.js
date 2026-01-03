const db = require("../models/db");

exports.getCart = (req, res) => {
  const query = `
    SELECT c.id, c.quantity, p.name, p.price, p.description, p.image
    FROM cart c
    JOIN products p ON c.product_id = p.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching cart:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(
      results.map((item) => ({ ...item, price: parseFloat(item.price) }))
    );
  });
};

exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid product_id or quantity" });
  }

  db.query(
    "SELECT id, quantity FROM cart WHERE product_id = ?",
    [product_id],
    (err, results) => {
      if (err) {
        console.error("Error checking cart:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        const newQty = results[0].quantity + quantity;
        db.query(
          "UPDATE cart SET quantity = ? WHERE id = ?",
          [newQty, results[0].id],
          (err) => {
            if (err) {
              console.error("Error updating cart:", err);
              return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Cart updated successfully" });
          }
        );
      } else {
        db.query(
          "SELECT name, price, image FROM products WHERE id = ?",
          [product_id],
          (err, productResults) => {
            if (err) {
              console.error("Error fetching product:", err);
              return res.status(500).json({ error: "Database error" });
            }
            if (productResults.length === 0) {
              return res.status(404).json({ error: "Product not found" });
            }
            const product = productResults[0];

            db.query(
              "INSERT INTO cart (product_id, quantity, name, price, image) VALUES (?, ?, ?, ?, ?)",
              [
                product_id,
                quantity,
                product.name,
                product.price,
                product.image,
              ],
              (err) => {
                if (err) {
                  console.error("Error adding to cart:", err);
                  return res.status(500).json({ error: "Database error" });
                }
                res.json({ message: "Added to cart successfully" });
              }
            );
          }
        );
      }
    }
  );
};

exports.removeFromCart = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error removing from cart:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json({ message: "Removed from cart successfully" });
  });
};
