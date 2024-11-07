package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.RouteSegment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RouteSegmentRepository extends JpaRepository<RouteSegment, Long> {
    @Transactional
    void deleteByTrainId(Long trainId);

    RouteSegment getRouteSegmentByTrainIdAndStationId(Long trainId, Long stationId);

    @Query("""
            SELECT rs
            FROM RouteSegment rs
            WHERE rs.train.id = :trainId
            ORDER BY rs.distance ASC
            LIMIT 1
            """)
    RouteSegment getFirstSegmentByTrainId(Long trainId);

    @Query("""
            SELECT rs
            FROM RouteSegment rs
            WHERE rs.train.id = :trainId
            ORDER BY rs.distance DESC
            LIMIT 1
            """)
    RouteSegment getLastSegmentByTrainId(Long trainId);
}