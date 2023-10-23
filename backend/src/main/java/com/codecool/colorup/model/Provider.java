package com.codecool.colorup.model;

import com.codecool.colorup.enums.Role;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Provider extends User{

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "provider")
    @JsonManagedReference
    private List<Appointment> providerAppointments = new ArrayList<>();

    @OneToMany(mappedBy = "provider")
    private List<ServiceProvided> servicesProvided = new ArrayList<>();

}
