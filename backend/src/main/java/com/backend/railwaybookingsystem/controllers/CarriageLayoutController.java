package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.services.CarriageLayoutService;
import com.backend.railwaybookingsystem.services.SeatTypeService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class CarriageLayoutController {
	@Autowired
	private CarriageLayoutService carriageLayoutService;

	@PostMapping("ad/carriage-layouts")
	@Operation(tags = "Carriage Layout", description = "Create a new carriage layout")
	public ResponseEntity<CarriageLayoutResponse> createCarriageLayout(@Valid @RequestBody CreateCarriageLayoutRequest request) {

		CarriageLayoutResponse createdCarriageLayout = carriageLayoutService.saveCarriageLayout(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdCarriageLayout);
	}

	@GetMapping("ad/carriage-layouts")
	@Operation(tags = "Carriage Layout", description = "get carriage laypout")
	public ResponseEntity<Page<CarriageLayoutResponse>> getCarriageLayouts(@RequestParam(defaultValue = "1") int page,
																		   @RequestParam(defaultValue = "10") int size,
																		   @RequestParam(defaultValue = "") String keyword
																		   ) {
		Page<CarriageLayoutResponse> carriageLayouts =carriageLayoutService.getCarriageLayouts(keyword, page-1, size);
		return ResponseEntity.ok(carriageLayouts);
	}

	@GetMapping("ad/carriage-layouts/{id}")
	@Operation(tags = "Carriage Layout", description = "get carriage laypout")
	public ResponseEntity<CarriageLayoutResponse> getCarriageLayout(@PathVariable Long id) {
		CarriageLayoutResponse carriageLayout =carriageLayoutService.getCarriageLayoutById(id);
		return ResponseEntity.status(HttpStatus.CREATED).body(carriageLayout);
	}
}
