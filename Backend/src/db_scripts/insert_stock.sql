DELIMITER $$

CREATE TRIGGER check_stock_insert 
AFTER INSERT ON Goods
FOR EACH ROW
BEGIN
  DECLARE threshold NUMERIC DEFAULT 20;
  IF NEW.Goods_quantity < threshold THEN
    INSERT INTO Low_Stock (Goods_id, Current_quantity)
    VALUES (NEW.Goods_id, NEW.Goods_quantity);
  END IF;
END$$

DELIMITER ;
