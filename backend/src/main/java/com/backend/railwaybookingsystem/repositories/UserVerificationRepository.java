package com.backend.railwaybookingsystem.repositories;

import com.backend.railwaybookingsystem.models.RefreshToken;
import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.models.UserVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVerificationRepository extends JpaRepository<UserVerification, Long> {

        Optional<UserVerification> findByUserAndToken(User user, String token);
}
