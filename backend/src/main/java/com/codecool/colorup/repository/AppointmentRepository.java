package com.codecool.colorup.repository;

import com.codecool.colorup.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAppointmentsByUserId(Long userId);
}
