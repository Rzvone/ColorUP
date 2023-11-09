package com.codecool.colorup.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class DisabledTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

    private LocalDateTime disabledStart;

    private LocalDateTime disabledEnd;

    // Getters and setters
}
