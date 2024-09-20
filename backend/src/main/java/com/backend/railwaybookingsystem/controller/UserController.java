package com.backend.railwaybookingsystem.controller;

import com.backend.railwaybookingsystem.dto.users.CreateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UpdateUserRequest;
import com.backend.railwaybookingsystem.dto.users.UserResponse;
import com.backend.railwaybookingsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
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
	@Operation(tags = "User", description = "Return list of users with pagination")
	public ResponseEntity<Page<UserResponse>> getAllUsers(@RequestParam(defaultValue = "1") int page,
														  @RequestParam(defaultValue = "10") int size,
															@RequestParam(defaultValue = "") String keyword) {
		Page<UserResponse> users = userService.getUsers(page-1, size, keyword);
		return ResponseEntity.ok(users);
	}

	@PutMapping("/{id}")
	@Operation(tags = "User", description = "Update an existing user")
	public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest userRequest) {
		System.out.println("enter ->");
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
