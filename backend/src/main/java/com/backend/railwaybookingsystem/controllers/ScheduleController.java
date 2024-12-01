package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.*;
import com.backend.railwaybookingsystem.enums.TripType;
import com.backend.railwaybookingsystem.services.ScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api")
@Slf4j
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

    @GetMapping("public/schedules/search")
    public ResponseEntity<SearchScheduleResponse> searchSchedules(
            @RequestParam Long departureStation,
            @RequestParam Long arrivalStation,
            @RequestParam LocalDate departureDate,
            @RequestParam LocalDate returnDate,
            @RequestParam TripType tripType
    ) {
        log.info("Searching schedules for departureStation: {}, arrivalStation: {}, departureDate: {}, returnDate: {}, tripType: {}",
                departureStation, arrivalStation, departureDate, returnDate, tripType);
        var schedules = scheduleService.searchSchedules(departureStation, arrivalStation, departureDate, returnDate, tripType);
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("public/schedules/count")
    public ResponseEntity<List<GetDepartureDateCountResponse>> getDepartureDateCountsBetween(
            @RequestParam LocalDate start,
            @RequestParam LocalDate end
    ) {
        log.info("Getting departure date counts between startDate: {} and endDate: {}", start, end);
        var counts = scheduleService.getDepartureDateCount(start, end);
        return ResponseEntity.ok(counts);
    }
}
