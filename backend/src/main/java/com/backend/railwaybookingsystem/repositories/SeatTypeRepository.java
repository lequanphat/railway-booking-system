package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeatTypeRepository extends JpaRepository<SeatType, Long> {

	SeatType findById(long id);

	Page<SeatType> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description, Pageable pageable);

}
