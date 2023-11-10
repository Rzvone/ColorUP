package com.codecool.colorup.controller;

import com.codecool.colorup.error.CustomErrorResponse;
import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.AppointmentService;
import com.codecool.colorup.service.ProviderService;
import com.codecool.colorup.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @GetMapping("/getAppointments/provider/{providerId}")
    public List<Appointment> getAppointmentsByProvider(@PathVariable Long providerId){
        Provider provider = providerService.getProviderById(providerId);
        return appointmentService.getAppointmentsByProvider(provider);
    }
    @CrossOrigin("*")
    @PostMapping(path = "/postAppointment/{userId}")
    public ResponseEntity<?> addAppointment(@PathVariable Long userId, @RequestBody AppointmentRequestDTO appointmentRequest) {
        try {
            appointmentService.addNewAppointment(appointmentRequest.getServiceIds(), appointmentRequest.getProviderId(), userId, appointmentRequest.getStart());
            User updatedUser = userService.getUserById(userId);
            AppointmentResponseDTO responseDTO = new AppointmentResponseDTO(updatedUser, "Appointment created successfully");
            return ResponseEntity.ok(responseDTO);
        } catch (RuntimeException e) {
            // Handle the EntityNotFoundException (or other exceptions) here
            // Create a custom error response object with status code and message
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.BAD_REQUEST, "Date not available");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            // Handle other exceptions here
            // Create a custom error response object with status code and message
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Custom error response class



    @CrossOrigin("*")
    @DeleteMapping(path = "/deleteAppointment/{appointmentId}")
    public void deleteAppointment(@PathVariable Long appointmentId){
        appointmentService.deleteAppointment(appointmentId);
    }
}
