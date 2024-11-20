package com.backend.railwaybookingsystem.dtos.seat_reservation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatReservationResponse {
    private Long scheduleId;
    private Long seatId;
    private Long carriageId;
    private boolean isReserved;
    private Long expirationTime;
    private boolean success;
    private ActionType actionType;

    public enum ActionType {
        RESERVE,
        CANCEL
    }
}
