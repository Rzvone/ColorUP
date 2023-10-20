package com.codecool.colorup.model;

import com.codecool.colorup.enums.ServiceType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity
@Table(name = "ServiceProvided")
public class ServiceProvided {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @ManyToMany(mappedBy = "services")
    @JsonBackReference
    private List<Appointment> appointments;

    @ManyToOne
    @JoinColumn(name = "provider_id") // This should match the actual column name in your database
    private Provider provider;

    @Column(name="duration")
    private int duration;
    // Constructors, getters, and setters
}
