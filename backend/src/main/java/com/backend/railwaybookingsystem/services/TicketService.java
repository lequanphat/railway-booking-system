package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.tickets.responses.MyTicketResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDate;


public interface TicketService {
    Page<MyTicketResponse> getMyTickets(String keyword, int page, int size);

    Page<MyTicketResponse> getTicketsForSchedule(Long trainId, LocalDate departureTime, Long personTypeId, Long carriageId, String departureStatio, String arrivalStation, String keyword, int page, int size);
}
