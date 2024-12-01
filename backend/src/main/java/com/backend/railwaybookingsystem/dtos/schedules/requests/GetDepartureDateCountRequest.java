package com.backend.railwaybookingsystem.dtos.schedules.requests;

import lombok.Value;

import java.time.LocalDate;

@Value
public class GetDepartureDateCountRequest {
    private LocalDate start;
    private LocalDate end;
}
