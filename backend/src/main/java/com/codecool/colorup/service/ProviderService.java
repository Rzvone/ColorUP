package com.codecool.colorup.service;

import com.codecool.colorup.enums.Role;
import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.ServiceProvided;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.ProviderRepository;
import com.codecool.colorup.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProviderService {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final UserRepository repository;
    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;

    public ProviderService(UserRepository repository, ProviderRepository providerRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.providerRepository = providerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Provider> getProviders(){return providerRepository.findAll();}
    public void MakeUserProvider(User user, List<ServiceProvided> services){
        try {
            Provider provider = new Provider();
            provider.setFirstName(user.getFirstName());
            provider.setLastName(user.getLastName());
            provider.setId(user.getId());
            provider.setEmail(user.getEmail());
            provider.setServicesProvided(services);
            provider.setRole(Role.ROLE_PROVIDER);
            provider.setPassword(passwordEncoder.encode(user.getPassword()));
            provider.setContactNumber(user.getContactNumber());
            repository.delete(user);
            providerRepository.save(provider);
        } catch (DataAccessException e){
            logger.error("Database error occurred: " + e.getMessage());
            throw new RuntimeException("A database error occurred while processing the request.");
        }catch(Exception e){
            logger.error("An unexpected error occurred: " + e.getMessage());
            throw new RuntimeException("An unexpected error occurred while processing the request.");
        }
    }
}
