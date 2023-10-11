package com.codecool.colorup.model;

import com.codecool.colorup.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@DiscriminatorValue("PROVIDER")
@Table(name = "providers")
public class Provider extends User{

    @OneToMany(mappedBy = "provider")
    private List<ServiceProvided> servicesProvided = new ArrayList<>();

    // Constructors, getters, and setters
}
