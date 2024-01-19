CREATE DATABASE final_project;
GO
USE final_project;

-- CREATE TABLES

-- Supliers tables
CREATE TABLE
  countries (id INT NOT NULL PRIMARY KEY IDENTITY (1, 1), name VARCHAR(75) NOT NULL);

CREATE TABLE
  provinces (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(75) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries (id)
  );

CREATE TABLE
  phones (id INT NOT NULL PRIMARY KEY IDENTITY (1, 1), country_code SMALLINT NOT NULL, number VARCHAR(15) NOT NULL);

CREATE TABLE
  contacts (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(75) NOT NULL,
    surname VARCHAR(75) NOT NULL,
    phone_id INT NOT NULL,
    FOREIGN KEY (phone_id) REFERENCES phones (id),
    mail VARCHAR(75) NOT NULL,
    rol VARCHAR(75) NOT NULL
  );

CREATE TABLE
  address (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    address VARCHAR(75) NOT NULL,
    number SMALLINT NOT NULL,
    city VARCHAR(75) NOT NULL,
    province_id INT NOT NULL,
    FOREIGN KEY (province_id) REFERENCES provinces (id),
    zip_code VARCHAR(10) NOT NULL
  );

CREATE TABLE
  fiscal_condition (id INT NOT NULL PRIMARY KEY IDENTITY (1, 1), condition VARCHAR(75) NOT NULL);

CREATE TABLE
  sector (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    sector VARCHAR(75) NOT NULL,
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
  );

CREATE TABLE
  supliers (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
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
    updated_at DATETIME NULL,
  );

-- Products
CREATE TABLE
  categories (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    category VARCHAR(75) NOT NULL,
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
  );

CREATE TABLE
  products (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(75) NOT NULL,
    suplier_id INT NOT NULL,
    FOREIGN KEY (suplier_id) REFERENCES supliers (id),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    description TEXT NOT NULL,
    picture VARCHAR(255) NULL,
    price FLOAT NOT NULL,
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
  );

-- users rols
CREATE TABLE
  user_rols (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    rol VARCHAR(50) NOT NULL
  );

-- Users
CREATE TABLE 
  users (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    username VARCHAR(20) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES user_rols(id),
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
);

-- Purchase orders
CREATE TABLE
  purchase_orders (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    date_arrives DATE NOT NULL,
    requirements TEXT NOT NULL,
    suplier_id INT NOT NULL,
    FOREIGN KEY (suplier_id) REFERENCES supliers (id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    is_available BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
  );

CREATE TABLE
  purchase_products (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    purchase_id INT NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchase_orders (id),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id),
    price FLOAT NOT NULL,
    quantity SMALLINT NOT NULL,
  );

-- INSERTS

-- TABLE COUNTRIES
INSERT INTO
  countries (name)
VALUES
  ('Argentina'),
  ('Chile'),
  ('Uruguay'),
  ('Paraguay');

-- TABLE PROVINCES
INSERT INTO
  provinces (country_id, name)
