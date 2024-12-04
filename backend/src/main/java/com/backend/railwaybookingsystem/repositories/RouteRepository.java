package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
}
