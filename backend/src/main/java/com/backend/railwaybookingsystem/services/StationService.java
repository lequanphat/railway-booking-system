package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.stations.CreateStationRequest;
import com.backend.railwaybookingsystem.dtos.stations.StationResponse;
import com.backend.railwaybookingsystem.models.Station;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StationService {
    List<Station> getAllStations();
    Page<StationResponse> getStations(String keyword, int page, int size);
    StationResponse saveStation(CreateStationRequest request);
}
