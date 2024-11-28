package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.tickets.responses.MyTicketResponse;
import org.springframework.data.domain.Page;


public interface TicketService {

    Page<MyTicketResponse> getMyTickets(String keyword, int page, int size);
}
