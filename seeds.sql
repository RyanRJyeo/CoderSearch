--  ===================================
-- 				Update Coder Profile
--  ===================================

UPDATE coders
SET name = ($2), occupation = ($3), language = ($4), framework = ($5), description = ($6), address = ($7), lat = ($8), long = ($9)
WHERE id = ($1);


UPDATE searchers
SET name = ($2), language = ($3), framework = ($4), description = ($5), address = ($6), lat = ($7), long = ($8)
WHERE id = ($1);


--  ===================================