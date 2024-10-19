package com.backend.railwaybookingsystem.dtos.trains.responses;

import lombok.Value;

import java.io.Serializable;

@Value
public class CreateTrainResponse implements Serializable {
    Long id;
    String name;
    Boolean is_active;
}