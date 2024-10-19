package com.backend.railwaybookingsystem.dtos.carriage_layouts.response;

import lombok.Value;

import java.io.Serializable;

@Value
public class CreateCarriageLayoutResponse implements Serializable {
    Long id;
    String name;
    int floors;
    int row_count;
    Boolean active;
}