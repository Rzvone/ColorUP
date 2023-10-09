package com.codecool.colorup.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "customers")
public class Customer extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    // Define any other attributes specific to the Customer entity

    @OneToMany(mappedBy = "customer")
    private List<Appointment> appointments;

    // Constructors, getters, and setters
}
