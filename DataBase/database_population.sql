-- TABLE COUNTRIES
INSERT INTO countries VALUES ('Argentina');
INSERT INTO countries VALUES ('Chile');
INSERT INTO countries VALUES ('Uruguay');
INSERT INTO countries VALUES ('Paraguay');

-- TABLE PROVINCES
INSERT INTO provinces (country_id, name) VALUES (1, 'Buenos Aires');
INSERT INTO provinces (country_id, name) VALUES (1, 'Catamarca');
INSERT INTO provinces (country_id, name) VALUES (1, 'Chaco');
INSERT INTO provinces (country_id, name) VALUES (1, 'Chubut');
INSERT INTO provinces (country_id, name) VALUES (1, 'Ciudad Autónoma de Buenos Aires');
INSERT INTO provinces (country_id, name) VALUES (1, 'Córdoba');
INSERT INTO provinces (country_id, name) VALUES (1, 'Corrientes');
INSERT INTO provinces (country_id, name) VALUES (1, 'Entre Ríos');
INSERT INTO provinces (country_id, name) VALUES (1, 'Formosa');
INSERT INTO provinces (country_id, name) VALUES (1, 'Jujuy');
INSERT INTO provinces (country_id, name) VALUES (1, 'La Pampa');
INSERT INTO provinces (country_id, name) VALUES (1, 'La Rioja');
INSERT INTO provinces (country_id, name) VALUES (1, 'Mendoza');
INSERT INTO provinces (country_id, name) VALUES (1, 'Misiones');
INSERT INTO provinces (country_id, name) VALUES (1, 'Neuquén');
INSERT INTO provinces (country_id, name) VALUES (1, 'Río Negro');
INSERT INTO provinces (country_id, name) VALUES (1, 'Salta');
INSERT INTO provinces (country_id, name) VALUES (1, 'San Juan');
INSERT INTO provinces (country_id, name) VALUES (1, 'San Luis');
INSERT INTO provinces (country_id, name) VALUES (1, 'Santa Cruz');
INSERT INTO provinces (country_id, name) VALUES (1, 'Santa Fe');
INSERT INTO provinces (country_id, name) VALUES (1, 'Santiago del Estero');
INSERT INTO provinces (country_id, name) VALUES (1, 'Tierra del Fuego');
INSERT INTO provinces (country_id, name) VALUES (1, 'Tucumán');
INSERT INTO provinces (country_id, name) VALUES (2, 'Antofagasta');
INSERT INTO provinces (country_id, name) VALUES (2, 'Arica y Parinacota');
INSERT INTO provinces (country_id, name) VALUES (2, 'Atacama');
INSERT INTO provinces (country_id, name) VALUES (2, 'Aysén del General Carlos Ibáñez del Campo');
INSERT INTO provinces (country_id, name) VALUES (2, 'Biobío');
INSERT INTO provinces (country_id, name) VALUES (2, 'Coquimbo');
INSERT INTO provinces (country_id, name) VALUES (2, 'La Araucanía');
INSERT INTO provinces (country_id, name) VALUES (2, 'Libertador General Bernardo O Higgins');
INSERT INTO provinces (country_id, name) VALUES (2, 'Los Lagos');
INSERT INTO provinces (country_id, name) VALUES (2, 'Los Ríos');
INSERT INTO provinces (country_id, name) VALUES (2, 'Magallanes');
INSERT INTO provinces (country_id, name) VALUES (2, 'Maule');
INSERT INTO provinces (country_id, name) VALUES (2, 'Santiago');
INSERT INTO provinces (country_id, name) VALUES (2, 'Tarapacá');
INSERT INTO provinces (country_id, name) VALUES (2, 'Valparaíso');
INSERT INTO provinces (country_id, name) VALUES (3, 'Artigas');
INSERT INTO provinces (country_id, name) VALUES (3, 'Canelones');
INSERT INTO provinces (country_id, name) VALUES (3, 'Cerro Largo');
INSERT INTO provinces (country_id, name) VALUES (3, 'Colonia');
INSERT INTO provinces (country_id, name) VALUES (3, 'Durazno');
INSERT INTO provinces (country_id, name) VALUES (3, 'Flores');
INSERT INTO provinces (country_id, name) VALUES (3, 'Florida');
INSERT INTO provinces (country_id, name) VALUES (3, 'Lavalleja');
INSERT INTO provinces (country_id, name) VALUES (3, 'Maldonado');
INSERT INTO provinces (country_id, name) VALUES (3, 'Montevideo');
INSERT INTO provinces (country_id, name) VALUES (3, 'Paysandú');
INSERT INTO provinces (country_id, name) VALUES (3, 'Río Negro');
INSERT INTO provinces (country_id, name) VALUES (3, 'Rivera');
INSERT INTO provinces (country_id, name) VALUES (3, 'Rocha');
INSERT INTO provinces (country_id, name) VALUES (3, 'Salto');
INSERT INTO provinces (country_id, name) VALUES (3, 'San José');
INSERT INTO provinces (country_id, name) VALUES (3, 'Soriano');
INSERT INTO provinces (country_id, name) VALUES (3, 'Tacuarembó');
INSERT INTO provinces (country_id, name) VALUES (3, 'Treinta y Tres');
INSERT INTO provinces (country_id, name) VALUES (4, 'Alto Paraguay');
INSERT INTO provinces (country_id, name) VALUES (4, 'Alto Paraná');
INSERT INTO provinces (country_id, name) VALUES (4, 'Amambay');
INSERT INTO provinces (country_id, name) VALUES (4, 'Asunción');
INSERT INTO provinces (country_id, name) VALUES (4, 'Boquerón');
INSERT INTO provinces (country_id, name) VALUES (4, 'Caaguazú');
INSERT INTO provinces (country_id, name) VALUES (4, 'Caazapá');
INSERT INTO provinces (country_id, name) VALUES (4, 'Canindeyú');
INSERT INTO provinces (country_id, name) VALUES (4, 'Central');
INSERT INTO provinces (country_id, name) VALUES (4, 'Concepción');
INSERT INTO provinces (country_id, name) VALUES (4, 'Cordillera');
INSERT INTO provinces (country_id, name) VALUES (4, 'Guairá');
INSERT INTO provinces (country_id, name) VALUES (4, 'Itapúa');
INSERT INTO provinces (country_id, name) VALUES (4, 'Misiones');
INSERT INTO provinces (country_id, name) VALUES (4, 'Ñeembucú');
INSERT INTO provinces (country_id, name) VALUES (4, 'Paraguarí');
INSERT INTO provinces (country_id, name) VALUES (4, 'Presidente Hayes');
INSERT INTO provinces (country_id, name) VALUES (4, 'San Pedro');

