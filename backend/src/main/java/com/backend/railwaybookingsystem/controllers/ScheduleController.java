package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.ScheduleDetailsResponse;
import com.backend.railwaybookingsystem.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("public/schedules/{date}")
    public ResponseEntity<List<GetScheduleByDateResponse>> getSchedulesByDate(@PathVariable LocalDate date) {
        var schedules = scheduleService.getSchedulesByDate(date);
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("ad/schedules")
    public ResponseEntity<Void> createSchedule(@RequestBody CreateScheduleRequest request) {
        scheduleService.createSchedule(request);
        return ResponseEntity.created(null).build();
    }

    @DeleteMapping("ad/schedules/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("public/schedules/{id}/details")
    public ResponseEntity<ScheduleDetailsResponse> getScheduleDetails(@PathVariable Long id) {
        ScheduleDetailsResponse schedules = scheduleService.getScheduleDetails(id);
        return ResponseEntity.ok(schedules);
    }
}
