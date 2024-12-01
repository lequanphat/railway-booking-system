package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findByScheduleIdAndCarriageIdAndSeatId(long scheduleId, long carriageId, long seatId);

    Page<Ticket> findTicketByOrderUserId(long userId, Pageable pageable);


    @Query("""
            SELECT t FROM Ticket t 
            WHERE t.schedule.id = :scheduleId 
                AND (t.code LIKE %:keyword% 
                OR t.seatType LIKE %:keyword% 
                OR t.carriageType LIKE %:keyword% 
                OR t.fullName LIKE %:keyword% 
                OR t.identity LIKE %:keyword% 
                OR t.departureStation LIKE %:keyword% 
                OR t.arrivalStation LIKE %:keyword% 
                OR t.departureTime LIKE %:keyword% 
                OR t.arrivalTime LIKE %:keyword%)
            """)
    Page<Ticket> findTicketByScheduleId(long scheduleId, String keyword, Pageable pageable);
}
