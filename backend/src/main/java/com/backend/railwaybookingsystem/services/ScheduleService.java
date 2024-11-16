package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.ScheduleDetailsResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.SearchScheduleResponseV2;
import com.backend.railwaybookingsystem.enums.TripType;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {
    List<GetScheduleByDateResponse> getSchedulesByDate(LocalDate date);
    void createSchedule(CreateScheduleRequest request);
    void deleteSchedule(Long id);
    ScheduleDetailsResponse getScheduleDetails(Long id);
    SearchScheduleResponseV2 searchSchedules(
            Long departureStation,
            Long arrivalStation,
            LocalDate departureDate,
            LocalDate returnDate,
            TripType tripType);

}
