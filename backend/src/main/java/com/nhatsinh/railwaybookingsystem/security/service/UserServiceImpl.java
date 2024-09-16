package com.nhatsinh.railwaybookingsystem.security.service;

import com.nhatsinh.railwaybookingsystem.model.User;
import com.nhatsinh.railwaybookingsystem.model.UserRole;
import com.nhatsinh.railwaybookingsystem.security.dto.AuthenticatedUserDto;
import com.nhatsinh.railwaybookingsystem.security.dto.RegistrationRequest;
import com.nhatsinh.railwaybookingsystem.security.dto.RegistrationResponse;
import com.nhatsinh.railwaybookingsystem.security.mapper.UserMapper;
import com.nhatsinh.railwaybookingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private static final String REGISTRATION_SUCCESSFUL = "registration_successful";

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;


	@Override
	public User findByUsername(String username) {

		return userRepository.findByUsername(username);
	}

	@Override
	public RegistrationResponse registration(RegistrationRequest registrationRequest) {

		// userValidationService.validateUser(registrationRequest);

		final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setUserRole(UserRole.USER);

		userRepository.save(user);

		final String username = registrationRequest.getUsername();
		log.info("{} registered successfully!", username);

		return new RegistrationResponse("Đăng ký thành công !");
	}

	@Override
	public AuthenticatedUserDto findAuthenticatedUserByUsername(String username) {

		final User user = findByUsername(username);

		return UserMapper.INSTANCE.convertToAuthenticatedUserDto(user);
	}
}
