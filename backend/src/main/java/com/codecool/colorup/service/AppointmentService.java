package com.codecool.colorup.service;

import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.AppointmentRepository;
import com.codecool.colorup.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }


    @Transactional
    public void addNewAppointment(Long userId, Appointment appointment) {
        User user = User.builder()
                .id(userId)
                .firstName("John")
                .lastName("Doe")
                .email("jim@gmail.com")
                .password("1234")
                .contactNumber("123456789")
                .build();
        appointment.setUser(user);
        appointmentRepository.save(appointment);
    }

}
