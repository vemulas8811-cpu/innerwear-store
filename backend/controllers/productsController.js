const db = require("../models/db");

exports.getProducts = (req, res) => {
  const sort = req.query.sort === "desc" ? "DESC" : "ASC";
  const query = `SELECT * FROM products ORDER BY price ${sort}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(
      results.map((product) => ({
        ...product,
        price: parseFloat(product.price),
      }))
    );
  });
};

exports.addProduct = (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const query =
    "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";
  const values = [name, parseFloat(price), description || "", image || ""];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res
      .status(201)
      .json({ id: result.insertId, message: "Product added successfully" });
  });
};
