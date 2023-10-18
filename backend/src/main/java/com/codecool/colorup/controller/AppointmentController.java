package com.codecool.colorup.controller;

import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.AppointmentService;
import com.codecool.colorup.service.ProviderService;
import com.codecool.colorup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping(path = "/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final UserService userService;
    private final ProviderService providerService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, UserService userService, ProviderService providerService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.providerService = providerService;
    }

    @GetMapping(path = "/getAppointment/{id}")
        public Appointment getAppointmentById(@PathVariable Long id){
            return appointmentService.getAppointmentById(id);

    }

    @CrossOrigin("*")
    @GetMapping("/getAppointments/user/{userId}/provider/{providerId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserAndProvider(@PathVariable Long userId, @PathVariable Long providerId){
        User user = userService.getUserById(userId);
        Provider provider = providerService.getProviderById(providerId);
        return ResponseEntity.ok(appointmentService.getAppointmentsByUserAndProvider(user,provider));
    }
    @CrossOrigin("*")
    @PostMapping(path = "/postAppointment/{userId}")
    public ResponseEntity<String> addAppointment(@PathVariable Long userId,@RequestBody AppointmentRequestDTO AppointmentRequest){
        appointmentService.addNewAppointment(AppointmentRequest.getServiceIds(),AppointmentRequest.getProviderId(),userId,AppointmentRequest.getStart());
        return ResponseEntity.ok("Appointment added successfully. ");
    }
}
