package com.codecool.colorup.auth;

import com.codecool.colorup.config.JwtService;
import com.codecool.colorup.forgotpassword.password.ForgotPasswordRequest;
import com.codecool.colorup.forgotpassword.password.ResetPasswordRequest;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        Optional<User> existingUser = repository.findByEmail(request.getEmail());
        if (existingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthenticationResponse("Email already in use"));
        }
     return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    // New addition


    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody ForgotPasswordRequest request) throws MessagingException, UnsupportedEncodingException {
        service.forgotPassword(request);
    }


    @PostMapping("/reset-password")
    public ResponseEntity<AuthenticationResponse> resetPassword(@RequestBody ResetPasswordRequest request) throws MessagingException, UnsupportedEncodingException {
        String passwordResetToken = request.getPasswordResetToken();
        User user = validatePasswordResetToken(passwordResetToken);
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);

        // Send a success response to the client.
        return ResponseEntity.ok(new AuthenticationResponse(jwtService.generateToken(user),user,"Success"));
    }

    private User validatePasswordResetToken(String token) {
        Claims claims = jwtService.decode(token);

        String email = claims.getSubject();
        User user = repository.findByEmail(email).orElseThrow();

        if (claims.getExpiration().before(new Date())) {
            throw new RuntimeException("Password reset token has expired");
        }

        return user;
    }



}
