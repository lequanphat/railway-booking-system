package com.backend.railwaybookingsystem.dtos.schedules.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Schedule}
 */
@AllArgsConstructor
@Getter
public class GetPassengersOfScheduleResponse implements Serializable {
    private final Long id;
    private final TrainDto train;
    private final List<TicketDto> tickets;
    private final LocalDate departureDate;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Train}
     */
    @AllArgsConstructor
    @Getter
    public static class TrainDto implements Serializable {
        private final Long id;
        private final String name;
        private final RouteDto route;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Route}
         */
        @AllArgsConstructor
        @Getter
        public static class RouteDto implements Serializable {
            private final Long id;
            private final String name;
        }
    }

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Ticket}
     */
    @AllArgsConstructor
    @Getter
    public static class TicketDto implements Serializable {
        private final Long id;
        private final String code;
        private final String seatType;
        private final String carriageType;
        private final double originalPrice;
        private final double price;
        private final String fullName;
        private final String identity;
        private final String departureStation;
        private final String arrivalStation;
        private final String departureTime;
        private final String arrivalTime;
        private final PersonTypeDto object;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.PersonType}
         */
        @AllArgsConstructor
        @Getter
        public static class PersonTypeDto implements Serializable {
            private final Long id;
            private final String name;
            private final String description;
            private final double percentage;
            private final PersonTypeDto parent;
        }
    }
}