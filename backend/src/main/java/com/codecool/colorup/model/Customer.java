package com.codecool.colorup.model;

import com.codecool.colorup.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "customers")
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends User{
    // Define any other attributes specific to the Customer entity

    @OneToMany(mappedBy = "customer")
    private List<Appointment> appointments = new ArrayList<>();


    // Constructors, getters, and setters
}
