package com.backend.railwaybookingsystem.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RefreshTokenMapper {
    RefreshTokenMapper INSTANCE = Mappers.getMapper(RefreshTokenMapper.class);
}
