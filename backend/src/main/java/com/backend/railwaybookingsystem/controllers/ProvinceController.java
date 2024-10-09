package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.common.CustomPagination;
import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.services.ProvinceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/public/provinces")
public class ProvinceController {
    @Autowired
    private ProvinceService provinceService;

    @GetMapping()
    public ResponseEntity<List<Province>> getAllProvinces() {
        List<Province> provinces = provinceService.getAllProvinces();
        return ResponseEntity.ok(provinces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Province> getProvinceById(@PathVariable Long id) {
        Optional<Province> province = provinceService.findById(id);
        return ResponseEntity.ok(province.get());
    }

    @PostMapping()
    public ResponseEntity<Province> createProvince(@RequestBody @Valid CreateProvinceRequest request) {
        Province createdProvince = provinceService.createProvince(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProvince);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Province> updateProvince(@PathVariable Long id, @RequestBody Province province) {
        Province updatedProvince = provinceService.updateProvince(id, province);
        return ResponseEntity.ok(updatedProvince);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Province> deleteProvince(@PathVariable Long id) {
        provinceService.deleteProvince(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public CustomPagination<Province> getProvinces(@RequestParam(defaultValue = "") String searchTerm,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        Page<Province> provinces = provinceService.getProvinces(searchTerm, PageRequest.of(page, size));
        return new CustomPagination<>(provinces);
    }
}
