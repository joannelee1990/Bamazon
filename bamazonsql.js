CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(13,2),
    stock_quantity INTEGER(30),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Toiletries", 2.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Mouthwash", "Toiletries", 5.99, 80);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Makeup Remover", "Beauty", 4.50, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Face Masks", "Beauty", 1.50, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Canned Tomato Soup", "Dry Foods", 1.85, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dark Chocolate", "Snacks", 1.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Potato Chips", "Snacks", 0.85, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pet", 80.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dog Treats", "Pet", 8.50, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dog Raincoats", "Pet", 15.99, 50);

SELECT * FROM products LIMIT 1000;