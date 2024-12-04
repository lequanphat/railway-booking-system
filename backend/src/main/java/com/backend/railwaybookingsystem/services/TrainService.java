package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.carriages.GetCarriageOfTrainResponse;
import com.backend.railwaybookingsystem.dtos.reports.OrderReportResponse;
import com.backend.railwaybookingsystem.dtos.reports.TrainReportResponse;
import com.backend.railwaybookingsystem.dtos.routes.RouteResponse;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.UpdateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetAllTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.UpdateTrainResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface TrainService {

    TrainDetailResponse getTrainDetailById(Long id);

    CreateTrainResponse saveTrain(CreateTrainRequest request);

    Page<TrainListResponse> getTrains(String keyword, int page, int size);

    List<GetAllTrainResponse> getAllTrains();

    UpdateTrainResponse updateTrain(Long id, UpdateTrainRequest request);

    List<TrainReportResponse> getReport(LocalDateTime startDate, LocalDateTime endDate);

    List<GetCarriageOfTrainResponse> getCarriagesOfTrain(Long trainId);

    List<RouteResponse> getAllRoutes();
}
