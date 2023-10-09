package com.codecool.colorup.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "ServiceProvided")
public class ServiceProvided {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Other attributes specific to ServiceProvided

    @ManyToOne
    @JoinColumn(name = "appointment_id") // This should match the actual column name in your database
    private Appointment appointment;

    // Constructors, getters, and setters
}
