package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findByScheduleIdAndCarriageIdAndSeatId(long scheduleId, long carriageId, long seatId);
}
