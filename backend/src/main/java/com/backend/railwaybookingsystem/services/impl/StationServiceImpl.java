package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.stations.CreateStationRequest;
import com.backend.railwaybookingsystem.dtos.stations.StationResponse;
import com.backend.railwaybookingsystem.mappers.StationMapper;
import com.backend.railwaybookingsystem.models.Station;
import com.backend.railwaybookingsystem.repositories.StationRepository;
import com.backend.railwaybookingsystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationServiceImpl implements StationService {

    @Autowired
    private StationRepository stationRepository,provinceRepository;

    @Override
    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    public Page<StationResponse> getStations(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        var stations = stationRepository.findByNameContainingIgnoreCase(keyword, pageRequest)
                .map(StationMapper.INSTANCE::convertToStationResponse);

        return stations;
    }

    public StationResponse saveStation(CreateStationRequest request) {
        System.out.println(request.getProvince().getId());
        System.out.println(request.getName());
        Station station = StationMapper.INSTANCE.convertToStation(request);
        Station savedStation = stationRepository.save(station);
        return StationMapper.INSTANCE.convertToStationResponse(savedStation);
    }

}
