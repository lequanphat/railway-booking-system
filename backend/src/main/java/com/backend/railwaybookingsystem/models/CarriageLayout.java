package com.backend.railwaybookingsystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carriage_layout")
public class CarriageLayout {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private int floors = 1;

	private int row_count = 1;

	private Boolean active = true;

	@OneToMany(mappedBy = "carriageLayout", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Seat> seats;
}
