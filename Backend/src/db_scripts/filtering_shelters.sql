DELIMITER $$

CREATE PROCEDURE GetSheltersByArea(IN p_area VARCHAR(50))
BEGIN
    SELECT s.Shelter_id,
           s.Shelter_name,
           s.Total_capacity,
           s.Current_capacity,
           a.Area_name
    FROM Shelter s
    JOIN shelter_in_area sa ON s.Shelter_id = sa.shelter_id
    JOIN Area a ON sa.area_id = a.Area_id
    WHERE a.Area_name = p_area
    ORDER BY s.Shelter_name;
END$$

DELIMITER ;