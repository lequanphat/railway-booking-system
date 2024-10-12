package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.SeatType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarriageLayoutRepository extends JpaRepository<CarriageLayout, Long> {

    Page<CarriageLayout>  findByNameContainingIgnoreCase(String name, Pageable pageable);

}
