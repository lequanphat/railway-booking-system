package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.person_types.responses.PersonTypesResponse;
import com.backend.railwaybookingsystem.mappers.PersonTypeMapper;
import com.backend.railwaybookingsystem.repositories.PersonTypeRepository;
import com.backend.railwaybookingsystem.services.PersonTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PersonTypeServiceImpl implements PersonTypeService {
    @Autowired
    private PersonTypeRepository personTypeRepository;

    @Override
    public List<PersonTypesResponse> getAllPersonTypes() {
        return personTypeRepository.findByParentIsNull().stream().map(PersonTypeMapper.INSTANCE::convertToPersonTypesResponse).toList();
    }
}