-- TABLE FISCAL_CONDITION
INSERT INTO fiscal_condition VALUES ('IVA Responsable Inscripto');
INSERT INTO fiscal_condition VALUES ('IVA Responsable no Inscripto');
INSERT INTO fiscal_condition VALUES ('IVA no Responsable');
INSERT INTO fiscal_condition VALUES ('IVA Sujeto Exento');
INSERT INTO fiscal_condition VALUES ('Consumidor Final');
INSERT INTO fiscal_condition VALUES ('Responsable Monotributo');
INSERT INTO fiscal_condition VALUES ('Sujeto no Categorizado');
INSERT INTO fiscal_condition VALUES ('Proveedor del Exterior');
INSERT INTO fiscal_condition VALUES ('Cliente del Exterior');
INSERT INTO fiscal_condition VALUES ('IVA Liberado');
INSERT INTO fiscal_condition VALUES ('IVA Responsable Inscripto, Agente de Percepción');
INSERT INTO fiscal_condition VALUES ('Pequeño Contribuyente Eventual');
INSERT INTO fiscal_condition VALUES ('Monotributista Social');
INSERT INTO fiscal_condition VALUES ('Pequeño Contribuyente Eventual Social');

-- TABLE SECTOR
INSERT INTO sector VALUES ('Tecnología');
INSERT INTO sector VALUES ('Repuestos');
INSERT INTO sector VALUES ('Descartables');

-- TABLE CATEGORY
INSERT INTO categories VALUES ('Periféricos');
INSERT INTO categories VALUES ('Notebooks');
INSERT INTO categories VALUES ('Celulares');
INSERT INTO categories VALUES ('Impresoras');
INSERT INTO categories VALUES ('Tintas de impresoras');
INSERT INTO categories VALUES ('Pequeños');
INSERT INTO categories VALUES ('Audio');

