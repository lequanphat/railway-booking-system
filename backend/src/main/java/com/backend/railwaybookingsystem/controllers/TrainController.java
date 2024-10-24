package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.UpdateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.UpdateTrainResponse;
import com.backend.railwaybookingsystem.services.TrainService;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class TrainController {
    @Autowired
    private TrainService trainService;

    @PostMapping("ad/trains")
    @Operation(tags = "Train", description = "Create a new train")
    public ResponseEntity<CreateTrainResponse> createTrain(@Valid @RequestBody CreateTrainRequest request) {
        CreateTrainResponse createdTrain = trainService.saveTrain(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrain);
    }

    @GetMapping("ad/trains")
    @Operation(tags = "Train", description = "get trains with pagination")
    public ResponseEntity<CustomPagination<TrainListResponse>> getTrains(@RequestParam(defaultValue = "1") int page,
                                                                         @RequestParam(defaultValue = "10") int size,
                                                                         @RequestParam(defaultValue = "") String keyword
    ) {
        Page<TrainListResponse> trains = trainService.getTrains(keyword, page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(trains));
    }

    @GetMapping("ad/trains/{id}")
    @Operation(tags = "Train", description = "get train")
    public ResponseEntity<TrainDetailResponse> getTrainById(@PathVariable Long id) {
        TrainDetailResponse train = trainService.getTrainDetailById(id);
        return ResponseEntity.ok(train);
    }

    @PutMapping("ad/trains/{id}")
    @Operation(tags = "Train", description = "update train")
    public ResponseEntity<UpdateTrainResponse> updateTrain(@PathVariable Long id, @Valid @RequestBody UpdateTrainRequest request) {
        UpdateTrainResponse train = trainService.updateTrain(id, request);
        return ResponseEntity.ok(train);
    }
}
