package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.services.SeatTypeService;
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
@RequestMapping("api")
public class SeatTypeController {
    @Autowired
    private SeatTypeService seatTypeService;

    @PostMapping("ad/seat-types")
    @Operation(tags = "Seat Types", description = "Create a new seat type")
    public ResponseEntity<SeatTypeResponse> createSeatType(@Valid @RequestBody CreateSeatTypeRequest request) {
        SeatTypeResponse createdSeatType = seatTypeService.saveSeatType(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSeatType);
    }

    @GetMapping("ad/seat-types")
    @Operation(tags = "Seat Types", description = "Return list of seat types with pagination")
    public ResponseEntity<CustomPagination<SeatTypeResponse>> getSeatTypes(@RequestParam(defaultValue = "1") int page,
                                                                           @RequestParam(defaultValue = "10") int size,
                                                                           @RequestParam(defaultValue = "") String keyword
    ) {
        Page<SeatTypeResponse> seatTypes = seatTypeService.getSeatTypes(keyword, page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(seatTypes));
    }

    @GetMapping("ad/seat-types/all")
    @Operation(tags = "Seat Types", description = "Return all of seat types")
    public ResponseEntity<List<SeatTypeResponse>> getAllSeatTypes(
    ) {
        List<SeatTypeResponse> allSeatTypes = seatTypeService.getAllSeatTypes();
        return ResponseEntity.ok(allSeatTypes);
    }
}
