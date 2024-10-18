package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.RouteSegment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteSegmentRepository extends JpaRepository<RouteSegment, Long> {
    @Transactional
    void deleteByTrainId(Long trainId);
}