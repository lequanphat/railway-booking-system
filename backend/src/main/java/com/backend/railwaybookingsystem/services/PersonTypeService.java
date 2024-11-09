package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.person_types.responses.PersonTypesResponse;

import java.util.List;

public interface PersonTypeService {
    List<PersonTypesResponse> getAllPersonTypes();
}
