package com.backend.railwaybookingsystem.dtos.schedules.responses;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Schedule}
 */
@Value
public class ScheduleDetailsResponse implements Serializable {
    Long id;
    TrainDto train;
    List<TicketDto> tickets;
    LocalDate departureDate;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Train}
     */
    @Value
    public static class TrainDto implements Serializable {
        Long id;
        String name;
        Boolean is_active;
        List<CarriageDto> carriages;
        List<SeatPriceDto> seatPrices;
        RouteDto route;
        List<RouteSegmentDto> routeSegments;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Carriage}
         */
        @Value
        public static class CarriageDto implements Serializable {
            Long id;
            int position;
            CarriageLayoutDto carriageLayout;

            /**
             * DTO for {@link com.backend.railwaybookingsystem.models.CarriageLayout}
             */
            @Value
            public static class CarriageLayoutDto implements Serializable {
                Long id;
                String name;
                int floors;
                int row_count;
                Boolean active;
                List<SeatDto> seats;

                /**
                 * DTO for {@link com.backend.railwaybookingsystem.models.Seat}
                 */
                @Value
                public static class SeatDto implements Serializable {
                    Long id;
                    int position;
                    SeatTypeDto seatType;

                    /**
                     * DTO for {@link com.backend.railwaybookingsystem.models.SeatType}
                     */
                    @Value
                    public static class SeatTypeDto implements Serializable {
                        Long id;
                    }
                }
            }
        }

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.SeatPrice}
         */
        @Value
        public static class SeatPriceDto implements Serializable {
            Long id;
            double original_price_per_km;
            SeatTypeDto seatType;

            /**
             * DTO for {@link com.backend.railwaybookingsystem.models.SeatType}
             */
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

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Route}
         */
        @Value
        public static class RouteDto implements Serializable {
            Long id;
            String name;
        }

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.RouteSegment}
         */
        @Value
        public static class RouteSegmentDto implements Serializable {
            Long id;
            StationDto station;
            LocalTime departure_time;
            LocalTime arrival_time;
            double distance;
            int dayNumber;

            /**
             * DTO for {@link com.backend.railwaybookingsystem.models.Station}
             */
            @Value
            public static class StationDto implements Serializable {
                Long id;
                String name;
            }
        }
    }

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Ticket}
     */
    @Value
    public static class TicketDto implements Serializable {
        Long id;
        SeatDto seat;
        CarriageDto carriage;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Seat}
         */
        @Value
        public static class SeatDto implements Serializable {
            Long id;
            int position;
        }

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Carriage}
         */
        @Value
        public static class CarriageDto implements Serializable {
            Long id;
            int position;
        }
    }
}