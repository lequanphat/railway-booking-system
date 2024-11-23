package com.backend.railwaybookingsystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Entity
@Table(name = "person_types")
@NoArgsConstructor
@AllArgsConstructor
public class PersonType {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private double percentage;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private PersonType parent;

    @OneToMany(mappedBy = "parent")
    private List<PersonType> children;

}
