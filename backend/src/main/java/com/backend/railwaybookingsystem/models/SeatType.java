package com.backend.railwaybookingsystem.models;

import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.enums.UserGender;
import com.backend.railwaybookingsystem.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seat_type")
public class SeatType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String description;

	private String size;

	private Boolean active = true;
}
