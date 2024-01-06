-- SELECT * FROM my_table;
-- SELECT * FROM other_table;

-- SELECT COUNT(id) AS 'Quantity', AVG(key_1) AS 'Average', SUM(key_1) AS 'SUM'FROM my_table
-- SELECT ROUND(key_1, -1) AS 'Rounded', key_2 FROM my_table;

-- SELECT CONCAT('myString: ', key_2) FROM my_table;
-- SELECT CONCAT(key_2, 'myString') FROM my_table;

-- SELECT AVG(key_3) AS 'Promedio', key_4 FROM other_table GROUP BY key_4

-- select * from date_table

-- SELECT COUNT(p.id) AS 'Cantidad de provincias', c.name AS 'Pais' FROM provinces p 
-- INNER JOIN countries c ON p.country_id = c.id
-- GROUP BY c.name;

SELECT s.brand AS 'Razón social', sc.sector AS 'Rubro', s.web AS 'Sitio web', fc.condition AS 'Condición fiscal',
s.cuit AS 'CUIT', co.name AS 'País', CONCAT(ct.name, ' ', ct.surname) AS 'Nombre de contacto' 
FROM supliers s
INNER JOIN sector sc ON sc.id = s.sector_id
INNER JOIN fiscal_condition fc ON fc.id = s.fiscal_c_id
INNER JOIN contacts ct ON ct.id = s.contact_id
INNER JOIN address ad ON ad.id = s.address_id
INNER JOIN provinces ON provinces.id = ad.province_id
INNER JOIN countries co ON co.id = provinces.country_id
