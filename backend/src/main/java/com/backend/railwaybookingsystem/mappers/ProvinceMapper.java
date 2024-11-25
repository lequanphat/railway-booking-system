package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.provinces.ProvinceResponse;
import com.backend.railwaybookingsystem.dtos.stations.StationResponse;
import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.models.Station;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProvinceMapper {
    ProvinceMapper INSTANCE = Mappers.getMapper(ProvinceMapper.class);

    Province toProvince(CreateProvinceRequest request);

    // destination func_name(source)
    ProvinceResponse toProvinceResponse(Province province);
    List<ProvinceResponse> toProvinceResponses(List<Province> provinces);


}
