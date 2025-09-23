DELIMITER $$

CREATE TRIGGER check_stock_threshold 
AFTER UPDATE ON Goods
FOR EACH ROW
BEGIN
  DECLARE threshold NUMERIC DEFAULT 20;
  DECLARE low_stock_count INT;

  IF NEW.Goods_quantity = 0 THEN
    DELETE FROM Low_Stock WHERE Goods_id = NEW.Goods_id;
    -- DELETE FROM Goods WHERE Goods_id = NEW.Goods_id;
  
  ELSEIF NEW.Goods_quantity < threshold AND OLD.Goods_quantity >= threshold THEN
    INSERT INTO Low_Stock (Goods_id, Current_quantity)
    VALUES (NEW.Goods_id, NEW.Goods_quantity);

  ELSEIF NEW.Goods_quantity < threshold AND OLD.Goods_quantity < threshold THEN
    UPDATE Low_Stock
    SET Current_quantity = NEW.Goods_quantity
    WHERE Goods_id = NEW.Goods_id;
     
  ELSEIF NEW.Goods_quantity >= threshold AND OLD.Goods_quantity < threshold THEN
    DELETE FROM Low_Stock WHERE Goods_id = NEW.Goods_id;
    
    END IF;
END$$

DELIMITER ;