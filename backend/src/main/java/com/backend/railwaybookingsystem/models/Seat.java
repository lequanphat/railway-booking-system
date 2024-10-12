package com.backend.railwaybookingsystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seat")
public class Seat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int position;

	@ManyToOne
	@JoinColumn(name = "seat_type_id")
	private SeatType seatType;

	@ManyToOne
	@JoinColumn(name = "carriage_layout_id")
	private CarriageLayout carriageLayout;

}
