DELIMITER $$

CREATE PROCEDURE `GetEventDashboard`()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE curr_area VARCHAR(255);
  DECLARE curr_count INT;

  -- Cursor to count active events per area
  DECLARE area_cursor CURSOR FOR
      SELECT a.Area_name, COUNT(*) AS active_count
      FROM Event e
      JOIN Area a ON e.Event_area_id = a.Area_id
      WHERE e.Status='Active'
      GROUP BY a.Area_name;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  -- Temporary table to store alerts
  CREATE TEMPORARY TABLE IF NOT EXISTS temp_alerts (
      area VARCHAR(255),
      message VARCHAR(255)
  );

  OPEN area_cursor;

  read_loop: LOOP
    FETCH area_cursor INTO curr_area, curr_count;
    IF done THEN
      LEAVE read_loop;
    END IF;

    -- Generate alert if active events > 2 in the same area
    IF curr_count > 2 THEN
      INSERT INTO temp_alerts(area, message)
      VALUES (curr_area, CONCAT('High number of active events: ', curr_count));
    END IF;
  END LOOP;

  CLOSE area_cursor;

  -- Return overall stats and alerts
  SELECT 
      (SELECT COUNT(*) FROM Event) AS totalEvents,
      (SELECT COUNT(*) FROM Event WHERE Status='Active') AS activeEvents,
      (SELECT Area_name FROM Event e JOIN Area a ON e.Event_area_id = a.Area_id
       WHERE e.Status='Active'
       GROUP BY a.Area_name
       ORDER BY COUNT(*) DESC LIMIT 1) AS mostActiveArea,
      (SELECT Event_name FROM Event
       WHERE Status='Active'
       GROUP BY Event_name
       ORDER BY COUNT(*) DESC LIMIT 1) AS mostFrequentType;

  SELECT * FROM temp_alerts;

  DROP TEMPORARY TABLE IF EXISTS temp_alerts;
END$$

DELIMITER ;