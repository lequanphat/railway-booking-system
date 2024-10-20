package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    void deleteAllByCarriageLayout(CarriageLayout carriageLayout);
}
