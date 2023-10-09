package com.codecool.colorup.service;

import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.AppointmentRepository;
import com.codecool.colorup.repository.UserRepository;
import jakarta.persistence.Entity;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    @Transactional
    public void addNewAppointment(List<Long> serviceIds, Long providerId, Long userId, LocalDateTime start) {

    }
}
