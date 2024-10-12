package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dtos.users.UserResponse;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping("ad/users")
	@Operation(tags = "User", description = "Create a new user")
	public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest user) {
		UserResponse createdUser = userService.saveUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@GetMapping("ad/users")
	@Operation(tags = "User", description = "Return list of users with pagination")
	public ResponseEntity<Page<UserResponse>> getAllUsers(@RequestParam(defaultValue = "1") int page,
														  @RequestParam(defaultValue = "10") int size,
															@RequestParam(defaultValue = "") String keyword,
														  @RequestParam(defaultValue = "USER" ) UserRole role
	) {
		Page<UserResponse> users = userService.getUsers(role, keyword, page-1, size);
		return ResponseEntity.ok(users);
	}

	@PutMapping("ad/users/{id}")
	@Operation(tags = "User", description = "Update an existing user")
	public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest userRequest) {
		UserResponse updatedUser = userService.updateUser(id, userRequest);
		return ResponseEntity.ok(updatedUser);
	}

	@DeleteMapping("ad/users/{id}")
	@Operation(tags = "User", description = "Delete an existing user")
	public ResponseEntity<UserResponse> deleteUser(@PathVariable Long id) {
		UserResponse deletedUser = userService.deleteUser(id);
		return ResponseEntity.ok(deletedUser);
	}

}
