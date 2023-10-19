package com.codecool.colorup.repository;

import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAppointmentsByUserAndProvider(User user, Provider provider);
    List<Appointment> findAppointmentsByProvider(Provider provider);
}
