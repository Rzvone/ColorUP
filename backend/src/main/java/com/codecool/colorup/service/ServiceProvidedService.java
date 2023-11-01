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
    private final ProviderService providerService;
    private final ModelMapper modelMapper;

    @Autowired
    public ServiceProvidedService(ServiceProvidedRepository repository, ProviderService providerService, ModelMapper modelMapper) {
        this.repository = repository;
        this.providerService = providerService;
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
        dto.setProviderId(serviceProvided.getProvider().getId());
        dto.setProviderImage(providerService.imageToDataUrl(providerService.loadImageForProvider(serviceProvided.getProvider())));
        return dto;
    }
}
