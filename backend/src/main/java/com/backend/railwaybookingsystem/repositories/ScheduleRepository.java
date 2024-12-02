package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Schedule;
import com.backend.railwaybookingsystem.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByDepartureDate(LocalDate date);

    @Query("""
                SELECT s
                FROM Schedule s
                JOIN s.train t
                JOIN t.routeSegments rsDeparture
                JOIN t.routeSegments rsArrival
                WHERE s.departureDate = :departureDate
                  AND rsDeparture.station.id = :departureStation
                  AND rsArrival.station.id = :arrivalStation
                  AND rsDeparture.distance < rsArrival.distance
            """)
    List<Schedule> searchSchedules(LocalDate departureDate, Long departureStation, Long arrivalStation);

    @Query("""
            SELECT s.departureDate, count(s.train.id) as count
            FROM Schedule s
            WHERE s.departureDate between :startDate and :endDate
            GROUP BY s.departureDate
            """)
    List<Object[]> findDepartureDateCountsBetween(LocalDate startDate, LocalDate endDate);

    @Procedure("SeedSchedules")
    void seedSchedules(LocalDate startDate, LocalDate endDate, Long trainId, String daysOfWeek);

    @Query("SELECT s.train.id, MAX(s.departureDate) FROM Schedule s WHERE s.train.id IN :trainIds GROUP BY s.train.id")
    List<Object[]> findMaxDepartureDateByTrainIds(List<Long> trainIds);
}