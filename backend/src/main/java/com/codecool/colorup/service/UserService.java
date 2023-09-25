package com.codecool.colorup.service;


import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public void addNewUser(User user){
        Optional<User> userOptional = userRepository
                .findUserByEmail(user.getEmail());
        if(userOptional.isPresent()){
            throw new IllegalStateException("Email has already been taken. Please choose another one.");
        }
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(Long userId, String firstName, String lastName, String email, String password, String contactNumber){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new IllegalStateException("User with ID " + userId + "does not exists. "));
        if (firstName != null && !firstName.isEmpty() && !Objects.equals(user.getFirstName(), firstName)) {
            user.setFirstName(firstName);
        }
        if (email != null && !email.isEmpty() && !Objects.equals(user.getEmail(), email)) {
            Optional<User> studentOptional = userRepository
                    .findUserByEmail(email);
            if (studentOptional.isPresent()) {
                throw new IllegalStateException("Email already taken. Please choose another one. ");
            }
            user.setEmail(email);
        }
    }
}
