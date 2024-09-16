package com.nhatsinh.railwaybookingsystem.controller;

import com.nhatsinh.railwaybookingsystem.dto.users.CreateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.nhatsinh.railwaybookingsystem.dto.users.UserResponse;
import com.nhatsinh.railwaybookingsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/users")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping()
	@Operation(tags = "User", description = "Create a new user")
	public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest user) {
		UserResponse createdUser = userService.saveUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@GetMapping()
	@Operation(tags = "User", description = "Return all users")
	public ResponseEntity<List<UserResponse>> getAllUsers() {
		List<UserResponse> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@PutMapping("/{id}")
	@Operation(tags = "User", description = "Update an existing user")
	public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest userRequest) {
		UserResponse updatedUser = userService.updateUser(id, userRequest);
		return ResponseEntity.ok(updatedUser);
	}

	@DeleteMapping("/{id}")
	@Operation(tags = "User", description = "Delete an existing user")
	public ResponseEntity<UserResponse> deleteUser(@PathVariable Long id) {
		UserResponse deletedUser = userService.deleteUser(id);
		return ResponseEntity.ok(deletedUser);
	}

}
