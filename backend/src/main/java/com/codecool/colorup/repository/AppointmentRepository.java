package com.codecool.colorup.repository;

import com.codecool.colorup.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
//    @Query("SELECT u from User u WHERE u.email=?1")
    @Query("SELECT a from Appointment a WHERE a.id=?1")
    List<Appointment> findAppointmentsByUserId(Long userId);
}
