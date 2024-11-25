package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.province.requests.UpdateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.provinces.ProvinceResponse;
import com.backend.railwaybookingsystem.models.Province;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProvinceService {
    Province createProvince(CreateProvinceRequest province);
    List<Province> getAllProvinces();
    Optional<Province> findById(Long id);
    Province updateProvince(Long id, UpdateProvinceRequest request);
    void deleteProvince(Long id);
    Page<Province> getProvinces(String searchTerm, Pageable pageable);

    //Dan
    List<ProvinceResponse> getOnlyProvinces();

}
