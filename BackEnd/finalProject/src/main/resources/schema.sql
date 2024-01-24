-- CREATE TABLES
DROP TABLE IF EXISTS purchase_products;
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS sector;
DROP TABLE IF EXISTS fiscal_condition;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS phones;
DROP TABLE IF EXISTS provinces;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_rols;
-- suppliers tables
CREATE TABLE
  countries (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(75) NOT NULL);

CREATE TABLE
  provinces (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(75) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries (id)
  );

CREATE TABLE
  phones (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, country_code SMALLINT NOT NULL, number VARCHAR(15) NOT NULL);

CREATE TABLE
  contacts (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(75) NOT NULL,
    surname VARCHAR(75) NOT NULL,
    phone_id INT NOT NULL,
    FOREIGN KEY (phone_id) REFERENCES phones (id),
    mail VARCHAR(75) NOT NULL,
    rol VARCHAR(75) NOT NULL
  );

CREATE TABLE
  address (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(75) NOT NULL,
    number INT NOT NULL,
    city VARCHAR(75) NOT NULL,
    province_id INT NOT NULL,
    FOREIGN KEY (province_id) REFERENCES provinces (id),
    zip_code VARCHAR(10) NOT NULL
  );

CREATE TABLE
  fiscal_condition (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, condition VARCHAR(75) NOT NULL);

CREATE TABLE
  sector (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sector VARCHAR(75) NOT NULL,
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL
  );

CREATE TABLE
  suppliers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(75) NOT NULL,
    brand VARCHAR(75) NOT NULL,
    sector_id INT NOT NULL,
    FOREIGN KEY (sector_id) REFERENCES sector (id),
    web VARCHAR(255) NOT NULL,
    phone_id INT NOT NULL,
    FOREIGN KEY (phone_id) REFERENCES phones (id),
    address_id INT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address (id),
    cuit VARCHAR(13) NOT NULL,
    fiscal_c_id INT NOT NULL,
    FOREIGN KEY (fiscal_c_id) REFERENCES fiscal_condition (id),
    logo VARCHAR(255) NULL,
    contact_id INT NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts (id),
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL
  );

-- Products
CREATE TABLE
  categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(75) NOT NULL,
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL
  );

CREATE TABLE
  products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(75) NOT NULL,
    supplier_id INT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    description TEXT NOT NULL,
    picture VARCHAR(255) NULL,
    price FLOAT NOT NULL,
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL
  );

-- users rols
CREATE TABLE
  user_rols (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rol VARCHAR(50) NOT NULL
  );

-- Users
CREATE TABLE
  users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES user_rols(id),
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL
);

-- Purchase orders
CREATE TABLE
  purchase_orders (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date_arrives DATE NOT NULL,
    requirements TEXT NOT NULL,
    supplier_id INT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL
  );

CREATE TABLE
  purchase_products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    purchase_id INT NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchase_orders (id),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id),
    price FLOAT NOT NULL,
    quantity SMALLINT NOT NULL
  );