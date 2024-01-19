-- Test queries personales
SELECT 
	s.brand AS 'Razón social', 
	sc.sector AS 'Rubro', 
	s.web AS 'Sitio web', 
	fc.condition AS 'Condición fiscal',
	s.cuit AS 'CUIT', 
	co.name AS 'País', 
	CONCAT(ct.name, ' ', ct.surname) AS 'Nombre de contacto' 
FROM supliers s
	INNER JOIN sector sc ON sc.id = s.sector_id
	INNER JOIN fiscal_condition fc ON fc.id = s.fiscal_c_id
	INNER JOIN contacts ct ON ct.id = s.contact_id
	INNER JOIN address ad ON ad.id = s.address_id
	INNER JOIN provinces ON provinces.id = ad.province_id
	INNER JOIN countries co ON co.id = provinces.country_id
ORDER BY s.brand;

SELECT COUNT(p.id) AS 'Cantidad de productos', s.brand AS 'Proveedor' 
FROM supliers s
	INNER JOIN products p ON p.suplier_id = s.id
GROUP BY s.brand;


-- Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
SELECT p.name AS 'Nombre', c.category AS 'Categoría', s.brand AS 'Proveedor', CONCAT('$', p.price) AS 'Precio unitario' 
FROM products p
	INNER JOIN categories c ON p.category_id = c.id
	INNER JOIN supliers s ON s.id = p.suplier_id
ORDER BY p.name ASC, s.brand ASC;

-- En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
SELECT 
	p.name AS 'Nombre', 
	c.category AS 'Categoría', 
	s.brand AS 'Proveedor', 
	CONCAT('$', p.price) AS 'Precio unitario', 
	ISNULL(p.picture, '-') AS 'URL de imagen' -- Ignorar que son todas robadas de frávega please :)
FROM products p
	INNER JOIN categories c ON p.category_id = c.id
	INNER JOIN supliers s ON s.id = p.suplier_id
ORDER BY p.name ASC, s.brand ASC;

-- Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
SELECT 
	p.name AS 'Pdroducto', 
	s.brand AS 'Proveedor', 
	c.category AS 'Categoría', 
	p.description AS 'Descripción', 
	p.picture AS 'URL de imagen', 
	p.price AS 'Precio'
FROM products p
	INNER JOIN categories c ON p.category_id = c.id
	INNER JOIN supliers s ON s.id = p.suplier_id
WHERE p.id = 2;

-- Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.
SELECT 
	s.brand AS 'Proveedor'
FROM supliers s
	INNER JOIN phones sp ON sp.id = s.phone_id
	INNER JOIN address a ON a.id = s.address_id
WHERE 
	sp.number LIKE '351%' OR
	a.province_id IN (
		SELECT TOP 3 a.province_id 
		FROM address a 
		GROUP BY a.province_id 
		ORDER BY COUNT(a.id) DESC
	);
-- Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
SELECT 
	s.brand AS 'Razón social',
	CONCAT(c.name, ' ', c.surname) AS 'Nombre',
	CONCAT('+', p.country_code, '-', p.number, ' | ', c.mail, ' | ', s.web) AS 'Datos de contacto'
FROM supliers s
	INNER JOIN contacts c ON c.id = s.contact_id
	INNER JOIN phones p ON p.id = c.phone_id
WHERE s.is_available = 1;

-- Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.
SELECT
	s.brand AS 'Razón social',
	s.code AS 'Código de proveedor',
	ISNULL(s.logo, '-') AS 'URL del logo',
	s.web AS 'Página web',
	CONCAT('+', sp.country_code, '-', sp.number) AS 'Teléfono',
	CONCAT(c.name, ' ', c.surname) AS 'Nombre de contacto',
	c.mail AS 'Email de contacto',
	CONCAT('+', cp.country_code, '-', cp.number) AS 'Teléfono de contacto'
FROM supliers s
	INNER JOIN contacts c ON c.id = s.contact_id
	INNER JOIN phones sp ON sp.id = s.phone_id
	INNER JOIN phones cp ON cp.id = c.phone_id
WHERE s.id IN (
				SELECT TOP(1) WITH TIES po.suplier_id 
				FROM purchase_orders po 
				GROUP BY po.suplier_id 
				ORDER BY COUNT(po.id) DESC
				)


-- Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.
SELECT 
	po.created_at AS 'Fecha de emisión', 
	po.id AS 'Número de orden', 
	s.code AS 'Código de proveedor', 
	s.brand AS 'Proveedor',
	(SELECT 
		SUM(pp.quantity) 
	FROM purchase_products pp 
	WHERE pp.purchase_id = po.id
	) AS 'Cantidad de productos' 
FROM purchase_orders po
	INNER JOIN supliers s ON s.id = po.suplier_id
GROUP BY po.id, po.created_at, s.code, s.brand
ORDER BY [Fecha de emisión] DESC, [Cantidad de productos] DESC

-- En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.
SELECT 
	po.created_at AS 'Fecha de emisión', 
	po.id AS 'Número de orden', 
	s.code AS 'Código de proveedor', 
	s.brand AS 'Proveedor',
	(SELECT 
		COUNT(pp.id) 
	FROM purchase_products pp 
	WHERE pp.purchase_id = po.id
	) AS 'Cantidad de productos',
	(SELECT 
		SUM(pp.quantity * pp.price) 
	FROM purchase_products pp 
	WHERE pp.purchase_id = po.id
	) AS 'Precio total',
	CASE po.is_available
		WHEN 1 THEN 'Disponible'
		WHEN 0 THEN 'Cancelada'
	END AS 'Estado'
FROM purchase_orders po
	INNER JOIN supliers s ON s.id = po.suplier_id
ORDER BY [Fecha de emisión] DESC, [Cantidad de productos] DESC

-- Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.
SELECT 
	p.code AS 'SKU',
	p.name AS 'Nombre del producto',
	pp.quantity AS 'Cantidad',
	CONCAT('$', (pp.price * pp.quantity)) AS 'Subtotal'
FROM purchase_orders po
	INNER JOIN purchase_products pp ON pp.purchase_id = po.id
	INNER JOIN products p ON p.id = pp.product_id
WHERE po.id = (
				SELECT TOP 1 po.id
				FROM purchase_orders po
				WHERE po.suplier_id = 3
				ORDER BY po.created_at DESC
				)
ORDER BY p.name ASC

-- Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 1.
UPDATE purchase_orders 
SET is_available = 0 
WHERE id = 1;

-- Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA).

-- Elimina lis detalles de productos con product_id = 1
--DELETE FROM purchase_products
--WHERE product_id = 1;

-- Elimina el producto
--DELETE FROM products 
--WHERE id = 1;

-- Elimina las órdenes vacías.
--DELETE FROM purchase_orders
--WHERE id NOT IN (
--			SELECT pp.purchase_id 
--			FROM purchase_products pp
--			);
