package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.UpdateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.UpdateTrainResponse;
import org.springframework.data.domain.Page;

public interface TrainService {

    TrainDetailResponse getTrainDetailById(Long id);

    CreateTrainResponse saveTrain(CreateTrainRequest request);

    Page<TrainListResponse> getTrains(String keyword, int page, int size);

    UpdateTrainResponse updateTrain(Long id, UpdateTrainRequest request);
}
