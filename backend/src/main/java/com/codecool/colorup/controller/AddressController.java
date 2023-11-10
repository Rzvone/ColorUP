package com.codecool.colorup.controller;

import com.codecool.colorup.DTOS.AddressDTO;
import com.codecool.colorup.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<String> addAddress(@PathVariable Long userId, @RequestBody AddressDTO addressDTO) {
        try {
            addressService.addAddress(userId, addressDTO.getAddress1(), addressDTO.getAddress2(), addressDTO.getCity(), addressDTO.getState(), addressDTO.getZipcode(), addressDTO.getCountry(), addressDTO.getAddressType());
            return ResponseEntity.status(HttpStatus.CREATED).body("Address added successfully");
        } catch (Exception e) {
            // Handle exception and return appropriate status
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding address: " + e.getMessage());
        }
    }

}
