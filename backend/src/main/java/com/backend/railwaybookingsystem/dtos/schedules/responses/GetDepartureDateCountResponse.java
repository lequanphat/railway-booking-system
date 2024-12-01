package com.backend.railwaybookingsystem.dtos.schedules.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GetDepartureDateCountResponse {
    private LocalDate date;
    private Long count;
}