VALUES
  (1, 'Buenos Aires'),
  (1, 'Catamarca'),
  (1, 'Chaco'),
  (1, 'Chubut'),
  (1, 'Ciudad Autónoma de Buenos Aires'),
  (1, 'Córdoba'),
  (1, 'Corrientes'),
  (1, 'Entre Ríos'),
  (1, 'Formosa'),
  (1, 'Jujuy'),
  (1, 'La Pampa'),
  (1, 'La Rioja'),
  (1, 'Mendoza'),
  (1, 'Misiones'),
  (1, 'Neuquén'),
  (1, 'Río Negro'),
  (1, 'Salta'),
  (1, 'San Juan'),
  (1, 'San Luis'),
  (1, 'Santa Cruz'),
  (1, 'Santa Fe'),
  (1, 'Santiago del Estero'),
  (1, 'Tierra del Fuego'),
  (1, 'Tucumán'),
  (2, 'Antofagasta'),
  (2, 'Arica y Parinacota'),
  (2, 'Atacama'),
  (2, 'Aysén del General Carlos Ibáñez del Campo'),
  (2, 'Biobío'),
  (2, 'Coquimbo'),
  (2, 'La Araucanía'),
  (2, 'Libertador General Bernardo O Higgins'),
  (2, 'Los Lagos'),
  (2, 'Los Ríos'),
  (2, 'Magallanes'),
  (2, 'Maule'),
  (2, 'Santiago'),
  (2, 'Tarapacá'),
  (2, 'Valparaíso'),
  (3, 'Artigas'),
  (3, 'Canelones'),
  (3, 'Cerro Largo'),
  (3, 'Colonia'),
  (3, 'Durazno'),
  (3, 'Flores'),
  (3, 'Florida'),
  (3, 'Lavalleja'),
  (3, 'Maldonado'),
  (3, 'Montevideo'),
  (3, 'Paysandú'),
  (3, 'Río Negro'),
  (3, 'Rivera'),
  (3, 'Rocha'),
  (3, 'Salto'),
  (3, 'San José'),
  (3, 'Soriano'),
  (3, 'Tacuarembó'),
  (3, 'Treinta y Tres'),
  (4, 'Alto Paraguay'),
  (4, 'Alto Paraná'),
  (4, 'Amambay'),
  (4, 'Asunción'),
  (4, 'Boquerón'),
  (4, 'Caaguazú'),
  (4, 'Caazapá'),
  (4, 'Canindeyú'),
  (4, 'Central'),
  (4, 'Concepción'),
  (4, 'Cordillera'),
  (4, 'Guairá'),
  (4, 'Itapúa'),
  (4, 'Misiones'),
  (4, 'Ñeembucú'),
  (4, 'Paraguarí'),
  (4, 'Presidente Hayes'),
  (4, 'San Pedro');

-- TABLE FISCAL_CONDITION
INSERT INTO
  fiscal_condition (condition)
VALUES
  ('IVA Responsable Inscripto'),
  ('IVA Responsable no Inscripto'),
  ('IVA no Responsable'),
  ('IVA Sujeto Exento'),
  ('Consumidor Final'),
  ('Responsable Monotributo'),
  ('Sujeto no Categorizado'),
  ('Proveedor del Exterior'),
  ('Cliente del Exterior'),
  ('IVA Liberado'),
  ('IVA Responsable Inscripto, Agente de Percepción'),
  ('Pequeño Contribuyente Eventual'),
  ('Monotributista Social'),
  ('Pequeño Contribuyente Eventual Social');

-- TABLE SECTOR
INSERT INTO
  sector (sector, created_at, is_available)
VALUES
  ('Tecnología', '2023-11-12', 1),
  ('Repuestos', '2023-11-16', 1),
  ('Oficina', '2023-11-17', 1);

-- TABLE CATEGORY
INSERT INTO
  categories (category, created_at, is_available)
VALUES
  ('Notebooks', '2023-11-12', 1),
  ('Celulares', '2023-11-16', 1),
  ('Impresoras', '2023-11-17', 1),
  ('Tintas de impresoras', '2023-11-19', 1),
  ('Pequeños', '2023-11-19', 1),
  ('Audio', '2023-11-24', 1),
  ('Sillas de escritorio', '2023-11-24', 1);

-- TABLE PHONES

INSERT INTO
  phones (country_code, number)
VALUES
  (54, '0111082338'),
  (54, '0112568398'),
  (56, '9035384032'),
  (56, '9034528623'),
  (595, '7458511859'),
  (595, '7456401940'),
  (54, '3517151301'),
  (54, '3517965129'),
  (54, '4889567052'),
  (54, '4885094795'),
  (598, '3297268403'),
  (598, '3295645440'),
  (54, '5401479666'),
  (54, '5407805284'),
  (56, '2978826251'),
  (56, '2976676589'),
  (54, '9623769445'),
  (54, '9627570420'),
  (595, '5744028677'),
  (595, '5744769171');

-- TABLE CONTACTS
INSERT INTO
  contacts (name, surname, mail, phone_id, rol)
