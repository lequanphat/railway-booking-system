package com.backend.railwaybookingsystem.dtos.schedules.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
public class CreateScheduleRequest {
    @NotNull
    private LocalDate date;

    @NotNull
    private List<Long> trains;
}
