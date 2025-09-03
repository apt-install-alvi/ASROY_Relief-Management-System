DELIMITER $$

CREATE PROCEDURE GetFilteredEvents(
    IN fromDate DATE,
    IN toDate DATE
)
BEGIN
    SELECT e.Event_id, e.Event_name, e.Date_of_occurrence, e.Time_of_occurrence, e.Status,
           a.Area_name
    FROM Event e
    JOIN Area a ON e.Event_area_id = a.Area_id
    
      AND (fromDate IS NULL OR e.Date_of_occurrence >= fromDate)
      AND (toDate IS NULL OR e.Date_of_occurrence <= toDate)
    ORDER BY e.Date_of_occurrence DESC;
END $$

DELIMITER ;




--Filtering events for EVENT PAGE

DELIMITER $$
CREATE PROCEDURE GetEventsByDateRange(IN p_fromDate DATE, IN p_toDate DATE)
BEGIN
    SELECT * FROM Event e 
    JOIN Area a ON e.Event_area_id = a.Area_id 
    WHERE e.Date_of_occurrence BETWEEN p_fromDate AND p_toDate 
    ORDER BY e.Date_of_occurrence DESC;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE GetEventsByType(IN p_type ENUM('Flood','Cyclone','Landslide','Earthquake','Drought','Fire'))
BEGIN
    SELECT * FROM Event e 
    JOIN Area a ON e.Event_area_id = a.Area_id 
    WHERE e.Event_name = p_type 
    ORDER BY e.Date_of_occurrence DESC;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE GetEventsByArea(IN p_area VARCHAR(50))
BEGIN
    SELECT * FROM Event e 
    JOIN Area a ON e.Event_area_id = a.Area_id 
    WHERE a.Area_name = p_area 
    ORDER BY e.Date_of_occurrence DESC;
END$$
DELIMITER ;

