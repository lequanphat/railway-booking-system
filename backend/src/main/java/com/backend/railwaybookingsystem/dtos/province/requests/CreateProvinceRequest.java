package com.backend.railwaybookingsystem.dtos.province.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProvinceRequest {
    @NotBlank
    String name;
}
