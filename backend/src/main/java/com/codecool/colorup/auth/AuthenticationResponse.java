package com.codecool.colorup.auth;

import com.codecool.colorup.model.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    private User user;
    private String message;
    private String image;

    public AuthenticationResponse(String message) {
        this.message = message;
    }
}
