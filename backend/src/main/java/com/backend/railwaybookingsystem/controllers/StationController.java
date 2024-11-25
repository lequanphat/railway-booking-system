package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.stations.CreateStationRequest;
import com.backend.railwaybookingsystem.dtos.stations.StationResponse;
import com.backend.railwaybookingsystem.models.Station;
import com.backend.railwaybookingsystem.services.ProvinceService;
import com.backend.railwaybookingsystem.services.StationService;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/public/stations")
public class StationController {

    @Autowired
    private StationService stationService;
    @Autowired
    private ProvinceService provinceService;

    @GetMapping("all")
    public ResponseEntity<List<Station>> getAllProvinces() {
        List<Station> provinces = stationService.getAllStations();
        return ResponseEntity.ok(provinces);
    }

    @GetMapping()
    public ResponseEntity<CustomPagination<StationResponse>> getStations(@RequestParam(defaultValue = "1") int page,
                                                                         @RequestParam(defaultValue = "10") int size,
                                                                         @RequestParam(defaultValue = "") String keyword
    ) {
        Page<StationResponse> stations = stationService.getStations(keyword, page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(stations));
    }

    @PostMapping()
    @Operation(tags = "stations", description = "create my stations")
    public ResponseEntity<StationResponse> createStation(@Valid @RequestBody CreateStationRequest request) {
        System.out.println(request.getProvince().getId());
        System.out.println(request.getName());
        System.out.println("abc");
        StationResponse createdStation = stationService.saveStation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStation);
    }

}
