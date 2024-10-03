package com.backend.railwaybookingsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "provinces")
@NoArgsConstructor
@AllArgsConstructor
public class Province {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
