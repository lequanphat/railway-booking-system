package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.ScheduleDetailsResponse;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {
    List<GetScheduleByDateResponse> getSchedulesByDate(LocalDate date);
    void createSchedule(CreateScheduleRequest request);
    void deleteSchedule(Long id);

    ScheduleDetailsResponse getScheduleDetails(Long id);
}
