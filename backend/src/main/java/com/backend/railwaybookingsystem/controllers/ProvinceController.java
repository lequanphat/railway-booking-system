package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.province.requests.UpdateProvinceRequest;
import com.backend.railwaybookingsystem.dtos.stations.StationResponse;
import com.backend.railwaybookingsystem.services.StationService;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import com.backend.railwaybookingsystem.dtos.province.requests.CreateProvinceRequest;
import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.services.ProvinceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//Dan
import com.backend.railwaybookingsystem.dtos.provinces.ProvinceResponse;

import java.util.List;

@RestController
@RequestMapping("api/public/provinces")
@Tag(name = "Provinces", description = "APIs for managing provinces")
public class ProvinceController {

    private final ProvinceService provinceService;

    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    @GetMapping()
    public ResponseEntity<List<Province>> getAllProvinces() {
        List<Province> provinces = provinceService.getAllProvinces();
        return ResponseEntity.ok(
                provinces.stream().filter(
                        province -> province.getStations().size() > 0F
                ).toList()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Province> getProvinceById(@PathVariable Long id) {
        return provinceService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping()
    public ResponseEntity<Province> createProvince(@RequestBody @Valid CreateProvinceRequest request) {
        Province createdProvince = provinceService.createProvince(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProvince);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Province> updateProvince(@PathVariable Long id, @Valid @RequestBody UpdateProvinceRequest request) {
        Province updatedProvince = provinceService.updateProvince(id, request);
        return ResponseEntity.ok(updatedProvince);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Province> deleteProvince(@PathVariable Long id) {
        provinceService.deleteProvince(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPagination<Province>> getProvinces(@RequestParam(defaultValue = "") String searchTerm,
                                                                   @RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "10") int size) {
        Page<Province> provinces = provinceService.getProvinces(searchTerm, PageRequest.of(page, size));
        return ResponseEntity.ok(new CustomPagination<>(provinces));
    }

//    Dan (chỉ lấy province, không lấy station)
    @GetMapping("/getProvince")
    public ResponseEntity<List<ProvinceResponse>> getOnlyProvinces() {
        List<ProvinceResponse> provinces = provinceService.getOnlyProvinces();
        return ResponseEntity.ok(
                provinces.stream().toList()
        );
    }
}
