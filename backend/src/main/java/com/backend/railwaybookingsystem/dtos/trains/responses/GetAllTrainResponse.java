package com.backend.railwaybookingsystem.dtos.trains.responses;

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
public class GetAllTrainResponse implements Serializable {
    private final Long id;
    private final String name;
    private final Boolean is_active;
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