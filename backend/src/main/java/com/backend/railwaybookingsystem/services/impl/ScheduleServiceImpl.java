package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.ScheduleMapper;
import com.backend.railwaybookingsystem.models.Schedule;
import com.backend.railwaybookingsystem.models.Train;
import com.backend.railwaybookingsystem.repositories.ScheduleRepository;
import com.backend.railwaybookingsystem.repositories.TrainRepository;
import com.backend.railwaybookingsystem.services.ScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private TrainRepository trainRepository;

    @Override
    public List<GetScheduleByDateResponse> getSchedulesByDate(LocalDate date) {
        return ScheduleMapper.INSTANCE.convertToGetScheduleByDateResponseList(
                scheduleRepository.findByDepartureDate(date)
        );
    }

    @Override
    public void createSchedule(CreateScheduleRequest request) {
        List<Schedule> schedules = request.getTrains().stream()
                .map(trainId -> {
                    Train train = trainRepository.findById(trainId)
                            .orElseThrow(() -> new NotFoundException("Train not found with id: " + trainId));
                    return Schedule.builder()
                            .train(train)
                            .departureDate(request.getDate())
                            .build();
                })
                .toList();
        scheduleRepository.saveAll(schedules);
    }

    @Override
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
