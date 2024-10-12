package com.backend.railwaybookingsystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seat_price")
public class SeatPrice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private double original_price_per_km;

	@ManyToOne
	@JoinColumn(name = "seat_type_id")
	private SeatType seatType;

	@ManyToOne
	@JoinColumn(name = "train_id")
	private Train train;

}
