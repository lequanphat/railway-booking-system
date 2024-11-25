package com.backend.railwaybookingsystem.dtos.provinces;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Province}
 */
@Value
public class ProvinceResponse implements Serializable {
    int id;
    String name;
}