VALUES
  ('Wilmette', 'Greenroa', 'wgreenroa0@scientificamerican.com', 1, 'Gerente de compras'),
  ('Bebe', 'Pedrazzi', 'bpedrazzi1@so-net.ne.jp', 3, 'Encargado de compras'),
  ('Tony', 'Shadbolt', 'tshadbolt2@issuu.com', 5, 'Gerente'),
  ('Doug', 'Frankema', 'dfrankema3@mozilla.com', 7, 'Contador'),
  ('Consalve', 'Sibborn', 'csibborn4@pagesperso-orange.fr', 9, 'Encargado de compras'),
  ('Bruis', 'Belcham', 'bbelcham5@latimes.com', 11, 'Gerente de compras'),
  ('Jedd', 'Jacquemot', 'jjacquemot6@ovh.net', 13, 'Gerente de compras'),
  ('Filbert', 'Pikett', 'fpikett7@rakuten.co.jp', 15, 'Encargado de compras'),
  ('Conway', 'Bredbury', 'cbredbury8@aol.com', 17, 'Dueño'),
  ('Kathy', 'Hosier', 'khosier9@google.com.hk', 19, 'Gerente');

--TABLE ADDRESS
INSERT INTO
  address (address, number, zip_code, city, province_id)
VALUES
  ('25 de Mayo', 1542, '2400', 'Pilar', 1),
  ('Av 5 de Abril', 3652, '8320000', 'Santiago', 37),
  ('Resistencia', 902, '1201', 'San Roque', 62),
  ('Av Colón', 5042, '5000', 'Córdoba', 6),
  ('9 de Julio', 6491, '3100', 'Rosario', 21),
  ('Antonio Rubio', 4235, '10129', 'Montevideo', 49),
  ('Sarmiento', 1635, '7600', 'Mar del Plata', 1),
  ('San Pablo', 9562, '9200000', 'Cerrillo', 37),
  ('Av Alem', 5044, '5590', 'La Paz', 13),
  ('Alfonso Rodriguez', 2315, '11203', 'Arroyito', 68);

-- TABLE SUPLIERS
INSERT INTO
  supliers (
    code,
    brand,
    sector_id,
    web,
    phone_id,
    address_id,
    cuit,
    fiscal_c_id,
    contact_id,
    created_at,
    updated_at,
    is_available
  )
VALUES
  ('tec1', 'Musimundo', 1, 'musimundo.com', 2, 1, '31761319809', 1, 1, '2023-11-12', GETDATE (), 1),
  ('tec2', 'Rooxo', 1, 'rooxo.com', 4, 2, '30381720705', 8, 2, '2023-11-16', GETDATE (), 1),
  ('rep3', 'Lazz', 2, 'lazz.com/products', 6, 3, '38906168969', 8, 3, '2023-11-17', GETDATE (), 1),
  ('tec4', 'Fravega', 1, 'fravega.com', 8, 4, '37688026725', 1, 4, '2023-11-19', GETDATE (), 1),
  ('ofi5', 'Talane', 3, 'talane.com', 10, 5, '32680934717', 6, 5, '2023-11-19', GETDATE (), 1),
  ('rep6', 'Meemm', 2, 'meemm.pl', 12, 6, '31464431388', 8, 6, '2023-11-24', GETDATE (), 1),
  ('tec7', 'Cetrogar', 1, 'cetrogar.com', 14, 7, '38040671507', 1, 7, '2023-11-24', GETDATE (), 1),
  ('rep8', 'Fatz', 2, 'fatz.com', 16, 8, '35162101052', 8, 8, '2023-11-29', GETDATE (), 1),
  ('tec9', 'Linkbuzz', 1, 'li-buzz.com', 18, 9, '35628993832', 1, 9, '2023-12-01', GETDATE (), 1),
  ('ofi10', 'Twinte', 3, 'twinte.co.jp', 20, 10, '31860452612', 8, 10, '2023-12-01', GETDATE (), 1);

