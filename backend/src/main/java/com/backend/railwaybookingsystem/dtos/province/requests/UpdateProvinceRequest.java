package com.backend.railwaybookingsystem.dtos.province.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Province}
 */
@AllArgsConstructor
@Getter
public class UpdateProvinceRequest implements Serializable {
    private final Long id;
    @NotBlank(message = "Name is required")
    private final String name;
}