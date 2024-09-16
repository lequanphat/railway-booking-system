package com.nhatsinh.railwaybookingsystem.security.service;

import com.nhatsinh.railwaybookingsystem.model.User;
import com.nhatsinh.railwaybookingsystem.security.dto.AuthenticatedUserDto;
import com.nhatsinh.railwaybookingsystem.security.dto.RegistrationRequest;
import com.nhatsinh.railwaybookingsystem.security.dto.RegistrationResponse;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
public interface UserService {

	User findByUsername(String username);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

}
