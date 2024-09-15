package com.farukgenc.boilerplate.springboot.controller;

import com.farukgenc.boilerplate.springboot.dto.users.CreateUserRequest;
import com.farukgenc.boilerplate.springboot.dto.users.UpdateUserRequest;
import com.farukgenc.boilerplate.springboot.dto.users.UserResponse;
import com.farukgenc.boilerplate.springboot.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
@RestController
@RequestMapping("api/admin/users")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping()
	@Operation(tags = "Create user", description = "Create a new user")
	public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest user) {
		UserResponse createdUser = userService.saveUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@GetMapping()
	@Operation(tags = "Get users", description = "Return all users")
	public ResponseEntity<List<UserResponse>> getAllUsers() {
		List<UserResponse> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@PutMapping("/{id}")
	@Operation(tags = "Update user", description = "Update an existing user")
	public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest userRequest) {
		try {
			UserResponse updatedUser = userService.updateUser(id, userRequest);
			return ResponseEntity.ok(updatedUser);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	@Operation(tags = "Delete user", description = "Delete an existing user")
	public ResponseEntity<UserResponse> deleteUser(@PathVariable Long id) {
		try {
			UserResponse deletedUser = userService.deleteUser(id);
			return ResponseEntity.ok(deletedUser);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

}
