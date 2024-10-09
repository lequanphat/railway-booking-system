package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.models.Station;
import com.backend.railwaybookingsystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/public/stations")
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping()
    public ResponseEntity<List<Station>> getAllProvinces() {
        List<Station> provinces = stationService.getAllStations();
        return ResponseEntity.ok(provinces);
    }
}
