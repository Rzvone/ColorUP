package com.codecool.colorup.admin;

import com.codecool.colorup.model.Provider;
import com.codecool.colorup.model.ServiceProvided;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.ProviderService;
import com.codecool.colorup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService; // Assuming you have a UserService class
    private final ProviderService providerService; // Assuming you have a ProviderService class
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminController(UserService userService, ProviderService providerService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.providerService = providerService;
        this.passwordEncoder = passwordEncoder;
    }
@GetMapping("/getPendingProviders")
public List<User> getPendingProviders(){
        return userService.getPendingProviders();
}
    @PostMapping("/makeprovider")
    public ResponseEntity<String> makeProvider(@RequestBody MakeProviderRequest request) {

        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<ServiceProvided> services = request.getServices();

        try {
            providerService.MakeUserProvider(user, services);
            return ResponseEntity.ok("User successfully converted to a provider");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
