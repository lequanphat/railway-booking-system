package com.backend.railwaybookingsystem.dtos.trains.responses;

import lombok.Value;
import java.io.Serializable;
import java.util.List;

@Value
public class TrainListResponse implements Serializable {
    Long id;
    String name;
    RouteDto route;
    Boolean is_active;
    List<CarriageDto> carriages;

    @Value
    public static class RouteDto implements Serializable {
        Long id;
        String name;
    }

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
            }
        }
    }
}