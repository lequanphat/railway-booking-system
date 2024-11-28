package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Train;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {

    Train findById(long id);
    Page<Train> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query(value = "SELECT COUNT(t.id) AS totalTickets, " +
            "SUM(t.price) AS totalPrice, " +
            "trains.name AS train " +
            "FROM trains " +
            "JOIN schedules s ON trains.id = s.train_id " +
            "JOIN tickets t ON s.id = t.schedule_id " +
            "JOIN orders o ON t.order_id = o.id " +
            "WHERE o.created_at BETWEEN :startDate AND :endDate " +
            "GROUP BY trains.id, trains.name",
            nativeQuery = true)
    List<Object[]> getReport(@Param("startDate") LocalDateTime startDate,
                             @Param("endDate") LocalDateTime endDate);

}
