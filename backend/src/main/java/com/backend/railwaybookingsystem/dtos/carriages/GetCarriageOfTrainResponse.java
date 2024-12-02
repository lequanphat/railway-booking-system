package com.backend.railwaybookingsystem.dtos.carriages;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Carriage}
 */
@AllArgsConstructor
@Getter
public class GetCarriageOfTrainResponse implements Serializable {
    private final Long id;
    private final int position;
    private final String carriageLayoutName;
    private final Boolean carriageLayoutActive;
}