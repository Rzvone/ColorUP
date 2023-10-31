package com.codecool.colorup.service;

import com.codecool.colorup.DTOS.ServiceProvidedDTO;
import com.codecool.colorup.model.ServiceProvided;
import com.codecool.colorup.repository.ServiceProvidedRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceProvidedService {
    private final ServiceProvidedRepository repository;
    private final ModelMapper modelMapper;

    @Autowired
    public ServiceProvidedService(ServiceProvidedRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    public List<ServiceProvidedDTO> getAllServiceProvidedDTOs() {
        List<ServiceProvided> serviceProvidedList = repository.findAll();
        List<ServiceProvidedDTO> serviceProvidedDTOs = serviceProvidedList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return serviceProvidedDTOs;
    }
    private ServiceProvidedDTO convertToDTO(ServiceProvided serviceProvided) {
        ServiceProvidedDTO dto = modelMapper.map(serviceProvided, ServiceProvidedDTO.class);
        dto.setFirstName(serviceProvided.getProvider().getFirstName());
        dto.setLastName(serviceProvided.getProvider().getLastName());
        return dto;
    }
}
