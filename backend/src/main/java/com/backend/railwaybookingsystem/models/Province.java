package com.backend.railwaybookingsystem.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "provinces")
@NoArgsConstructor
@AllArgsConstructor
public class Province {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany(mappedBy = "province")
    @JsonManagedReference
    private List<Station> stations;
}
