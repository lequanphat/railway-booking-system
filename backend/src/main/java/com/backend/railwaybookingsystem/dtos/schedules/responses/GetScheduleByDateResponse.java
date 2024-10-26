package com.backend.railwaybookingsystem.dtos.schedules.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Schedule}
 */
@AllArgsConstructor
@Getter
public class GetScheduleByDateResponse implements Serializable {
    private final Long id;
    private final TrainDto train;

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
}