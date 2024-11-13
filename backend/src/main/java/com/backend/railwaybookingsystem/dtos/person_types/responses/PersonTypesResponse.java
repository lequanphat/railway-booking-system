package com.backend.railwaybookingsystem.dtos.person_types.responses;

import lombok.Value;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.PersonType}
 */
@Value
public class PersonTypesResponse implements Serializable {
    Long id;
    String name;
    double percentage;
    List<PersonTypeDto> children;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.PersonType}
     */
    @Value
    public static class PersonTypeDto implements Serializable {
        Long id;
        String name;
        double percentage;
    }
}