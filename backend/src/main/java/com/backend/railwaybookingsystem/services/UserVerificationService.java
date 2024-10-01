package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.models.UserVerification;


public interface UserVerificationService {

    UserVerification createUserVerification(User user, String token);
    Boolean validateToken(User user, String token);
}
