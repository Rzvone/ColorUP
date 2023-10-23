package com.codecool.colorup.service;

import com.codecool.colorup.controller.UserResponse;
import com.codecool.colorup.enums.Role;
import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.ServiceProvided;
import com.codecool.colorup.model.User;
import com.codecool.colorup.provider.ProviderDTO;
import com.codecool.colorup.provider.ProviderResponse;
import com.codecool.colorup.repository.ProviderRepository;
import com.codecool.colorup.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
@Service
public class ProviderService {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final UserRepository repository;
    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/backend/src/main/resources/profilepics";

    public ProviderService(UserRepository repository, ProviderRepository providerRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.providerRepository = providerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Provider getProviderById(Long id){
        return providerRepository.findById(id).orElseThrow(() ->new EntityNotFoundException("Provider not found"));
    }
    public List<ProviderResponse> getProviders(){
        return providerRepository.findAll().stream().map(provider -> ProviderResponse.builder().provider(provider).image(imageToDataUrl(loadImageForProvider(provider))).build()).toList();
    }
    public ProviderResponse getProvider(Long id){
        Provider provider = providerRepository.findById(id).orElse(null);
        return new ProviderResponse(provider,imageToDataUrl(loadImageForProvider(provider)));
    }

    public List<ProviderDTO> getProvidersPerAppointment(List<Long> providerIds){
        List<ProviderDTO> providers = new ArrayList<>();
        for(Long id : providerIds){
            Provider provider = providerRepository.findById(id).orElse(null);
            providers.add(new ProviderDTO(provider.getFirstName(),provider.getLastName(),imageToDataUrl(loadImageForProvider(provider))));
        }
        return providers;
    }
    public byte[] loadImageForProvider(Provider provider) {
        // Construct the image file path based on the user's ID
        String imageFileName = provider.getId() + ".jpg";

        // Combine the image directory and the image file name to get the full path
        Path imagePath = Paths.get(UPLOAD_DIRECTORY, imageFileName);

        if (Files.exists(imagePath)) {
            try {
                // Read the image file into a byte array
                return Files.readAllBytes(imagePath);
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception as needed
                return new byte[0];  // Return an empty byte array on error
            }
        } else {
            // Handle the case where the image file doesn't exist
            return new byte[0];  // Return an empty byte array when the file doesn't exist
        }
    }
    public String imageToDataUrl(byte[] image) {
        if (image == null || image.length == 0) {
            return ""; // Return an empty string if the byte array is empty or null
        } else {
            String base64Image = Base64.getEncoder().encodeToString(image);
            return "data:image/jpeg;base64," + base64Image;
        }
    }
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
