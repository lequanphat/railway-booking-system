package com.backend.railwaybookingsystem.models;

import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.enums.UserGender;
import com.backend.railwaybookingsystem.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String password;

	private String email;

	@Enumerated(EnumType.STRING)
	private AuthProvider provider = AuthProvider.EMAIL;

	private String phone;

	private String address;

	private String avatar;

	@Enumerated(EnumType.STRING)
	private UserGender gender;

	@Enumerated(EnumType.STRING)
	private UserRole userRole;

	private Boolean is_verified = false;

	private Boolean is_deleted = false;
}
