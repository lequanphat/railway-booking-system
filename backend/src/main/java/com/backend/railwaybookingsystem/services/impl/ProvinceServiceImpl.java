package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.province.requests.UpdateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.provinces.ProvinceResponse;
import com.backend.railwaybookingsystem.exceptions.DuplicatedException;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.ProvinceMapper;
import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.repositories.ProvinceRepository;
import com.backend.railwaybookingsystem.services.ProvinceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    private final ProvinceRepository provinceRepository;

    public ProvinceServiceImpl(ProvinceRepository provinceRepository) {
        this.provinceRepository = provinceRepository;
    }

    @Override
    public Province createProvince(CreateProvinceRequest request) {
        if (provinceRepository.existsByName(request.getName())) {
            throw new DuplicatedException("Province with name already exists");
        }
        Province province = ProvinceMapper.INSTANCE.toProvince(request);
        return provinceRepository.save(province);
    }

    @Override
    public List<Province> getAllProvinces() {
        return provinceRepository.findAll();
    }

    @Override
    public Optional<Province> findById(Long id) {
        return provinceRepository.findById(id)
                .map(Optional::of)
                .orElseThrow(() -> new NotFoundException("Province not found"));
    }

    @Override
    public Province updateProvince(Long id, UpdateProvinceRequest request) {
        Province existingProvince = provinceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Province not found"));

        if (provinceRepository.existsByNameAndIdNot(request.getName(), id)) {
            throw new DuplicatedException("Province with name already exists");
        }

        existingProvince.setName(request.getName());
        return provinceRepository.save(existingProvince);
    }

    @Override
    public void deleteProvince(Long id) {
        if (!provinceRepository.existsById(id)) {
            throw new NotFoundException("Province not found");
        }
        provinceRepository.deleteById(id);
    }

    @Override
    public Page<Province> getProvinces(String searchTerm, Pageable pageable) {
        return provinceRepository.findByNameContainingIgnoreCase(searchTerm, pageable);
    }

    //Dan
    public List<ProvinceResponse> getOnlyProvinces() {
        return ProvinceMapper.INSTANCE.toProvinceResponses(provinceRepository.findAll());
    }



}
