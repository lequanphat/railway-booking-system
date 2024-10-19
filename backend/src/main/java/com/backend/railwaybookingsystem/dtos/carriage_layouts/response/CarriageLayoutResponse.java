package com.backend.railwaybookingsystem.dtos.carriage_layouts.response;

import lombok.Value;

import java.io.Serializable;
import java.util.List;

@Value
public class CarriageLayoutResponse implements Serializable {
    Long id;
    String name;
    int floors;
    int row_count;
    Boolean active;
    List<SeatDto> seats;

    @Value
    public static class SeatDto implements Serializable {
        Long id;
        int position;
        SeatTypeDto seatType;

        @Value
        public static class SeatTypeDto implements Serializable {
            Long id;
            String name;
            String code;
            double original_price_per_km;
            Boolean active;
        }
    }
}