package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.tickets.responses.MyTicketResponse;
import com.backend.railwaybookingsystem.services.TicketService;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("api")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping("user/tickets/me")
    @Operation(tags = "Tickets", description = "Get my tickets")
    public ResponseEntity<CustomPagination<MyTicketResponse>> getMyOrders(@RequestParam(defaultValue = "1") int page,
                                                                          @RequestParam(defaultValue = "10") int size,
                                                                          @RequestParam(defaultValue = "") String keyword
    ) {
        Page<MyTicketResponse> tickets = ticketService.getMyTickets(keyword, page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(tickets));
    }

    // ticket for a schedule
    @GetMapping("public/tickets/schedules/{id}")
    @Operation(tags = "Tickets", description = "Get tickets for a schedule")
    public ResponseEntity<CustomPagination<MyTicketResponse>> getTicketsForSchedule(@PathVariable Long id,
                                                                                    @RequestParam(defaultValue = "1") int page,
                                                                                    @RequestParam(defaultValue = "10") int size,
                                                                                    @RequestParam(defaultValue = "") String keyword
    ) {
        Page<MyTicketResponse> tickets = ticketService.getTicketsForSchedule(id, keyword, page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(tickets));
    }
}
