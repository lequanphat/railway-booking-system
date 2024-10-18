package com.backend.railwaybookingsystem.dtos.trains.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Train}
 */
@AllArgsConstructor
@Getter
public class GetTrainRouteSegmentsResponse implements Serializable {
    private final Long id;
    private final String name;
    private final Boolean is_active;
    private final RouteDto route;
    @JsonProperty("route_segments")
    private final List<RouteSegmentDto> routeSegments;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Route}
     */
    @AllArgsConstructor
    @Getter
    public static class RouteDto implements Serializable {
        private final Long id;
        private final String name;
    }

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.RouteSegment}
     */
    @AllArgsConstructor
    @Getter
    public static class RouteSegmentDto implements Serializable {
        private final Long id;
        private final StationDto station;
        private final LocalTime departure_time;
        private final LocalTime arrival_time;
        private final double distance;
        @JsonProperty("day_number")
        private final int dayNumber;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Station}
         */
        @AllArgsConstructor
        @Getter
        public static class StationDto implements Serializable {
            private final Long id;
            private final String name;
        }
    }
}