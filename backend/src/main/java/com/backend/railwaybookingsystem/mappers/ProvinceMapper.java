package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.province.responses.GetAllProvinceResponse;
import com.backend.railwaybookingsystem.models.Province;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProvinceMapper {
    ProvinceMapper INSTANCE = Mappers.getMapper(ProvinceMapper.class);

    Province toProvince(CreateProvinceRequest request);

    List<GetAllProvinceResponse> toGetAllProvinceResponseList(List<Province> provinces);
}
