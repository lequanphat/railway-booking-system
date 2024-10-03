package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dto.province.request.CreateProvinceRequest;
import com.backend.railwaybookingsystem.model.Province;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProvinceMapper {
    ProvinceMapper INSTANCE = Mappers.getMapper(ProvinceMapper.class);
    Province toProvince(CreateProvinceRequest createProvinceRequest);
}
