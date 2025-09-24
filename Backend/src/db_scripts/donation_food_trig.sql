DELIMITER $$

CREATE TRIGGER after_insert_food_donation
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    IF NEW.Donation_type = 'Food' THEN
        UPDATE Goods g
        JOIN Food f ON g.Goods_id = f.Food_id
        SET g.Goods_quantity = g.Goods_quantity + NEW.Quantity,
            g.Goods_status = CASE 
                WHEN g.Goods_quantity + NEW.Quantity > 20 THEN 'In Stock'
                ELSE 'Low Stock'
            END,
            f.Stock = f.Stock + NEW.Quantity
        WHERE g.Goods_name = NEW.Item_name;
    END IF;
END$$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_insert_medicine_donation
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    IF NEW.Donation_type = 'Medicine' THEN
        UPDATE Goods g
        JOIN Medicine m ON g.Goods_id = m.Medicine_id
        SET g.Goods_quantity = g.Goods_quantity + NEW.Quantity,
            g.Goods_status = CASE 
                WHEN g.Goods_quantity + NEW.Quantity > 20 THEN 'In Stock'
                ELSE 'Low Stock'
            END,
            m.Stock = m.Stock + NEW.Quantity
        WHERE g.Goods_name = NEW.Item_name;
    END IF;
END$$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_insert_clothes_donation
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    IF NEW.Donation_type = 'Clothes' THEN
        UPDATE Goods g
        JOIN Clothes c ON g.Goods_id = c.Clothes_id
        SET g.Goods_quantity = g.Goods_quantity + NEW.Quantity,
            g.Goods_status = CASE 
                WHEN g.Goods_quantity + NEW.Quantity > 20 THEN 'In Stock'
                ELSE 'Low Stock'
            END,
            c.Stock = c.Stock + NEW.Quantity
        WHERE g.Goods_name = NEW.Item_name;
    END IF;
END$$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_insert_others_donation
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    IF NEW.Donation_type = 'Others' THEN
        UPDATE Goods g
        JOIN Others o ON g.Goods_id = o.Others_id
        SET g.Goods_quantity = g.Goods_quantity + NEW.Quantity,
            g.Goods_status = CASE 
                WHEN g.Goods_quantity + NEW.Quantity > 20 THEN 'In Stock'
                ELSE 'Low Stock'
            END,
            o.Stock = o.Stock + NEW.Quantity
        WHERE g.Goods_name = NEW.Item_name;
    END IF;
END$$

DELIMITER ;