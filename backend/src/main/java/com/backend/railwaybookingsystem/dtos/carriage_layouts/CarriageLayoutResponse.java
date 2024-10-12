package com.backend.railwaybookingsystem.dtos.carriage_layouts;

import com.backend.railwaybookingsystem.dtos.seats.SeatResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class CarriageLayoutResponse {

    private Long id;

    private String name;


    private int floors ;

    private int row_count;

    private Boolean active;

    private List<SeatResponse> seats;
}
