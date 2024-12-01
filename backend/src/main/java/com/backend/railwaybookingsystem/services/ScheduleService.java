package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.requests.GetDepartureDateCountRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.*;
import com.backend.railwaybookingsystem.enums.TripType;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {
    List<GetScheduleByDateResponse> getSchedulesByDate(LocalDate date);

    void createSchedule(CreateScheduleRequest request);

    void deleteSchedule(Long id);

    ScheduleDetailsResponse getScheduleDetails(Long id);

    SearchScheduleResponse searchSchedules(
            Long departureStation,
            Long arrivalStation,
            LocalDate departureDate,
            LocalDate returnDate,
            TripType tripType);

    List<GetDepartureDateCountResponse> getDepartureDateCount(LocalDate start, LocalDate end);
}
