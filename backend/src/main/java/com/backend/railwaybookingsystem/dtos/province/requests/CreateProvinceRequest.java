package com.backend.railwaybookingsystem.dtos.province.requests;

import jakarta.validation.constraints.NotBlank;

public record CreateProvinceRequest(@NotBlank String name) {
}
