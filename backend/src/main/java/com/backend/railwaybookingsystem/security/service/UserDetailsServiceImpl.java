package com.backend.railwaybookingsystem.security.service;

import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.repositories.UserRepository;
import com.backend.railwaybookingsystem.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final String USERNAME_OR_PASSWORD_INVALID = "Invalid username or password.";

	@Autowired
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userId) {
		log.info("userId: {}", userId);

		final com.backend.railwaybookingsystem.models.User authenticatedUser = userRepository.findById(Long.parseLong(userId)).orElse(null);

		if (Objects.isNull(authenticatedUser)) {
			throw new UsernameNotFoundException(USERNAME_OR_PASSWORD_INVALID);
		}

		final String authenticatedEmail = authenticatedUser.getId().toString();
		final String authenticatedPassword = authenticatedUser.getPassword() != null ? authenticatedUser.getPassword() : "NOT_SET";
		final UserRole userRole = authenticatedUser.getUserRole();
		final SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole.name());

		return new User(authenticatedEmail, authenticatedPassword, Collections.singletonList(grantedAuthority));
	}
}
