package com.codecool.colorup.controller;

import com.codecool.colorup.DTOS.ServiceProvidedDTO;
import com.codecool.colorup.enums.ServiceType;
import com.codecool.colorup.error.CustomErrorResponse;
import com.codecool.colorup.model.ServiceProvided;
import com.codecool.colorup.service.ServiceProvidedService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceProvidedController {
    private final ServiceProvidedService serviceProvidedService;

    @Autowired
    public ServiceProvidedController(ServiceProvidedService serviceProvidedService) {
        this.serviceProvidedService = serviceProvidedService;
    }

    @CrossOrigin("*")
    @GetMapping("/getServices")
    public ResponseEntity<?> getAllServices() {
        try {
            List<ServiceProvidedDTO> serviceDTOs = serviceProvidedService.getAllServiceProvidedDTOs();
            return ResponseEntity.ok(serviceDTOs);
        } catch (EntityNotFoundException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND, "User or Provider not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @CrossOrigin("*")
    @GetMapping("/getServices/{serviceType}")
    public ResponseEntity<?> getServicesByType(@PathVariable ServiceType serviceType) {
        try {
            List<ServiceProvidedDTO> serviceDTOs = serviceProvidedService.getServiceProvidedByServiceType(serviceType);
            return ResponseEntity.ok(serviceDTOs);
        } catch (EntityNotFoundException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND, "User or Provider not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
