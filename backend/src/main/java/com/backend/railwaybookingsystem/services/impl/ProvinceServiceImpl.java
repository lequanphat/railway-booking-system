package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.ProvinceMapper;
import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.repositories.ProvinceRepository;
import com.backend.railwaybookingsystem.services.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private ProvinceRepository provineRepository;

    @Override
    public Province createProvince(CreateProvinceRequest request) {
        // unique name

        Province province = ProvinceMapper.INSTANCE.toProvince(request);
        return provineRepository.save(province);
    }

    @Override
    public List<Province> getAllProvinces() {
        return provineRepository.findAll();
    }

    @Override
    public Optional<Province> findById(Long id) {
        provineRepository.findById(id).orElseThrow(() -> new NotFoundException("Province not found"));
        return provineRepository.findById(id);
    }

    @Override
    public Province updateProvince(Long id, Province provinceDetails) {
        provineRepository.findById(id).orElseThrow(() -> new NotFoundException("Province not found"));
        provineRepository.save(provinceDetails);
        return provinceDetails;
    }

    @Override
    public void deleteProvince(Long id) {
        provineRepository.findById(id).orElseThrow(() -> new NotFoundException("Province not found"));
        provineRepository.deleteById(id);
    }

    @Override
    public Page<Province> getProvinces(String searchTerm, Pageable pageable) {
        return provineRepository.findByNameContainingIgnoreCase(searchTerm, pageable);
    }
}
