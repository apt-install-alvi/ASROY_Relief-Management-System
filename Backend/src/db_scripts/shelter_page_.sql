CREATE TABLE Deleted_Shelters (
    Del_id INT AUTO_INCREMENT PRIMARY KEY,
    Shelter_id VARCHAR(4),
    Shelter_name VARCHAR(50),
    Area_id VARCHAR(4),
    Area_name VARCHAR(20),
    Deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DELIMITER $$

CREATE TRIGGER LogShelterDeletion
AFTER DELETE ON Shelter
FOR EACH ROW
BEGIN
    DECLARE areaId VARCHAR(4);
    DECLARE areaName VARCHAR(20);

    -- Get area_id and area_name
    SELECT sia.area_id, a.Area_name INTO areaId, areaName
    FROM shelter_in_area sia
    JOIN Area a ON sia.area_id = a.Area_id
    WHERE sia.shelter_id = OLD.Shelter_id
    LIMIT 1;

INSERT INTO Deleted_Shelters (Shelter_id, Shelter_name, Area_id, Area_name)
VALUES (OLD.Shelter_id, OLD.Shelter_name, areaId, areaName);

END$$

DELIMITER ;

CREATE VIEW OvercapacityShelters AS
SELECT 
    s.Shelter_id, 
    s.Shelter_name, 
    s.Current_capacity, 
    s.Total_capacity,
    (s.Current_capacity - s.Total_capacity) AS ExcessPeople,
    a.Area_name
FROM Shelter s
JOIN shelter_in_area sia ON s.Shelter_id = sia.shelter_id
JOIN Area a ON sia.area_id = a.Area_id
WHERE s.Current_capacity > s.Total_capacity;

