package com.codecool.colorup.service;


import com.codecool.colorup.controller.UserResponse;
import com.codecool.colorup.model.Product;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/backend/src/main/resources/profilepics";

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(user->new UserResponse(user,imageToDataUrl(loadImageForUser(user)))).toList();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
    }

    public byte[] loadImageForUser(User user) {
        // Construct the image file path based on the user's ID
        String imageFileName = user.getId() + ".jpg";

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
    public String addNewUser(User user) {
        Optional<User> userOptional = userRepository
                .findByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            return "Account already exist. Please choose another one. ";
        }
        userRepository.save(user);
        return "Account saved successfully. ";
    }
    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex > 0) {
            return filename.substring(dotIndex);
        }
        return ""; // Default to empty string if no extension found
    }
    @Modifying
    @Transactional
    public User updateUser(Long id, MultipartFile file, User user) throws Exception {
        User updatedUser = userRepository.findById(id)
                .orElseThrow(() -> new Exception("User not found with ID: " + id));

        // Update user information based on the 'updatedUser' object
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setContactNumber(user.getContactNumber());

        if (file != null && !file.isEmpty()) {
            String imageFilename = updatedUser.getId() + getFileExtension(file.getOriginalFilename());
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, imageFilename);

            try {
                Files.write(fileNameAndPath, file.getBytes());
            } catch (IOException e) {
                throw new Exception("File upload failed");
            }
        }

        // Save and return the updated user
        return userRepository.save(updatedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);

    }

    public User makeProvider(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with ID " + id + " not found."));
        user.setProviderRequest(!user.isProviderRequest());
        userRepository.save(user);
        return user;
    }
    public List<User> getPendingProviders(){
        return userRepository.findAll().stream().filter(User::isProviderRequest).toList();
    }
}
