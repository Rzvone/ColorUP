package com.codecool.colorup.controller;

import com.codecool.colorup.model.Appointment;
import com.codecool.colorup.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping(path = "/getAppointments")
    public List<Appointment> getAllAppointments(){
        return appointmentService.getAppointments();
    }

    @GetMapping(path = "/getAppointment/{id}")
        public Appointment getAppointmentById(@PathVariable Long id){
            return appointmentService.getAppointmentById(id);

    }

    @PostMapping(path = "/postAppointment/{userId}")
    public ResponseEntity<String> addAppointment(@PathVariable Long userId,@RequestBody Appointment appointment){
        appointmentService.addNewAppointment(userId,appointment);
        return ResponseEntity.ok("Appointment added successfully. ");
    }
}
