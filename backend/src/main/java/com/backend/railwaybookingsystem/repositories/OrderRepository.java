package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findById(long id);

    Page<Order> findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCaseOrFullNameNotContainingIgnoreCase(String email, String fullName, String phone, Pageable pageable);

    Page<Order> findByUserId(Long userId, Pageable pageable);

    @Query(value = "SELECT COUNT(t.id) AS totalTickets, " +
            "SUM(t.price) AS totalPrice, " +
            "CAST(o.created_at AS DATE) AS reportDate " +
            "FROM orders o " +
            "JOIN tickets t ON t.order_id = o.id " +
            "WHERE o.created_at BETWEEN :startDate AND :endDate " +
            "GROUP BY CAST(o.created_at AS DATE)",
            nativeQuery = true)
    List<Object[]> getReport(@Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate);

    int countByUserIsNotNullAndCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    int countByUserIsNullAndCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

}
