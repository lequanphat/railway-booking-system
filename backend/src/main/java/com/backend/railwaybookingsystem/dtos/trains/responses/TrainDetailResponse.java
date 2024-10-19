package com.backend.railwaybookingsystem.dtos.trains.responses;

import lombok.Value;

import java.io.Serializable;
import java.util.List;

@Value
public class TrainDetailResponse implements Serializable {
    Long id;
    String name;
    Boolean is_active;
    List<CarriageDto> carriages;
    List<SeatPriceDto> seatPrices;

    @Value
    public static class CarriageDto implements Serializable {
        Long id;
        int position;
        CarriageLayoutDto carriageLayout;

        @Value
        public static class CarriageLayoutDto implements Serializable {
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
                }
            }
        }
    }

    @Value
    public static class SeatPriceDto implements Serializable {
        Long id;
        double original_price_per_km;
        SeatTypeDto seatType;

        @Value
        public static class SeatTypeDto implements Serializable {
            Long id;
            String name;
            String description;
            String code;
            double original_price_per_km;
            Boolean active;
        }
    }
}