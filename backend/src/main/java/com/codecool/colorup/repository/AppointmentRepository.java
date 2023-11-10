package com.codecool.colorup.repository;

import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAppointmentsByUserAndProvider(User user, Provider provider);
    List<Appointment> findAppointmentsByProvider(Provider provider);
    List<Appointment> findAppointmentsByProviderAndStartDateAndEndDate(Provider provider, LocalDateTime startDate, LocalDateTime endDate);
    List<Appointment> findByProviderAndStartDateBetween(Provider provider, LocalDateTime startDate, LocalDateTime endDate);
}
