package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import com.backend.railwaybookingsystem.models.SeatType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    void deleteAllByCarriageLayout(CarriageLayout carriageLayout);

    @Query("SELECT s.seatType FROM Seat s WHERE s.id = :seatId")
    SeatType findSeatTypeBySeatId(Long seatId);
}
