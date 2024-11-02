package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.SeatPrice;
import com.backend.railwaybookingsystem.models.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatPriceRepository extends JpaRepository<SeatPrice, Long> {

    List<SeatPrice> findByTrain(Train train);

    SeatPrice findByTrainIdAndSeatTypeId(Long trainId, Long seatTypeId);



}
