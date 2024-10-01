package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


	User findByEmail(String email);

	boolean existsByEmail(String email);


	Page<User> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email, Pageable pageable);

	Page<User> findByUserRoleAndNameContainingIgnoreCaseOrEmailContainingIgnoreCase(UserRole role, String name, String email, Pageable pageable);

	@Query("SELECT u FROM User u WHERE u.userRole = :role AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
			"OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.phone) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
			"OR LOWER(u.address) LIKE LOWER(CONCAT('%', :keyword, '%')) )")
	Page<User> searchUserByFields(@Param("role") UserRole role, @Param("keyword") String keyword, Pageable pageable);

	Page<User> findByUserRole(UserRole role, Pageable pageable);
}
