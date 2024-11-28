package com.backend.railwaybookingsystem.dtos.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketReportResponse {
    private Long totalTickets;
    private Double totalPrice;
    private LocalDate date;
}