package com.codecool.colorup.service;

import com.codecool.colorup.enums.AddressType;
import com.codecool.colorup.model.Address;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService{

    private final UserService userService;
    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(UserService userService, AddressRepository addressRepository) {
        this.userService = userService;
        this.addressRepository = addressRepository;
    }

    @Override
    public void addAddress(Long userId, String address1, String address2, String city, String state, String zipcode, String country, AddressType addressType) {
        User user = userService.getUserById(userId);
        Address address = Address.builder().user(user).address1(address1).address2(address2).city(city).province(state).zipcode(zipcode).country(country).addressType(addressType).build();
        try {
            addressRepository.save(address);
        } catch (Exception e) {
            throw new RuntimeException("Error saving address", e);
        }
    }
}
