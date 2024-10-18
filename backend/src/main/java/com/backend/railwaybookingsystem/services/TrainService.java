package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateRouteSegmentRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetTrainRouteSegmentsResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TrainService {

    TrainResponse getTrainById(Long id);

    TrainResponse saveTrain(CreateTrainRequest request);

    Page<TrainResponse> getTrains(String keyword, int page, int size);
}
