package com.codecool.colorup.model;

import com.codecool.colorup.enums.RoleType;
import com.codecool.colorup.model.Appointment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String contactNumber;
    private RoleType roleType;


    @OneToMany
    @JsonIgnore
    private List<Appointment> appointmentList;

    public void addAppointment(Appointment appointment){
        this.appointmentList.add(appointment);

    }

    public void removeAppointment(Appointment appointment){
        this.appointmentList.remove(appointment);
    }

    public List<Appointment> getAppointments(){
        return null;
    }
}
