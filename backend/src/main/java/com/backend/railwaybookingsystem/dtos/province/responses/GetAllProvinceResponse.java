package com.backend.railwaybookingsystem.dtos.province.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Province}
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GetAllProvinceResponse {
    private Long id;
    private String name;
    private List<StationDto> stations;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Station}
     */
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class StationDto {
        private Long id;
        private String name;
    }
}