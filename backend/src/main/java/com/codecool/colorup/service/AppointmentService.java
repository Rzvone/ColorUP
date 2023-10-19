package com.codecool.colorup.service;

import com.codecool.colorup.enums.AppointmentStatus;
import com.codecool.colorup.enums.ServiceType;
import com.codecool.colorup.model.*;
import com.codecool.colorup.repository.AppointmentRepository;
import com.codecool.colorup.repository.ProviderRepository;
import com.codecool.colorup.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, ProviderRepository providerRepository,  UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.providerRepository = providerRepository;
        this.userRepository = userRepository;
    }



    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    public List<Appointment> getAppointmentsByUserAndProvider(User user, Provider provider){
        return appointmentRepository.findAppointmentsByUserAndProvider(user,provider);
    }
    public List<Appointment> getAppointmentsByProvider(Provider provider){
        return appointmentRepository.findAppointmentsByProvider(provider);
    }
    @Transactional
    public void addNewAppointment(List<Long> serviceIds, long providerId, long customerId, String startDate) {
        // Retrieve the provider and customer objects based on their IDs
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new EntityNotFoundException("Provider not found"));
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);

        // Create a list of ServiceProvided objects based on the given service IDs
        List<ServiceProvided> services = provider.getServicesProvided()
                .stream()
                .filter(serviceProvided -> serviceIds.contains(serviceProvided.getId()))
                .collect(Collectors.toList());

        // Create a new Appointment object and set its attributes
        Appointment appointment = new Appointment();
        appointment.setStartDate(start);
        appointment.setEndDate(start.plusMinutes(
                services.stream().mapToLong(ServiceProvided::getDuration).sum()
        ));
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setProvider(provider);
        appointment.setUser(customer);
        appointment.setServices(services);


        // Save the appointment in the repository
        appointmentRepository.save(appointment);
    }


}