-- TABLE PRODUCTS
INSERT INTO products (name, code, suplier_id, category_id, picture, price, description, created_at, updated_at, is_available) VALUES 
('Notebook Hp 15 Quad', 'abd101f5', 1, 1, 'https://images.fravega.com/f300/780d49f84c972ea5b6e3927b9be428d9.jpg.webp', 851, 'PRESTACIONES TÉCNICAS: - Procesador: Intel® Pentium® Silver N5000 Quadcore (1.1, 2.7 GHz ) 4 MB - Memoria: 8gb Ram - Placa de Video: Intel® UHD Graphics 605 - Disco SOLIDO: 128GB SSD - Pantalla: 15.6" diagonal HD SVA', '2023-11-12', GETDATE(), 1),
('NOTEBOOK HP 240', '682c5702', 2, 1, 'https://images.fravega.com/f300/703dd519d1d757cfd0c4712d6e214140.jpg.webp', 1793, 'La laptop HP 240 es económica y cuenta con una pantalla de 14,0"en diagonal, un procesador Intel® y herramientas de colaboración esenciales.', '2023-11-16', GETDATE(), 1),
('Notebook HP 14 DQ2505LA', 'c0daff0c', 4, 1, 'https://images.fravega.com/f300/1916a7612e87a914cdc366a4e80d29f6.png.webp', 699, 'Su memoria de 4 GB DDR4, 256 GB de almacenamiento SSD y el procesador Intel Core i3, te brindarán un gran rendimiento', '2023-11-17', GETDATE(), 1),
('Notebook Dell Negro Carbon 4R52X', '6585f267', 7, 1, 'https://images.fravega.com/f300/5f096608c7a2f2884d77e2eafd78e805.jpg.webp', 899, 'Modelo alfanumérico : 4R52X Relación de aspecto : 16:9 Capacidad de la batería : Tipo de batería : Ion de litio Marca : Dell Gama de colores : 45% NTSC Cantidad de núcleos : 6', '2023-11-19', GETDATE(), 1),
('Samsung Galaxy A04e', '19860379', 9, 2, 'https://images.fravega.com/f300/6787d085cbf3956f754c6432d9d2fd33.jpg.webp', 149, 'Disfrutá de tu teléfono con una sola carga, gracias a su potente batería de 5000 mAh que te permite trabajar y jugar por más tiempo. Con TurboPowerTM 30, podés cargar el teléfono a gran velocidad.', '2023-11-19', GETDATE(), 1),
('Motorola G32 ', '63dc1d85', 1, 2, 'https://images.fravega.com/f300/8609ee2c33e809222a82ef7e37a91d16.png.webp', 350, 'Disfrutá de tu teléfono con una sola carga, gracias a su potente batería de 5000 mAh que te permite trabajar y jugar por más tiempo. Con TurboPowerTM 30, podés cargar el teléfono a gran velocidad.', '2023-11-24', GETDATE(), 1),
('Xiaomi Redmi 12C', '58555384', 2, 2, 'https://images.fravega.com/f300/1f8da495e15c2930c43b0e84f67182d6.jpg.webp', 269, 'Viene equipado con un procesador Octa-Core de 2,0 GHz, el cuál proporciona un rendimiento fluido y rápido, permitiendo ejecutar aplicaciones y juegos sin problemas. ', '2023-11-24', GETDATE(), 1),
('ZTE Blade A33 Plus', 'c582def4', 4, 2, 'https://images.fravega.com/f300/73f3273bdec8d10d5bdaa16c0d551e7e.jpg.webp', 119, 'El ZTE Blade A33 Plus posee sistema operativo Android 12 Go Edition, una versión más ligera y optimizada de Android.', '2023-11-29', GETDATE(), 1),
('Samsung Galaxy S23 Ultra', '256c8a74', 7, 2, 'https://images.fravega.com/f300/2570ae3b865a6d96a84beac46c4b92cf.jpg.webp', 2419, 'Una batería que no te detiene. Con 5000mAh de capacidad, el celular Samsung Galaxy S23 Ultra te podrá acompañar durante todo el día.', '2023-12-01', GETDATE(), 1),
('Motorola Razr 40 Ultra', '943dcdb3', 9, 2, 'https://images.fravega.com/f300/2308f9c7231f344271ec8923b204a7f1.png.webp', 1299, 'Con su potente procesador Snapdragon 8+ vas a tener mucha más velocidad y, además, verás un mejor desempeño junto a su memoria interna de 512 GB y RAM de 12 GB', '2023-12-01', GETDATE(), 1),
('Impresora Multifunción HP Smart Tank 580', 'c09b448e', 9, 3, 'https://images.fravega.com/f300/0e9a52942a8a75343bc922e83ac6b43b.png.webp', 345, 'Con la impresora multifunción HP Smart Tank 580 vas a poder imprimir, escanear y copiar documentos y fotos en forma rápida, con colores vibrantes y textos nítidos.', '2023-12-10', GETDATE(), 1),
('Cartucho de Tinta HP 664 Negro Original', '74e23973', 8, 4, 'https://images.fravega.com/f300/ba1fd6a8a9581584e5dfa21aba58567d.jpg.webp', 23, 'Imprima los documentos de todos los días con alta calidad y a un precio accesible con los cartuchos de tinta original HP de bajo costo, diseñados con protección contra fraudes y alertas inteligentes de poca tinta para ofrecer un rendimiento libre de preocupaciones y resultados uniformes en los que puede contar.', '2023-12-13', GETDATE(), 0),
('Cartucho de Tinta HP 664 F6V28AL TRICOLOR', '93ae9e1e', 6, 4, 'https://images.fravega.com/f300/ba1fd6a8a9581584e5dfa21aba58567d.jpg.webp', 23, 'Imprima los documentos de todos los días con alta calidad y a un precio accesible con los cartuchos de tinta original HP de bajo costo, diseñados con protección contra fraudes y alertas inteligentes de poca tinta para ofrecer un rendimiento libre de preocupaciones y resultados uniformes en los que puede contar.', '2023-12-15', GETDATE(), 1),
('Cartucho de Tinta HP 664 F6V28AL TRICOLOR', '0d8d36ec', 3, 4, 'https://images.fravega.com/f300/ba1fd6a8a9581584e5dfa21aba58567d.jpg.webp', 23, 'Imprima los documentos de todos los días con alta calidad y a un precio accesible con los cartuchos de tinta original HP de bajo costo, diseñados con protección contra fraudes y alertas inteligentes de poca tinta para ofrecer un rendimiento libre de preocupaciones y resultados uniformes en los que puede contar.', '2023-12-16', GETDATE(), 1),
('Botella de Tinta Original Negra HP GT53', '3421ef84', 8, 4, 'https://images.fravega.com/f300/d0bcef7c727aefc20a4d89f422a37d18.jpg.webp', 22, 'Rendimiento de la página(blanco y negro): 4.000 páginas (El rendimiento real varía de acuerdo con el contenido de las páginas impresas y otros factores)', '2023-12-16', GETDATE(), 1),
('Silla Escritorio Oficina Mesh Ergonomica', '9277e84d', 10, 7, 'https://images.fravega.com/f300/6680f0434f14cdb3a8951a961fbb2817.jpg.webp', 84, 'Respaldo de red con curvatura y refuerzo en la apoyatura lumbar.', '2023-12-18', GETDATE(), 1),
('Silla de Oficina Mesh Pilcosa', '9011cf66', 5, 7, 'https://images.fravega.com/f300/4bd4544fc03173253b2dd141b561816a.jpg.webp', 59, 'Respaldo con curvatura que se adapta a la forma de la espalda con forma de S cóncava a la altura del tórax y de forma convexa a nivel lumbar.', '2023-12-19', GETDATE(), 1),
('Silla de Escritorio Alta PILCOSA', 'a8b3c577', 5, 7, 'https://images.fravega.com/f300/26a7119e87f0108b571d774d8b717637.jpg.webp', 79, 'Sillón ejecutivo elegante y vanguardista con asiento en tela mesh, con cabecera alta en cuero ecológico. Brazo de polipropileno fijo, respaldo de malla de poliéster, asiento grande de espuma; base y pistón cromado.', '2023-12-25', GETDATE(), 1),
('Auricular In-ear Inalámbrico Jbl Wave', '48af8b5d', 1, 6, 'https://images.fravega.com/f300/2877a6fff83042d42b36f6c5f3104354.jpg.webp', 116, 'Al ser in-ear, mejoran la calidad del audio y son de tamaño pequeño para poder insertarse en tu oreja. Son ideales para acompañarte a la hora de hacer ejercicio mientras te sumergís en el mejor sonido envolvente.', '2023-12-30', GETDATE(), 1),
('Auriculares Inalámbricos On Ear Philips TAH1205BK/00', 'f95c72a4', 2, 6, 'https://images.fravega.com/f300/eff092d0da8ba6b78012a3f158243bd0.jpg.webp', 47, 'El modelo TAH1205BK/00 de Philips cuenta con un diseño ligero y cómodo. A su vez, los auriculares Philips presentan una banda ajustable y almohadillas acolchadas que brindan un mayor confort. Auriculares On Ear.', '2024-01-02', GETDATE(), 1),
('Auriculares Bluetooth TWS Daewoo DW-NO441KI', 'a86058e6', 4, 6, 'https://images.fravega.com/f300/744030779a79d659bf516497fb90fdec.jpg.webp', 14, 'Rango de frecuencia 20 HZ- 20 KHz', '2024-01-03', GETDATE(), 1),
('Auriculares Inalámbricos JBL Tune 510BT', '04ca1012', 7, 6, 'https://images.fravega.com/f300/8b96c9872eb0b216043edc5635eafc41.jpg.webp', 83, 'Al ser on-ear se apoyan en tus orejas cómodamente y ofrecen una gran calidad de sonido. Usalos en viajes largos o actividades al aire libre.', '2024-01-03', GETDATE(), 1),
('Smartwatch Suono HOG0032', 'b31ad81f', 9, 5, 'https://images.fravega.com/f300/9830da28c2c8d9a341beddbaa78c2703.jpg.webp', 8, 'El smartwatch cuenta con pantalla táctil a color de gran tamaño de alta resolución: las teclas táctiles sensibles brindan una operación rápida y fácil Ideal para ejercicio.', '2024-01-06', GETDATE(), 1),
('Samsung Galaxy Watch6 40MM', '0801b49e', 1, 5, 'https://images.fravega.com/f300/fbe7e16e9bc0cd6d88b3adb3396576d1.jpg.webp', 413, 'El Galaxy Watch6 viene con un paquete de monitorización cardíaca que te aporta tranquilidad para que puedas concentrarte en tu día. El sensor PPG integrado mide periódicamente la frecuencia cardíaca y el ritmo cardíaco y te avisará si la frecuencia cardíaca es demasiado alta o demasiado baja.', '2024-01-07', GETDATE(), 1),
('Reloj Inteligente M6 Smartwatch Suono', '0f0bc3fe', 1, 5, 'https://images.fravega.com/f300/962f68dcade0c65d7de473a007bffe72.jpg.webp', 19, 'Con esta Pulsera/Reloj Inteligente además de hacer deportes al aire libre y controlar todos tus ejercicios podrás responder llamadas.', '2024-01-07', GETDATE(), 1),
('Malla de goma silicona para Mi Band 5 y Miband 6 Xiaomi', '2cca2792', 8, 5, 'https://images.fravega.com/f300/37674d1bf61239de58b6586cfd0ce4eb.jpg.webp', 6, 'Pulsera de goma de repuesto para Mi Band 5 y 6 Material de la malla: TPU Material de la hebilla: Plástico', '2024-01-08', GETDATE(), 1),
('Celular Samsung Galaxy S23 FE', '24890f3d', 7, 2, 'https://images.fravega.com/f300/a82eba64d454a282d0339c93521dbee0.jpg.webp', 849, 'El nuevo Galaxy S23 FE cuenta con un procesador Samsung Exynos 2200 con una velocidad de CPU: 2.8GHz, 2.5GHz, 1.8GHz. A su vez, tiene un espacio de almacenamiento de 128 GB.', '2024-01-10', GETDATE(), 1),
('Lenovo IdeaPad 1 15,6”', '1b9160bd', 4, 1, 'https://images.fravega.com/f300/e8d7c01f2e2effe6a265da75befb8372.jpg.webp', 949, 'Su procesador AMD Ryzen 5, junto con su memoria RAM de 8GB y su disco SSD de 256GB, logran ofrecer el almacenamiento que necesitás y un rendimiento óptimo.', '2024-01-10', GETDATE(), 1),
('Notebook Dell Gaming 15,6" AMD Ryzen 5', '9d1da242', 2, 1, 'https://images.fravega.com/f300/6c234aac346afbecebb11d2593d28748.jpg.webp', 1029, 'Gracias a su memoria de 8GB, su almacenamiento de 512GB y el procesador AMD Ryzen 5 disfrutarás de un gran rendimiento, eficiencia y velocidad para vivir una experiencia mucho más rápida.', '2024-01-11', GETDATE(), 1),
('Lenovo 14” Core i3 8GB 256GB SSD IdeaPad Slim 3', '01f28f38', 1, 1, 'https://images.fravega.com/f300/4d200697730a5f74b7ed558179362e1f.jpg.webp', 929, 'Su procesador es un Intel Core i3, que cuenta con 8 núcleos y 8 hilos. Tiene una frecuencia base de 1.8 GHz y puede alcanzar una frecuencia turbo de hasta 3.8 GHz, lo que lo hace adecuado para tareas diarias y multitarea eficiente.', '2024-01-12', GETDATE(), 1),
('Motorola Edge 40 Neo', '0fabff58', 2, 2, 'https://images.fravega.com/f300/0d4369708daf8dfa8819d97dec700c28.jpg.webp', 600, 'Experimentá conexiones veloces 5G gracias a la potencia del procesador y su configuración de memoria. Con 8GB de RAM y 256GB de almacenamiento interno.', '2024-01-12', GETDATE(), 1),
('Bolígrafo Bic Cristal Punta Media 1mm Caja X 50 Unidades', '176589ff', 3, 5, 'https://http2.mlstatic.com/D_NQ_NP_635928-MLA47574733077_092021-O.webp', 14, 'Boligrafo bic crsital caja x 50 unidades trazo medio 1 mm. escritura continua la tinta fluye desde el primer contacto con el papel.  ', '2024-01-11', GETDATE(), 1),
('Abrochadora Brazo Largo Para Revistas', 'dfc3902a', 3, 5, NULL, 12, 'La abrochadora de brazo largo para revistas 330 mm es una herramienta que se utiliza para unir hojas de papel, folletos o revistas. Tiene un brazo largo que le permite abarcar una gran cantidad de papel, lo que la hace ideal para revistas y otros documentos de gran tamaño.', '2024-01-11', GETDATE(), 1);


