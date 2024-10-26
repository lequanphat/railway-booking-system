package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetAllTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TrainService {

    TrainDetailResponse getTrainDetailById(Long id);

    CreateTrainResponse saveTrain(CreateTrainRequest request);

    Page<TrainListResponse> getTrains(String keyword, int page, int size);

    List<GetAllTrainResponse> getAllTrains();
}
