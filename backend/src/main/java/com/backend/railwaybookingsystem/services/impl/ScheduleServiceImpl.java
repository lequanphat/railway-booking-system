package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.schedules.requests.CreateScheduleRequest;
import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.ScheduleDetailsResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.SearchScheduleResponse;
import com.backend.railwaybookingsystem.enums.TripType;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.ScheduleMapper;
import com.backend.railwaybookingsystem.models.Schedule;
import com.backend.railwaybookingsystem.models.Train;
import com.backend.railwaybookingsystem.repositories.ScheduleRepository;
import com.backend.railwaybookingsystem.repositories.StationRepository;
import com.backend.railwaybookingsystem.repositories.TrainRepository;
import com.backend.railwaybookingsystem.services.RouteSegmentService;
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

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private RouteSegmentService routeSegmentService;

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

    @Override
    public ScheduleDetailsResponse getScheduleDetails(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + id));
        return ScheduleMapper.INSTANCE.convertToScheduleDetailsResponse(schedule);
    }

    @Override
    public SearchScheduleResponse searchSchedules(
            Long departureStation,
            Long arrivalStation,
            LocalDate departureDate,
            LocalDate returnDate,
            TripType tripType
    ) {
        List<Schedule> departureSchedules = scheduleRepository.searchSchedules(departureDate, departureStation, arrivalStation);
        var departureResponse = mapSchedulesToResponse(departureSchedules, departureStation, arrivalStation);

        if (tripType == TripType.ONE_WAY) {
            return buildSearchScheduleResponse(departureStation, arrivalStation, departureDate, returnDate, departureResponse, null, tripType);
        }

        List<Schedule> returnSchedules = scheduleRepository.searchSchedules(returnDate, arrivalStation, departureStation);
        var returnResponse = mapSchedulesToResponse(returnSchedules, arrivalStation, departureStation);

        return buildSearchScheduleResponse(departureStation, arrivalStation, departureDate, returnDate, departureResponse, returnResponse, tripType);
    }

    private List<SearchScheduleResponse.ScheduleDto> mapSchedulesToResponse(List<Schedule> schedules, Long departureStation, Long arrivalStation) {
        return schedules.stream()
                .map(schedule -> ScheduleMapper.INSTANCE.convertToSearchScheduleResponse(schedule, routeSegmentService, departureStation, arrivalStation))
                .toList();
    }

    private SearchScheduleResponse buildSearchScheduleResponse(
            Long departureStation,
            Long arrivalStation,
            LocalDate departureDate,
            LocalDate returnDate,
            List<SearchScheduleResponse.ScheduleDto> departureResponse,
            List<SearchScheduleResponse.ScheduleDto> returnResponse,
            TripType tripType
    ) {
        return ScheduleMapper.INSTANCE.convertToSearchScheduleResponseV2(
                departureStation,
                arrivalStation,
                stationRepository.findById(departureStation).get().getName(),
                stationRepository.findById(arrivalStation).get().getName(),
                departureDate.toString(),
                returnDate.toString(),
                departureResponse,
                returnResponse,
                tripType.name()
        );
    }
}
