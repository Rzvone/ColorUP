package com.codecool.colorup.auth;


import com.codecool.colorup.config.JwtService;
import com.codecool.colorup.enums.Role;
import com.codecool.colorup.forgotpassword.mail.RegistrationMailSender;
import com.codecool.colorup.forgotpassword.password.ForgotPasswordRequest;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.ProviderRepository;
import com.codecool.colorup.repository.UserRepository;
import com.codecool.colorup.service.UserService;
import jakarta.mail.MessagingException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Data
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final UserRepository repository;
    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private RegistrationMailSender mailSender;

    public AuthenticationResponse register(RegisterRequest request){
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .contactNumber(request.getContactNumber())
                .role(Role.ROLE_VISITOR)
                .providerRequest(false)
                .build();
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        byte [] image = userService.loadImageForUser(user);
        return AuthenticationResponse.builder().token(jwtToken).user(user).image(userService.imageToDataUrl(image)).build();
    }

    public void forgotPassword(ForgotPasswordRequest request) throws MessagingException, UnsupportedEncodingException {
        User user = repository.findByEmail(request.getEmail()).orElseThrow();

        String passwordResetToken = jwtService.generateToken(user);

        mailSender.sendPasswordResetEmail(user.getEmail(), passwordResetToken);

    }

}
