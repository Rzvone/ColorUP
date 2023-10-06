package com.codecool.colorup.forgotpassword.password;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ResetPasswordRequest {

    private String passwordResetToken;
    private String newPassword;

}
