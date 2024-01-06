-- CREATE DATABASE final_project;

-- Supliers tables

CREATE TABLE countries (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    name VARCHAR(75) NOT NULL
);
CREATE TABLE provinces (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    name VARCHAR(75) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);
CREATE TABLE phones (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    country_code SMALLINT NOT NULL,
    number bigint NOT NULL
);
CREATE TABLE contacts (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    name VARCHAR(75) NOT NULL,
    surname VARCHAR(75) NOT NULL,
    phone_id INT NOT NULL,
    FOREIGN KEY (phone_id) REFERENCES phones(id),
    mail VARCHAR(75) NOT NULL,
    rol VARCHAR(75) NOT NULL
);
CREATE TABLE address (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    address VARCHAR(75) NOT NULL,
    number SMALLINT NOT NULL,
    city VARCHAR(75) NOT NULL,
    province_id INT NOT NULL,
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    zip_code VARCHAR(10) NOT NULL
);
CREATE TABLE fiscal_condition (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    condition VARCHAR(75) NOT NULL
);
CREATE TABLE sector (
    id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    sector VARCHAR(75) NOT NULL
);
CREATE TABLE supliers (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    code VARCHAR(75) NOT NULL,
    brand VARCHAR(75) NOT NULL,
    sector_id INT NOT NULL,
    FOREIGN KEY(sector_id) REFERENCES sector(id),
    web VARCHAR(255) NOT NULL,
    phone_id INT NOT NULL,
    FOREIGN KEY(phone_id) REFERENCES phones(id),
    address_id INT NOT NULL,
    FOREIGN KEY(address_id) REFERENCES address(id),
    cuit VARCHAR(13) NOT NULL,
    fiscal_c_id INT NOT NULL,
    FOREIGN KEY(fiscal_c_id) REFERENCES fiscal_condition(id),
    logo VARCHAR(255) NULL,
    contact_id INT NOT NULL,
    FOREIGN KEY(contact_id) REFERENCES contacts(id),
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL DEFAULT GETDATE(),
);

-- Products
CREATE TABLE categories (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    category VARCHAR(75) NOT NULL,
);

CREATE TABLE products (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    code VARCHAR(75) NOT NULL,
    suplier_id INT NOT NULL,
    FOREIGN KEY(suplier_id) REFERENCES supliers(id),
    category_id INT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id),
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    picture VARCHAR(255) NULL,
    price FLOAT NOT NULL,
    is_available BIT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL DEFAULT GETDATE(),
);

-- Purchase orders
CREATE TABLE purchase_orders (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    date_arrives DATE NOT NULL,
    requirements TEXT NOT NULL,
    suplier_id INT NOT NULL,
    FOREIGN KEY (suplier_id) REFERENCES supliers(id),
    is_available BIT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL DEFAULT GETDATE(),  
);

CREATE TABLE cart_products (
    id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    cart_id INT NOT NULL,
    FOREIGN KEY(cart_id) REFERENCES purchase_orders(id),
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id),
    price FLOAT NOT NULL,
    quantity SMALLINT NOT NULL,
);
