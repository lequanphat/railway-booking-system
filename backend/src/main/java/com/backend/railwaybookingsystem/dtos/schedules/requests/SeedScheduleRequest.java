package com.backend.railwaybookingsystem.dtos.schedules.requests;

import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
public class SeedScheduleRequest {
    LocalDate startDate;
    LocalDate endDate;
    List<Long> trainIds;
    String daysOfWeek;
}
