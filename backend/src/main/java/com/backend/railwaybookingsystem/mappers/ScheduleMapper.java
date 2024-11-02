package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.schedules.responses.GetScheduleByDateResponse;
import com.backend.railwaybookingsystem.dtos.schedules.responses.ScheduleDetailsResponse;
import com.backend.railwaybookingsystem.models.Schedule;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ScheduleMapper {
    ScheduleMapper INSTANCE = Mappers.getMapper(ScheduleMapper.class);

    List<GetScheduleByDateResponse> convertToGetScheduleByDateResponseList(List<Schedule> schedules);

    ScheduleDetailsResponse convertToScheduleDetailsResponse(Schedule schedule);
}
