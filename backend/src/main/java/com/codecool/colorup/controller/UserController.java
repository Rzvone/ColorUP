package com.codecool.colorup.controller;

import com.codecool.colorup.config.JwtService;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PutMapping("/makeProvider/{id}")
    public User makeProvider(@PathVariable Long id) {
        return userService.makeProvider(id);
    }
    @GetMapping("/getAllUsers")
    public List<UserResponse> getUser() {
        return userService.getUsers();
    }

    @GetMapping("/getUser/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        User user =  userService.getUserById(id);
        byte [] image = userService.loadImageForUser(user);
        return new UserResponse(user,userService.imageToDataUrl(image));
    }

    @PostMapping("/postUser")
    public ResponseEntity<String> registerNewUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.addNewUser(user));
    }

    @PutMapping(path = "/updateUser/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile file,
            @ModelAttribute User user,
            Model model
    ) {
        try {
            userService.updateUser(id, file, user);
            return ResponseEntity.ok("User updated successfully with ID: " + user.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User update failed: " + e.getMessage());
        }
    }
    @DeleteMapping(path = "/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