-- TABLE USER_ROLS
INSERT INTO 
  user_rols (rol) 
VALUES
  ('admin');

-- TABLE USERS
INSERT INTO 
  users (username, password_hash, email, name, surname, rol_id, created_at, updated_at) 
VALUES 
  ('user', 'admin', 'ualloatti@asjservicios.com', 'Uriel', 'Alloatti', 1, '2023-11-12', '2023-11-12');


-- TABLE PURCHASE-ORDERS
INSERT INTO 
  purchase_orders (date_arrives, requirements, suplier_id, user_id, created_at, updated_at)
VALUES 
  ('2023-11-24', 'Tocar timbre al arribar.', 1, 1, '2023-11-19', '2023-11-19'),
  ('2023-12-07', 'Llamar al llegar.', 2, 1, '2023-12-01', '2023-12-01'),
  ('2023-12-20', 'Pasar por la mañana.', 8, 1, '2023-12-16', '2023-12-16'),
  ('2023-12-30', '-', 9, 1, '2023-12-25', '2023-12-25'),
  ('2024-01-07', 'Reja Negra.', 7, 1, '2024-01-03', '2024-01-03'),
  ('2024-01-17', 'Timbre de arriba.', 9, 1, '2024-01-10', '2024-01-10'),
  ('2024-01-15', 'Llamar al llegar.', 1, 1, '2024-01-11', '2024-01-11'),
  ('2024-01-16', 'Pasar por la mañana.', 5, 1, '2024-01-12', '2024-01-12'),
  ('2024-01-17', '-', 4, 1, '2024-01-12', '2024-01-12'),
  ('2024-01-17', '-', 3, 1, '2024-01-12', '2024-01-12');

-- TABLE PRODUCT-CART
INSERT INTO
  purchase_products (purchase_id, product_id, price, quantity)
VALUES
  (1, 1, 715, 2),
  (2, 3, 566, 1),
  (2, 7, 269, 3),
  (3, 12, 18, 4),
  (3, 15, 17, 5),
  (4, 5, 130, 3),
  (4, 10, 1100, 1),
  (4, 11, 330, 2),
  (5, 4, 850, 2),
  (5, 9, 2100, 1),
  (5, 22, 78, 3),
  (6, 5, 149, 2),
  (6, 10, 1299, 1),
  (6, 11, 345, 3),
  (6, 23, 8, 8),
  (7, 25, 19, 3),
  (8, 17, 59, 12),
  (8, 18, 79, 5),
  (9, 8, 119, 3),
  (9, 21, 14, 2),
  (9, 28, 949, 1),
  (10, 32, 14, 3),
  (10, 33, 12, 2);
  