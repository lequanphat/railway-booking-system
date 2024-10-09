package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.models.Station;
import com.backend.railwaybookingsystem.repositories.StationRepository;
import com.backend.railwaybookingsystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationServiceImpl implements StationService {

    @Autowired
    private StationRepository stationRepository;

    @Override
    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }
}
