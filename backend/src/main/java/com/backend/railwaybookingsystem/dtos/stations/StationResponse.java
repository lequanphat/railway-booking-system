package com.backend.railwaybookingsystem.dtos.stations;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Station}
 */
@Value
public class StationReponse implements Serializable {
    Long id;
    String name;
    ProvinceDto province;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Province}
     */
    @Value
    public static class ProvinceDto implements Serializable {
        Long id;
        String name;
    }
}