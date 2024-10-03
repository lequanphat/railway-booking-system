package com.backend.railwaybookingsystem.repository;

import com.backend.railwaybookingsystem.model.Province;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvineRepository extends JpaRepository<Province, Long> {

    Page<Province> findByNameContainingIgnoreCase(String searchTerm, Pageable pageable);
}
