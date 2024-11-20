package com.backend.railwaybookingsystem.dtos.seat_reservation;

import lombok.Data;

@Data
public class SeatReservationRequest {
    private Long scheduleId;
    private Long seatId;
    private Long carriageId;
}
