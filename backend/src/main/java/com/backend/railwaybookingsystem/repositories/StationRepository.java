package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Province;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.models.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
   Page<Station> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
