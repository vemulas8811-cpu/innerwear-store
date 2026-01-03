USE railway;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(255)
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO products (name, price, description, image) VALUES
('Cotton Briefs', 15.99, 'Comfortable cotton briefs for everyday wear.', 'https://via.placeholder.com/200x150?text=Cotton+Briefs'),
('Silk Boxers', 25.50, 'Luxurious silk boxers for a smooth feel.', 'https://via.placeholder.com/200x150?text=Silk+Boxers'),
('Sports Bra', 30.00, 'Supportive sports bra for active women.', 'https://via.placeholder.com/200x150?text=Sports+Bra'),
('Lace Panties', 20.75, 'Elegant lace panties for special occasions.', 'https://via.placeholder.com/200x150?text=Lace+Panties'),
('Thermal Underwear', 35.99, 'Warm thermal underwear for cold weather.', 'https://via.placeholder.com/200x150?text=Thermal+Underwear'),
('Bikini Set', 40.00, 'Sexy bikini set for beach days.', 'https://via.placeholder.com/200x150?text=Bikini+Set');