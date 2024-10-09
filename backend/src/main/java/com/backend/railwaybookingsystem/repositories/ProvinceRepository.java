package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Province;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Long> {
    Page<Province> findByNameContainingIgnoreCase(String searchTerm, Pageable pageable);
}
