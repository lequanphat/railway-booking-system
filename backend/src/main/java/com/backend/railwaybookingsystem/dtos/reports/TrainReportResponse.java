package com.backend.railwaybookingsystem.dtos.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainReportResponse {
    private Long totalTickets;
    private Double totalPrice;
    private String train;
}
