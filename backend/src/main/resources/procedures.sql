DROP PROCEDURE IF EXISTS SeedSchedules^;

CREATE PROCEDURE SeedSchedules(
    IN startDate DATE,
    IN endDate DATE,
    IN trainId INT,
    IN daysOfWeek VARCHAR(7) -- e.g., '1111111' for every day, '1000001' for only Sundays and Saturdays
)
BEGIN
    DECLARE currentDate DATE;
    DECLARE dayOfWeek INT;
    SET currentDate = startDate;

    WHILE currentDate <= endDate DO
            SET dayOfWeek = DAYOFWEEK(currentDate) - 1; -- MySQL returns 1 for Sunday, 2 for Monday, ..., 7 for Saturday
            IF SUBSTRING(daysOfWeek, dayOfWeek + 1, 1) = '1' THEN
                INSERT INTO schedules (train_id, departure_date) VALUES (trainId, currentDate);
            END IF;
            SET currentDate = DATE_ADD(currentDate, INTERVAL 1 DAY);
        END WHILE;
END^;