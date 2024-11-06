package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Order;
import com.backend.railwaybookingsystem.models.Train;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCaseOrFullNameNotContainingIgnoreCase(String email, String fullName, String phone, Pageable pageable);
}
