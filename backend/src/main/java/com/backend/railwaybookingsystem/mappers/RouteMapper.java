package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.routes.RouteResponse;
import com.backend.railwaybookingsystem.models.Route;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RouteMapper {
    RouteMapper INSTANCE = Mappers.getMapper(RouteMapper.class);

    RouteResponse convertToRouteResponse(Route route);
}
