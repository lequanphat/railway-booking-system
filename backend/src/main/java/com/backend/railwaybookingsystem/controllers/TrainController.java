package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.trains.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.TrainResponse;
import com.backend.railwaybookingsystem.services.CarriageLayoutService;
import com.backend.railwaybookingsystem.services.TrainService;
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
	public ResponseEntity<TrainResponse> createTrain(@Valid @RequestBody CreateTrainRequest request) {

		TrainResponse createdTrain = trainService.saveTrain(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdTrain);
	}

	@GetMapping("ad/trains")
	@Operation(tags = "Train", description = "get trains with pagination")
	public ResponseEntity<Page<TrainResponse>> getTrains(@RequestParam(defaultValue = "1") int page,
																		   @RequestParam(defaultValue = "10") int size,
																		   @RequestParam(defaultValue = "") String keyword
																		   ) {
		Page<TrainResponse> trains =trainService.getTrains(keyword, page-1, size);
		return ResponseEntity.ok(trains);
	}

	@GetMapping("ad/trains/{id}")
	@Operation(tags = "Train", description = "get train")
	public ResponseEntity<TrainResponse> getTrainById(@PathVariable Long id) {
		TrainResponse train = trainService.getTrainById(id);
		return ResponseEntity.ok(train);
	}
}
