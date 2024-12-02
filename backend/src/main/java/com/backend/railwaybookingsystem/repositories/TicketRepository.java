package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findByScheduleIdAndCarriageIdAndSeatId(long scheduleId, long carriageId, long seatId);

    Page<Ticket> findTicketByOrderUserId(long userId, Pageable pageable);


    @Query("""
            SELECT t FROM Ticket t 
            WHERE (:trainId IS NULL OR t.schedule.train.id = :trainId)
                AND (:departureTime IS NULL OR t.schedule.departureDate = :departureTime)
                AND (:personTypeId IS NULL OR t.object.id = :personTypeId)
                AND (:carriageId IS NULL OR t.carriage.id = :carriageId)
                AND (:departureStation IS NULL OR t.departureStation = :departureStation)
                AND (:arrivalStation IS NULL OR t.arrivalStation = :arrivalStation)
                AND (t.code LIKE %:keyword% 
                OR t.seatType LIKE %:keyword% 
                OR t.carriageType LIKE %:keyword% 
                OR t.fullName LIKE %:keyword% 
                OR t.identity LIKE %:keyword% 
                OR t.departureStation LIKE %:keyword% 
                OR t.arrivalStation LIKE %:keyword% 
                OR t.departureTime LIKE %:keyword% 
                OR t.arrivalTime LIKE %:keyword%)
            ORDER BY t.order.createdAt DESC
            """)
    Page<Ticket> filterTicket(Long trainId, LocalDate departureTime, Long personTypeId, Long carriageId, String departureStation, String arrivalStation, String keyword, Pageable pageable);
}
