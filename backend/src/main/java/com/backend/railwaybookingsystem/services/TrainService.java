package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.trains.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.TrainResponse;
import org.springframework.data.domain.Page;

public interface TrainService {

    TrainResponse getTrainById(Long id);

    TrainResponse saveTrain(CreateTrainRequest request);

    Page<TrainResponse> getTrains(String keyword, int page, int size);
}
