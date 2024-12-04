package com.backend.railwaybookingsystem.dtos.routes;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Route}
 */
@Value
public class RouteResponse implements Serializable {
    Long id;
    String name;
}