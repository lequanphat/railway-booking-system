package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
}
