package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.seat_reservation.SeatReservationRequest;
import com.backend.railwaybookingsystem.dtos.seat_reservation.SeatReservationResponse;

import java.util.List;

public interface SeatReservationService {
    SeatReservationResponse reserveSeat(SeatReservationRequest request);
    SeatReservationResponse cancelReservation(SeatReservationRequest request);
    List<SeatReservationResponse> getAllReservationsByScheduleId(Long scheduleId);
}
