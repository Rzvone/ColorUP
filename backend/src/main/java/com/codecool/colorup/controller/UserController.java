package com.codecool.colorup.controller;

import com.codecool.colorup.config.JwtService;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/getAllUsers")
    public List<User> getUser() {
        return userService.getUsers();
    }

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/postUser")
    public ResponseEntity<String> registerNewUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.addNewUser(user));
    }

    @PutMapping(path = "/updateUser/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        User userToUpdate = userService.getUserById(id);
        if (userToUpdate == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        userToUpdate.setFirstName(updatedUser.getFirstName());
        userToUpdate.setLastName(updatedUser.getLastName());
        userToUpdate.setEmail(updatedUser.getEmail());
        userToUpdate.setContactNumber(updatedUser.getContactNumber());

        userService.updateUser(id, userToUpdate);

        return ResponseEntity.ok("User updated successfully!");
    }


    @DeleteMapping(path = "/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
