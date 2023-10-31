package com.codecool.colorup.model;

import com.codecool.colorup.enums.ServiceType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "provider_id") // This should match the actual column name in your database
    private Provider provider;

    @Column(name="duration")
    private int duration;
    @Column(name="price")
    private int price;
    // Constructors, getters, and setters
}
