package com.codecool.colorup.repository;

import com.codecool.colorup.enums.ServiceType;
import com.codecool.colorup.model.ServiceProvided;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceProvidedRepository extends JpaRepository<ServiceProvided,Long> {
    List<ServiceProvided> getServiceProvidedByServiceType(ServiceType serviceType);
}
