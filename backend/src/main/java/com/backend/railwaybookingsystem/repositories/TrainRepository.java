package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Train;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {

    Train findById(long id);
    Page<Train> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
