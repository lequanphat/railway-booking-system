package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.seat_reservation.SeatReservationRequest;
import com.backend.railwaybookingsystem.dtos.seat_reservation.SeatReservationResponse;
import com.backend.railwaybookingsystem.services.SeatReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/seats")
public class SeatReservationController {

    @Autowired
    private SeatReservationService seatReservationService;

    @PostMapping("/reserve")
    public ResponseEntity<SeatReservationResponse> reserveSeat(@RequestBody SeatReservationRequest request) {
        var response = seatReservationService.reserveSeat(request);
        return response.isSuccess() ? ResponseEntity.ok(response) : ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<SeatReservationResponse> cancelReservation(@RequestBody SeatReservationRequest request) {
        var response = seatReservationService.cancelReservation(request);
        return response.isSuccess() ? ResponseEntity.ok(response) : ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}
