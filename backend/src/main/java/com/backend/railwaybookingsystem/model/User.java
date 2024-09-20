package com.backend.railwaybookingsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "USERS")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(unique = true)
	private String username;

	private String password;

	private String email;

	@Enumerated(EnumType.STRING)
	private UserRole userRole;
}
