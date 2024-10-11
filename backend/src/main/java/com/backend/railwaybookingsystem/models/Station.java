package com.backend.railwaybookingsystem.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "stations")
@NoArgsConstructor
@AllArgsConstructor
public class Station {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    @JsonBackReference
    private Province province;
}
