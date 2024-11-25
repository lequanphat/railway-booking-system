package com.backend.railwaybookingsystem.dtos.stations;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.io.Serializable;

@Data
public class CreateStationRequest implements Serializable {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters")
    String name;

    ProvinceDto province;

    @Data
    public static class ProvinceDto implements Serializable{
        int id;
    }
}