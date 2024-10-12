package com.backend.railwaybookingsystem.dtos.carriage_layouts;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CreateCarriageLayoutRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 10, max = 150, message = "Name must be between 10 and 150 characters")
    private String name;

    @NotNull(message = "Floors is required")
    @Min(value = 1, message = "Floors must be at least 1")
    @Max(value = 4, message = "Floors must be less than or equal to 4")
    private int floors;

    private int row_count;

    @Valid
    @NotNull(message = "Layout is required")
    @Size(min = 1, message = "Layout must have at least one seat")
    private List<Long> layout;
}