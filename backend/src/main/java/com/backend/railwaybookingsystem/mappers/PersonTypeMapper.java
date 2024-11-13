package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.person_types.responses.PersonTypesResponse;
import com.backend.railwaybookingsystem.models.PersonType;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PersonTypeMapper {
    PersonTypeMapper INSTANCE = Mappers.getMapper(PersonTypeMapper.class);
    PersonTypesResponse convertToPersonTypesResponse(PersonType personType);

}
