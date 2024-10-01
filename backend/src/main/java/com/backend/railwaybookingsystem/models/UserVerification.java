package com.backend.railwaybookingsystem.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;



@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_verification")
public class UserVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(nullable = false)
    private String token;

}