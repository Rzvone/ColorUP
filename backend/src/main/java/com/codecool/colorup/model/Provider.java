package com.codecool.colorup.model;

import com.codecool.colorup.enums.Role;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Provider extends User{

    @OneToMany(mappedBy = "provider",fetch = FetchType.EAGER)
    private List<Appointment> appointments = new ArrayList<>();
    @OneToMany(mappedBy = "provider")
    private List<ServiceProvided> servicesProvided = new ArrayList<>();

}