-- TABLE PHONES
INSERT INTO phones (country_code, number) VALUES (54, 2911082338);
INSERT INTO phones (country_code, number) VALUES (54, 7322568398);
INSERT INTO phones (country_code, number) VALUES (56, 9035384032);
INSERT INTO phones (country_code, number) VALUES (56, 2344528623);
INSERT INTO phones (country_code, number) VALUES (595, 7458511859);
INSERT INTO phones (country_code, number) VALUES (595, 2706401940);
INSERT INTO phones (country_code, number) VALUES (54, 3347151301);
INSERT INTO phones (country_code, number) VALUES (54, 6157965129);
INSERT INTO phones (country_code, number) VALUES (54, 4889567052);
INSERT INTO phones (country_code, number) VALUES (54, 1445094795);
INSERT INTO phones (country_code, number) VALUES (598, 3297268403);
INSERT INTO phones (country_code, number) VALUES (598, 4445645440);
INSERT INTO phones (country_code, number) VALUES (54, 1561479666);
INSERT INTO phones (country_code, number) VALUES (54, 5407805284);
INSERT INTO phones (country_code, number) VALUES (56, 2978826251);
INSERT INTO phones (country_code, number) VALUES (56, 2936676589);
INSERT INTO phones (country_code, number) VALUES (54, 9623769445);
INSERT INTO phones (country_code, number) VALUES (54, 8787570420);
INSERT INTO phones (country_code, number) VALUES (595, 5744028677);
INSERT INTO phones (country_code, number) VALUES (595, 2364769171);

-- TABLE CONTACTS
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Wilmette', 'Greenroa', 'wgreenroa0@scientificamerican.com', 1, 'Gerente de compras');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Bebe', 'Pedrazzi', 'bpedrazzi1@so-net.ne.jp', 3, 'Encargado de compras');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Tony', 'Shadbolt', 'tshadbolt2@issuu.com', 5, 'Gerente');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Doug', 'Frankema', 'dfrankema3@mozilla.com', 7, 'Contador');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Consalve', 'Sibborn', 'csibborn4@pagesperso-orange.fr', 9, 'Encargado de compras');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Bruis', 'Belcham', 'bbelcham5@latimes.com', 11, 'Gerente de compras');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Jedd', 'Jacquemot', 'jjacquemot6@ovh.net', 13, 'Gerente de compras');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Filbert', 'Pikett', 'fpikett7@rakuten.co.jp', 15, 'Encargado de compras');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Conway', 'Bredbury', 'cbredbury8@aol.com', 17, 'Dueño');
INSERT INTO contacts (name, surname, mail, phone_id, rol) VALUES ('Kathy', 'Hosier', 'khosier9@google.com.hk', 19, 'Gerente');

--TABLE ADDRESS
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('25 de Mayo', 1542, '2400', 'Pilar', 1);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Av 5 de Abril', 3652, '8320000', 'Santiago', 37);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Resistencia', 902, '1201', 'San Roque', 62);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Av Colón', 5042, '5000', 'Córdoba', 6);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('9 de Julio', 6491, '3100', 'Rosario', 21);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Antonio Rubio', 4235, '10129', 'Montevideo', 49);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Sarmiento', 1635, '7600', 'Mar del Plata', 1);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('San Pablo', 9562, '9200000', 'Cerrillo', 37);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Av Alem', 5044, '5590', 'La Paz', 13);
INSERT INTO address (address, number, zip_code, city, province_id) VALUES('Alfonso Rodriguez', 2315, '11203', 'Arroyito', 68);

-- TABLE SUPLIERS
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('tec1', 'Musimundo', 1, 'musimundo.com', 2, 1, '31761319809', 1, 1);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('tec2', 'Rooxo', 1, 'rooxo.com', 4, 2, '30381720705', 8, 2);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('rep3', 'Lazz', 2, 'lazz.com/products', 6, 3, '38906168969', 8, 3);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('tec4', 'Fravega', 1, 'fravega.com', 8, 4, '37688026725', 1, 4);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('des5', 'Talane', 3, 'talane.com', 10, 5, '32680934717', 6, 5);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('rep6', 'Meemm', 2, 'meemm.pl', 12, 6, '31464431388', 8, 6);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('tec7', 'Cetrogar', 1, 'cetrogar.com', 14, 7, '38040671507', 1, 7);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('rep6', 'Fatz', 2, 'fatz.com', 16, 8, '35162101052', 8, 8);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('tec9', 'Linkbuzz', 1, 'li-buzz.com', 18, 9, '35628993832', 1, 9);
INSERT INTO supliers (code, brand, sector_id, web, phone_id, address_id, cuit, fiscal_c_id, contact_id) VALUES ('des10', 'Twinte', 3, 'twinte.co.jp', 20, 10, '31860452612', 8, 10);
