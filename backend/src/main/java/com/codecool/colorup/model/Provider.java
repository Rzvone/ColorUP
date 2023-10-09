package com.codecool.colorup.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "providers")
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    // Define any other attributes specific to the Provider entity

    @OneToMany(mappedBy = "provider")
    private List<Appointment> appointments;

    // Constructors, getters, and setters
}
