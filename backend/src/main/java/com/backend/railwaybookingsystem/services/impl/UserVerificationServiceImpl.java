package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.models.User;
import com.backend.railwaybookingsystem.models.UserVerification;
import com.backend.railwaybookingsystem.repositories.UserVerificationRepository;
import com.backend.railwaybookingsystem.services.UserVerificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserVerificationServiceImpl implements UserVerificationService {

    @Autowired
    private UserVerificationRepository userVerificationRepository;

    @Override
    public UserVerification createUserVerification(User user, String token){
        UserVerification userVerification = new UserVerification();
        userVerification.setUser(user);
        userVerification.setToken(token);
        return userVerificationRepository.save(userVerification);
    }

    @Override
    public User validateToken(String token){
        Optional<UserVerification> userVerification = userVerificationRepository.findByToken(token);

        if(userVerification.isPresent()) {
            userVerificationRepository.delete(userVerification.get());
            return userVerification.get().getUser();
        }
        return null;
    }
}
