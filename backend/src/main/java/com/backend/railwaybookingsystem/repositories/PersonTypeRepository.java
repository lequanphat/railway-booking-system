package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.PersonType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonTypeRepository extends JpaRepository<PersonType, Long> {
    List<PersonType> findByParentIsNull();
}
