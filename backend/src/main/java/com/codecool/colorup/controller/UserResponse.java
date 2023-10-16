package com.codecool.colorup.controller;

import com.codecool.colorup.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private User user;
    private String image;
}
