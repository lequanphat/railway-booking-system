package com.backend.railwaybookingsystem.dtos.seat_types;

import com.backend.railwaybookingsystem.enums.UserGender;
import com.backend.railwaybookingsystem.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class SeatTypeResponse {

    private Long id;

    private String name;

    private String description;

    private String code;

    private Boolean active;

    private double original_price_per_km;
}
